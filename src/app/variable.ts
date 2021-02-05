export interface Variable {
  label: string;
  type: string;
  expression?: string;
  questionId?: string;
}

export interface Question {
  id: string;
  name: string;
  isScore?: boolean;
  units?: string;
}

export enum VariableType {
  question = 'Question',
  expression = 'Expression'
}
