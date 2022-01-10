import { Subject } from 'rxjs';
import { Question, UneditableVariable, Variable } from './variable';
import * as ɵngcc0 from '@angular/core';
export interface SimpleStyle {
    h1?: object;
    h2?: object;
    previewArea?: object;
    variableHeader?: object;
    variableRow?: object;
    buttonPrimary?: object;
    buttonSecondary?: object;
    buttonDanger?: object;
    input?: object;
    select?: object;
    description?: object;
}
export declare class RuleEditorService {
    syntaxType: string;
    linkIdContext: string;
    uneditableVariablesChange: Subject<UneditableVariable[]>;
    variablesChange: Subject<Variable[]>;
    questionsChange: Subject<Question[]>;
    mightBeScoreChange: Subject<boolean>;
    finalExpressionChange: Subject<string>;
    disableAdvancedChange: Subject<boolean>;
    uneditableVariables: UneditableVariable[];
    variables: Variable[];
    questions: Question[];
    finalExpression: string;
    simpleExpression: string;
    caseStatements: boolean;
    needsAdvancedInterface: boolean;
    private LANGUAGE_FHIRPATH;
    private LANGUAGE_FHIR_QUERY;
    private QUESTION_REGEX;
    private QUERY_REGEX;
    private VARIABLE_EXTENSION;
    private SCORE_VARIABLE_EXTENSION;
    private SCORE_EXPRESSION_EXTENSION;
    private SIMPLE_SYNTAX_EXTENSION;
    private CALCULATED_EXPRESSION;
    private LAUNCH_CONTEXT_URI;
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
     * Trigger an update (used when changing variable names to update the preview)
     */
    update(): void;
    /**
     * Checks the advanced interface status and allows toggle if no expressions or
     * queries are present
     * @param toggleOn - Set the advanced interface on (without having to run checks)
     */
    checkAdvancedInterface(toggleOn?: boolean): void;
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire
     * @param questionnaire - FHIR Questionnaire
     */
    getUneditableVariables(questionnaire: any): UneditableVariable[];
    /**
     * Get and remove the variables from the FHIR object
     * @param questionnaire
     */
    extractVariables(questionnaire: any): Variable[];
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */
    itemHasScore(item: any): boolean;
    /**
     * Get the number of ordinalValue on the answers of the questions on the
     * Questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire
     */
    getScoreQuestionCount(questionnaire: any, linkIdContext: any): number;
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param expressionUri - URI of expression extension on linkIdContext question
     *  to extract and modify
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @return true if load was successful
     */
    import(expressionUri: string, questionnaire: any, linkIdContext: any): boolean;
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */
    private processItem;
    /**
     * Get and remove the simple syntax if available. If not return null
     * @param expression
     */
    extractSimpleSyntax(expression: any): string | null;
    /**
     * Get and remove the final expression
     * @param expressionUri - Expression extension URL
     * @param items - FHIR questionnaire item array
     * @param linkId - linkId of question where to extract expression
     */
    extractExpression(expressionUri: any, items: any, linkId: any): object | null;
    /**
     * Process a FHIRPath expression into a more user friendly format if possible.
     * If the format of the FHIRPath matches a format we can display with a
     * question dropdown, etc show that. If not show the FHIRPath expression.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @param extensions - Any additional extensions (for simple fhirpath etc)
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    private processVariable;
    /**
     * Process a x-fhir-query expression into a more user friendly format if
     * possible. Show a code autocomplete field if possible if not show the
     * expression editing field.
     * @param name - Name to assign variable
     * @param expression - Expression to process
     * @param index - Original order in extension list
     * @return Variable type which can be used by the Rule Editor to show a
     * question, expression etc
     * @private
     */
    private processQueryVariable;
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
     * @param url Extension URL to use for the expression
     * @param finalExpression
     */
    export(url: string, finalExpression: string): object;
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Question linkId
     */
    addTotalScoreRule(questionnaire: any, linkId: any): object;
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addSumOfScores(): object;
    /**
     * Checks if the referenced Questionnaire item is a score calculation added by
     * the Rule Editor
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to check
     * @return True if the question at linkId is a score calculation created by
     * the Rule Editor, false otherwise
     */
    isScoreCalculation(questionnaire: any, linkId: any): boolean;
    /**
     * Updates a FHIR questionnaire score calculation on the item identified by
     * the linkId
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to update
     * @return Questionnaire with updated calculation
     */
    updateScoreCalculation(questionnaire: any, linkId: any): object;
    /**
     * Removes score calculations added by the rule editor on the entire
     * questionnaire or on a specific item
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID where to remove score. If empty
     * try to remove scores from all items.
     * @return Questionnaire without the score calculation variable and expression
     */
    removeSumOfScores(questionnaire: any, linkId?: any): object;
    /**
     * Returns true if the extension has an extension for calculating score false otherwise
     * @param extension - FHIR Extension object
     * @private
     */
    private isScoreExtension;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<RuleEditorService, never>;
}

//# sourceMappingURL=rule-editor.service.d.ts.map