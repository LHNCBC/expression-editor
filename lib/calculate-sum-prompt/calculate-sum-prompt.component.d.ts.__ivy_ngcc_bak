import { EventEmitter, OnInit } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
export declare class CalculateSumPromptComponent implements OnInit {
    private ruleEditorService;
    lhcStyle: SimpleStyle;
    export: EventEmitter<any>;
    constructor(ruleEditorService: RuleEditorService);
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit(): void;
    /**
     * Close the dialog by specifying this should not be a score calculation
     */
    onCloseClick(): void;
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */
    onExportClick(): void;
}
