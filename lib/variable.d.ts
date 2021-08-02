export interface UneditableVariable {
    name: string;
    type?: string;
    description?: string;
}
export interface Variable {
    _index?: number;
    label: string;
    type: string;
    expression: string;
    simple?: string;
    linkId?: string;
    unit?: string;
}
export interface Question {
    linkId: string;
    text: string;
    itemHasScore?: boolean;
    unit?: string;
}
export declare enum VariableType {
    question = "Question",
    expression = "FHIRPath Expression",
    simple = "Simple Expression"
}
