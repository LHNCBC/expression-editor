export interface UneditableVariable {
  name: string;
  type?: string;
  description?: string;
}

export interface Variable {
  _index?: number;  // Original index in extension list
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

export enum VariableType {
  question = 'Question',
  expression = 'FHIRPath Expression',
  simple = 'Simple Expression',
  query = 'FHIR Query',
  queryObservation = 'FHIR Query (Observation)'
}
