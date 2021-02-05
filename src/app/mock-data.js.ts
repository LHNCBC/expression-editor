import { Variable } from './variable';

export const QUESTIONS = [
  { id: '1', name: 'Weight', units: 'kg' },
  { id: '2', name: 'Height', units: '[in_i]' }
];

export const UNEDITABLE_VARIABLES = [
  { label: 'A', description: 'Patient' }
];

export const VARIABLES: Variable[] = [
  { label: 'B', type: 'question', questionId: '1' },
  { label: 'C', type: 'question', questionId: '2' },
  { label: 'D', type: 'expression', expression: '5' },
];
