export interface UneditableVariable {
  name: string;
  type?: string;
  description?: string;
}

export interface Variable {
  label: string;
  type: string;
  expression: string;
  linkId?: string;
  unit?: string;
}

export interface Question {
  linkId: string;
  text: string;
  isScore?: boolean;
  unit?: string;
}

export enum VariableType {
  question = 'Question',
  expression = 'FHIRPath Expression'
}
