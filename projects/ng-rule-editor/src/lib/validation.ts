export const EXPRESSION_REQUIRED = "Expression is required.";
export const QUESTION_REQUIRED = "Question is required.";
export const FHIR_QUERY_REQUIRED = "FHIR Query is required.";
export const FHIR_QUERY_OBSERVATION_REQUIRED = "Code for FHIR query is required.";
export const TIME_INTERVAL_REQUIRED = "Time interval is required.";

export const INVALID_EXPRESSION = "Invalid expression.";

export const VARIABLE_NAME_REQUIRED = "Variable name is required.";
export const VARIABLE_NAME_EXISTS = "Variable name already exists in the context.";
export const VARIABLE_NAME_MATCHES_LAUNCH_CONTEXT = "Variable name is already in use and cannot be overridden.";
export const VARIABLE_NAME_MATCHES_RESERVED_WORD = "Variable name matches a reserved word.";

export function getStartWithsErrorMessage(val:string): string {
  const testStrArr = val.split('-');
  return `Variable names starting with '${testStrArr[0]}-' are reserved.`;
}