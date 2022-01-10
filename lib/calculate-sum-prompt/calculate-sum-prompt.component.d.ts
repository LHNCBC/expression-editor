import { EventEmitter, OnInit } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CalculateSumPromptComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CalculateSumPromptComponent, "lhc-calculate-sum-prompt", never, { "lhcStyle": "lhcStyle"; }, { "export": "export"; }, never, never>;
}

//# sourceMappingURL=calculate-sum-prompt.component.d.ts.map