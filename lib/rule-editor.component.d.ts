import { DatePipe } from '@angular/common';
import { EventEmitter, OnChanges } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { RuleEditorService } from './rule-editor.service';
export declare class RuleEditorComponent implements OnChanges {
    private variableService;
    fhirQuestionnaire: any;
    itemLinkId: any;
    submitButtonName: string;
    titleName: string;
    save: EventEmitter<object>;
    expressionSyntax: string;
    advancedInterface: boolean;
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
    ngOnChanges(): void;
    /**
     * Re-import fhir and context and show the form
     */
    reload(): void;
    /**
     * Import uploaded data as a FHIR Questionnaire
     * @param fileInput - Form file upload
     */
    import(fileInput: any): void;
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export(): void;
    /**
     * Export FHIR questionnaire file by summing all ordinal values
     */
    exportSumOfScores(): void;
    /**
     * Download data as a file
     * @param data - Object which will this function will call JSON.stringify on
     * @param fileName - File name to download as
     * @private
     */
    private downloadAsFile;
    /**
     * Called when the syntax type is changed to clean up expressions if the data cannot be converted
     * @param $event - event from from the caller
     */
    onSyntaxChange($event: MatRadioChange): void;
    /**
     * Update the final expression
     * @param expression
     */
    updateFinalExpression(expression: any): void;
}
