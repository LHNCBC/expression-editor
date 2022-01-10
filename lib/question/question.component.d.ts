import { OnInit } from '@angular/core';
import { Question } from '../variable';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import { Unit } from '../units';
import * as ɵngcc0 from '@angular/core';
export declare class QuestionComponent implements OnInit {
    private variableService;
    variable: any;
    lhcStyle: SimpleStyle;
    linkId: string;
    questions: Question[];
    itemHasScore: boolean;
    isNonConvertibleUnit: boolean;
    toUnit: string;
    unit: string;
    conversionOptions: Unit[];
    constructor(variableService: RuleEditorService);
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit(): void;
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */
    getQuestion(linkId: any): Question;
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */
    getConversionOptions(unit: string): Unit[];
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */
    onChange(isQuestion: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<QuestionComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<QuestionComponent, "lhc-question", never, { "lhcStyle": "lhcStyle"; "variable": "variable"; }, {}, never, never>;
}

//# sourceMappingURL=question.component.d.ts.map