import { Subject } from 'rxjs';
import { Question, UneditableVariable, Variable } from './variable';
export declare class RuleEditorService {
    syntaxType: string;
    linkIdContext: string;
    uneditableVariablesChange: Subject<UneditableVariable[]>;
    variablesChange: Subject<Variable[]>;
    questionsChange: Subject<Question[]>;
    mightBeScoreChange: Subject<boolean>;
    finalExpressionChange: Subject<string>;
    uneditableVariables: UneditableVariable[];
    variables: Variable[];
    questions: Question[];
    finalExpression: string;
    private LANGUAGE_FHIRPATH;
    private QUESTION_REGEX;
    private VARIABLE_EXTENSION;
    private CALCULATED_EXPRESSION;
    private linkIdToQuestion;
    private fhir;
    mightBeScore: boolean;
    constructor();
    /**
     * Create a new variable
     */
    addVariable(): void;
    /**
     * Remove a variable
     * @param i - index of variable to remove
     */
    remove(i: number): void;
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire
     * @param fhir - FHIR Questionnaire
     */
    getUneditableVariables(fhir: any): UneditableVariable[];
    /**
     * Get and remove the variables from the FHIR object
     * @param fhir
     */
    extractVariables(fhir: any): Variable[];
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */
    itemHasScore(item: any): boolean;
    /**
     * Look at the ordinalValue on the answers of all the questions and if over the threshold
     * percentage of the items have it return true
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     */
    isProbablyScore(fhir: any, linkIdContext: any): boolean;
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param fhir - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     */
    import(fhir: any, linkIdContext?: any): void;
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */
    private processItem;
    /**
     * Get and remove the final expression
     * @param items
     * @param linkId
     */
    extractFinalExpression(items: any, linkId: any): string;
    /**
     * Process the an expression into a possible question
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @private
     */
    private processVariable;
    /**
     * Get question units for the question
     * @param linkId - Question linkId
     * @private
     */
    private getQuestionUnits;
    /**
     * Generate a label name like A, B, C, ... AA, AB which is not already used
     * @param existingNames {string[]} - Array of names already used by existing variables
     * @private
     */
    private getNewLabelName;
    /**
     * Toggle the mightBeScore
     */
    toggleMightBeScore(): void;
    /**
     * Add variables and finalExpression and return the new FHIR Questionnaire
     * @param finalExpression
     */
    export(finalExpression: string): object;
    /**
     * Takes FHIR questionnaire definition and a linkId and returns a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addTotalScoreRule(fhir: any, linkId: any): object;
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    exportSumOfScores(): object;
    private insertExtensions;
    /**
     * Get the expression for a question
     * @param linkId - Question linkId
     * @param itemHasScore - Answer has an ordinalValue extension
     * @param convertible - Units can be converted
     * @param unit - Base units
     * @param toUnit - Destination units
     */
    valueOrScoreExpression(linkId: string, itemHasScore: boolean, convertible: boolean, unit: string, toUnit: string): string;
}
