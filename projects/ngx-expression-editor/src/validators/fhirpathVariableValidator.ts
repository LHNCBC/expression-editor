import * as fhirpath from 'fhirpath';

interface FhirPathAstNode {
  type?: string;
  text?: string;
  terminalNodeText?: string[];
  children?: FhirPathAstNode[];
}

// Environment variables supplied intrinsically by the FHIRPath evaluator do
// not need to be provided by the Questionnaire expression context.
const FHIRPATH_INTRINSIC_VARIABLE_NAMES = ['ucum'];

/**
 * Finds the first environment variable that is not available to an expression.
 * Parsing the expression prevents variable-like text in string literals from
 * being mistaken for an actual environment variable reference.
 * @param expression - FHIRPath expression to inspect.
 * @param availableVariableNames - Environment variable names available to the expression.
 * @returns The first unavailable variable name, or null when all references are available.
 */
export function findUnavailableEnvironmentVariable(
  expression: string,
  availableVariableNames: string[]
): string | null {
  let ast: FhirPathAstNode;
  try {
    ast = fhirpath.parse(expression);
  } catch {
    // Expression evaluation reports syntax errors through the existing path.
    return null;
  }

  const availableNames = new Set([
    ...FHIRPATH_INTRINSIC_VARIABLE_NAMES,
    ...availableVariableNames
  ]);
  return findFirstUnavailableVariable(ast, availableNames);
}

/**
 * Recursively inspects an AST node for unavailable environment variables.
 * @param node - Current FHIRPath AST node.
 * @param availableNames - Environment and locally defined variable names in scope.
 * @returns The first unavailable variable name, or null when none is found.
 */
function findFirstUnavailableVariable(
  node: FhirPathAstNode,
  availableNames: Set<string>
): string | null {
  if (node.type === 'ExternalConstantTerm') {
    const name = getExternalConstantName(node);
    if (name !== null && !availableNames.has(name)) {
      return name;
    }
  }

  if (node.type === 'InvocationExpression') {
    const invocationNames = new Set(availableNames);
    for (const child of node.children ?? []) {
      const unavailableName = findFirstUnavailableVariable(child, invocationNames);
      if (unavailableName !== null) {
        return unavailableName;
      }
      collectInvocationChainVariableNames(child)
        .forEach(name => invocationNames.add(name));
    }
    return null;
  }

  for (const child of node.children ?? []) {
    const unavailableName = findFirstUnavailableVariable(child, availableNames);
    if (unavailableName !== null) {
      return unavailableName;
    }
  }
  return null;
}

/**
 * Returns variables guaranteed to be defined after evaluating an invocation
 * chain. Definitions inside function arguments or conditional branches are not
 * propagated because those expressions might not execute.
 * @param node - FHIRPath AST node representing all or part of an invocation chain.
 * @returns Names introduced by defineVariable calls on the invocation chain.
 */
function collectInvocationChainVariableNames(node: FhirPathAstNode): string[] {
  if (node.type === 'FunctionInvocation') {
    const functionNode = node.children?.find(child => child.type === 'Functn');
    const name = getDefinedVariableName(functionNode);
    return name === null ? [] : [name];
  }

  if (node.type === 'InvocationExpression') {
    return (node.children ?? []).reduce((names, child) => [
      ...names,
      ...collectInvocationChainVariableNames(child)
    ], [] as string[]);
  }

  if ((node.children?.length ?? 0) === 1) {
    return collectInvocationChainVariableNames(node.children[0]);
  }

  return [];
}

/**
 * Gets the literal variable name declared by a defineVariable function node.
 * @param node - FHIRPath function AST node to inspect.
 * @returns The declared variable name, or null when the node is not a supported declaration.
 */
function getDefinedVariableName(node?: FhirPathAstNode): string | null {
  if (node?.type !== 'Functn' ||
    normalizeIdentifier(node.children?.[0]?.text) !== 'defineVariable') {
    return null;
  }

  const firstParameter = node.children
    ?.find(child => child.type === 'ParamList')
    ?.children?.[0];
  return getLiteralString(firstParameter);
}

/**
 * Gets the variable name represented by an external-constant AST node.
 * @param node - FHIRPath ExternalConstantTerm node.
 * @returns The normalized environment variable name, or null when it cannot be determined.
 */
function getExternalConstantName(node: FhirPathAstNode): string | null {
  const externalConstant = node.children?.find(child => child.type === 'ExternalConstant');
  if (!externalConstant) {
    return null;
  }

  if (externalConstant.terminalNodeText?.length === 2) {
    return evaluateStringLiteral(externalConstant.terminalNodeText[1]);
  }

  return normalizeIdentifier(
    externalConstant.children?.find(child => child.type === 'Identifier')?.text
  );
}

/**
 * Reads a string literal through AST nodes that contain only a single child.
 * @param node - FHIRPath AST node that may contain a string literal.
 * @returns The evaluated string value, or null when the node is not a literal string.
 */
function getLiteralString(node?: FhirPathAstNode): string | null {
  if (!node) {
    return null;
  }
  if (node.type === 'StringLiteral') {
    return evaluateStringLiteral(node.text);
  }
  if ((node.children?.length ?? 0) !== 1) {
    return null;
  }
  return getLiteralString(node.children[0]);
}

/**
 * Evaluates a FHIRPath string literal so escaped characters are decoded consistently.
 * @param literal - FHIRPath string literal text.
 * @returns The decoded string, or null when the literal cannot be evaluated.
 */
function evaluateStringLiteral(literal?: string): string | null {
  if (!literal) {
    return null;
  }
  try {
    const result = fhirpath.evaluate({}, literal) as any[];
    return result.length === 1 && typeof result[0] === 'string' ? result[0] : null;
  } catch {
    return null;
  }
}

/**
 * Removes FHIRPath identifier quoting and decodes escaped delimiters.
 * @param identifier - Identifier text from the FHIRPath AST.
 * @returns The normalized identifier, or null when no identifier was supplied.
 */
function normalizeIdentifier(identifier?: string): string | null {
  if (!identifier) {
    return null;
  }
  if (identifier.startsWith('`') && identifier.endsWith('`')) {
    return identifier.slice(1, -1).replace(/\\([`\\])/g, '$1');
  }
  return identifier;
}
