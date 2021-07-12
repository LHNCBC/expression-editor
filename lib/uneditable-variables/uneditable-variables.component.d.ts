import { OnInit } from '@angular/core';
import { RuleEditorService } from '../rule-editor.service';
import { UneditableVariable } from '../variable';
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
}
