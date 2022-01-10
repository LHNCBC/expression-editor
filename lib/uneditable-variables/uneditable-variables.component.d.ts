import { OnInit } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { UneditableVariable } from '../variable';
import * as ɵngcc0 from '@angular/core';
export declare class UneditableVariablesComponent implements OnInit {
    private variableService;
    uneditableVariables: UneditableVariable[];
    uneditableVariablesSubscription: any;
    constructor(variableService: RuleEditorService);
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit(): void;
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<UneditableVariablesComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<UneditableVariablesComponent, "lhc-uneditable-variables", never, {}, {}, never, never>;
}

//# sourceMappingURL=uneditable-variables.component.d.ts.map