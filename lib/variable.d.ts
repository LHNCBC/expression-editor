export interface UneditableVariable {
    name: string;
    type?: string;
    description?: string;
}
export interface Variable {
    __$index?: number;
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
export interface CaseStatement {
    condition: string;
    simpleCondition?: string;
    output: string;
    simpleOutput?: string;
}
export declare enum AllVariableType {
    question = "Question",
    expression = "FHIRPath Expression",
    simple = "Easy Path Expression",
    query = "FHIR Query",
    queryObservation = "FHIR Query (Observation)"
}
export declare enum SimpleVariableType {
    question = "Question",
    simple = "Easy Path Expression",
    queryObservation = "FHIR Query (Observation)"
}
export declare const CASE_REGEX: RegExp;
