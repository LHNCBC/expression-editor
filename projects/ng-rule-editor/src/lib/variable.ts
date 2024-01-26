export interface UneditableVariable {
  name: string;
  type?: string;
  description?: string;
}

export interface Variable {
  __$index?: number;  // Original index in extension list
  label: string;
  type: string;
  expression: string;
  simple?: string;
  linkId?: string;
  unit?: string;
  codes?: Array<string>;
  timeInterval?: number;
  timeIntervalUnit?: string;
}

export interface Question {
  linkId: string;
  text: string;
  itemHasScore?: boolean;
  unit?: string;
}

export interface ValidationParam {
  section: string,
  field: string,
  [others: string]: string;
}

export interface ValidationError {
  [errorKey: string]: boolean | string;
  message: string;
  ariaMessage: string;
}

export interface ValidationResult {
  hasError: boolean;
  errorInItemVariables?: boolean;
  errorInOutputExpression?: boolean;
  errorInOutputCaseStatement?: boolean;
}

export interface CaseStatementError {
  case?: string;
  condition?: string;
  output?: string;
}

export interface CaseStatement {
  condition: string;
  simpleCondition?: string;
  output: string;
  simpleOutput?: string;
  error?: CaseStatementError;
}

export enum AllVariableType {
  question = 'Question',
  expression = 'FHIRPath Expression',
  simple = 'Easy Path Expression',
  query = 'FHIR Query',
  queryObservation = 'FHIR Query (Observation)'
}

export enum SimpleVariableType {
  question = 'Question',
  simple = 'Easy Path Expression',
  queryObservation = 'FHIR Query (Observation)'
}

export const CASE_REGEX = /^\s*iif\s*\((.*)\)\s*$/;
