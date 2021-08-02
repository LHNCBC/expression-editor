import { DatePipe } from '@angular/common';
import { EventEmitter, OnChanges } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { RuleEditorService, SimpleStyle } from './rule-editor.service';
export declare class RuleEditorComponent implements OnChanges {
    private variableService;
    fhirQuestionnaire: any;
    itemLinkId: any;
    submitButtonName: string;
    titleName: string;
    expressionLabel: string;
    expressionUri: string;
    lhcStyle: SimpleStyle;
    save: EventEmitter<object>;
    expressionSyntax: string;
    simpleExpression: string;
    finalExpression: string;
    finalExpressionFhirPath: string;
    linkIdContext: string;
    datePipe: DatePipe;
    calculateSum: boolean;
    suggestions: any[];
    variables: string[];
    private calculateSumSubscription;
    private finalExpressionSubscription;
    private variablesSubscription;
    constructor(variableService: RuleEditorService);
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy(): void;
    /**
     * Angular lifecycle hook called on input changes
     */
    ngOnChanges(args: any): void;
    /**
     * Re-import fhir and context and show the form
     */
    reload(): void;
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export(): void;
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */
    addSumOfScores(): void;
    /**
     * Called when the syntax type is changed to clean up expressions if the data cannot be converted
     * @param $event - event from from the caller
     */
    onSyntaxChange($event: MatRadioChange): void;
    /**
     * Update the final expression
     */
    updateFinalExpression(expression: any): void;
}
