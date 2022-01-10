import { __rest } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, Pipe, ViewChild, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import copy from 'fast-copy';
import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as easyPathExpressions from 'easy-path-expressions';
import Def from 'autocomplete-lhc';
import { HttpClient } from '@angular/common/http';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/cdk/a11y';
import * as ɵngcc2 from '@angular/common';
import * as ɵngcc3 from '@angular/material/tooltip';
import * as ɵngcc4 from '@angular/forms';
import * as ɵngcc5 from '@angular/cdk/drag-drop';
import * as ɵngcc6 from '@angular/material/snack-bar';
import * as ɵngcc7 from '@angular/cdk/clipboard';
import * as ɵngcc8 from '@angular/common/http';

function RuleEditorComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r0.errorLoading);
} }
function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "lhc-calculate-sum-prompt", 4);
    ɵngcc0.ɵɵlistener("export", function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template_lhc_calculate_sum_prompt_export_0_listener() { ɵngcc0.ɵɵrestoreView(_r4); const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.addSumOfScores(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("lhcStyle", ctx_r1.lhcStyle);
} }
function RuleEditorComponent_div_2_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 20);
    ɵngcc0.ɵɵelementStart(1, "select", 21);
    ɵngcc0.ɵɵlistener("ngModelChange", function RuleEditorComponent_div_2_div_19_Template_select_ngModelChange_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r8 = ɵngcc0.ɵɵnextContext(2); return ctx_r8.expressionSyntax = $event; })("change", function RuleEditorComponent_div_2_div_19_Template_select_change_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r9); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.onTypeChange($event); });
    ɵngcc0.ɵɵelementStart(2, "option", 22);
    ɵngcc0.ɵɵtext(3, "Easy Path Expression");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "option", 23);
    ɵngcc0.ɵɵtext(5, "FHIRPath Expression");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r5.expressionSyntax)("ngStyle", ctx_r5.lhcStyle.select);
} }
function RuleEditorComponent_div_2_div_20_lhc_syntax_converter_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "lhc-syntax-converter", 27);
    ɵngcc0.ɵɵlistener("expressionChange", function RuleEditorComponent_div_2_div_20_lhc_syntax_converter_1_Template_lhc_syntax_converter_expressionChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r14); const ctx_r13 = ɵngcc0.ɵɵnextContext(3); return ctx_r13.updateFinalExpression($event); })("simpleChange", function RuleEditorComponent_div_2_div_20_lhc_syntax_converter_1_Template_lhc_syntax_converter_simpleChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r14); const ctx_r15 = ɵngcc0.ɵɵnextContext(3); return ctx_r15.updateSimpleExpression($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("simple", ctx_r11.simpleExpression)("variables", ctx_r11.variables)("lhcStyle", ctx_r11.lhcStyle);
} }
function RuleEditorComponent_div_2_div_20_input_2_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 28);
    ɵngcc0.ɵɵlistener("ngModelChange", function RuleEditorComponent_div_2_div_20_input_2_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(3); return ctx_r16.finalExpression = $event; });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r12.finalExpression)("ngStyle", ctx_r12.lhcStyle.input);
} }
function RuleEditorComponent_div_2_div_20_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 24);
    ɵngcc0.ɵɵtemplate(1, RuleEditorComponent_div_2_div_20_lhc_syntax_converter_1_Template, 1, 3, "lhc-syntax-converter", 25);
    ɵngcc0.ɵɵtemplate(2, RuleEditorComponent_div_2_div_20_input_2_Template, 1, 2, "input", 26);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("ngSwitch", ctx_r6.expressionSyntax);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "simple");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "fhirpath");
} }
function RuleEditorComponent_div_2_lhc_case_statements_21_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "lhc-case-statements", 29);
    ɵngcc0.ɵɵlistener("expressionChange", function RuleEditorComponent_div_2_lhc_case_statements_21_Template_lhc_case_statements_expressionChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r19); const ctx_r18 = ɵngcc0.ɵɵnextContext(2); return ctx_r18.updateFinalExpression($event); })("simpleChange", function RuleEditorComponent_div_2_lhc_case_statements_21_Template_lhc_case_statements_simpleChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r19); const ctx_r20 = ɵngcc0.ɵɵnextContext(2); return ctx_r20.updateSimpleExpression($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("syntax", ctx_r7.expressionSyntax)("simpleExpression", ctx_r7.simpleExpression)("expression", ctx_r7.finalExpression)("lhcStyle", ctx_r7.lhcStyle);
} }
function RuleEditorComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵelementStart(1, "h1");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "span", 5);
    ɵngcc0.ɵɵelementStart(4, "input", 6);
    ɵngcc0.ɵɵlistener("ngModelChange", function RuleEditorComponent_div_2_Template_input_ngModelChange_4_listener($event) { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r21 = ɵngcc0.ɵɵnextContext(); return ctx_r21.advancedInterface = $event; });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "label", 7);
    ɵngcc0.ɵɵtext(6, "Advanced interface");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "section", 8);
    ɵngcc0.ɵɵelement(8, "lhc-uneditable-variables");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(9, "section", 9);
    ɵngcc0.ɵɵelement(10, "lhc-variables", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(11, "section", 11);
    ɵngcc0.ɵɵelementStart(12, "h2");
    ɵngcc0.ɵɵtext(13);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(14, "div", 12);
    ɵngcc0.ɵɵelementStart(15, "input", 13);
    ɵngcc0.ɵɵlistener("ngModelChange", function RuleEditorComponent_div_2_Template_input_ngModelChange_15_listener($event) { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r23 = ɵngcc0.ɵɵnextContext(); return ctx_r23.caseStatements = $event; });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(16, "label", 14);
    ɵngcc0.ɵɵtext(17, "Use case statements");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(18, "div", 15);
    ɵngcc0.ɵɵtemplate(19, RuleEditorComponent_div_2_div_19_Template, 6, 2, "div", 16);
    ɵngcc0.ɵɵtemplate(20, RuleEditorComponent_div_2_div_20_Template, 3, 3, "div", 17);
    ɵngcc0.ɵɵtemplate(21, RuleEditorComponent_div_2_lhc_case_statements_21_Template, 1, 4, "lhc-case-statements", 18);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(22, "button", 19);
    ɵngcc0.ɵɵlistener("click", function RuleEditorComponent_div_2_Template_button_click_22_listener() { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r24 = ɵngcc0.ɵɵnextContext(); return ctx_r24.export(); });
    ɵngcc0.ɵɵtext(23);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleMap(ctx_r2.lhcStyle.h1);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.titleName);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("disabled", ctx_r2.disableInterfaceToggle)("ngModel", ctx_r2.advancedInterface);
    ɵngcc0.ɵɵadvance(6);
    ɵngcc0.ɵɵproperty("lhcStyle", ctx_r2.lhcStyle)("advancedInterface", ctx_r2.advancedInterface);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵstyleMap(ctx_r2.lhcStyle.h2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.expressionLabel);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r2.caseStatements);
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r2.advancedInterface);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r2.caseStatements);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r2.caseStatements);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r2.lhcStyle.buttonPrimary);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.submitButtonName);
} }
function VariablesComponent_div_11_option_9_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "option", 22);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r10 = ctx.$implicit;
    ɵngcc0.ɵɵpropertyInterpolate("value", type_r10.key);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(type_r10.value);
} }
function VariablesComponent_div_11_lhc_question_12_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "lhc-question", 23);
} if (rf & 2) {
    const variable_r2 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("variable", variable_r2)("lhcStyle", ctx_r5.lhcStyle);
} }
function VariablesComponent_div_11_lhc_query_observation_13_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "lhc-query-observation", 24);
} if (rf & 2) {
    const ctx_r12 = ɵngcc0.ɵɵnextContext();
    const variable_r2 = ctx_r12.$implicit;
    const i_r3 = ctx_r12.index;
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("variable", variable_r2)("index", i_r3)("lhcStyle", ctx_r6.lhcStyle);
} }
function VariablesComponent_div_11_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵelementStart(1, "lhc-syntax-converter", 26);
    ɵngcc0.ɵɵlistener("simpleChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_simpleChange_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r15); const i_r3 = ɵngcc0.ɵɵnextContext().index; const ctx_r13 = ɵngcc0.ɵɵnextContext(); return ctx_r13.updateSimpleExpression(i_r3, $event); })("expressionChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_expressionChange_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r15); const i_r3 = ɵngcc0.ɵɵnextContext().index; const ctx_r16 = ɵngcc0.ɵɵnextContext(); return ctx_r16.updateExpression(i_r3, $event); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = ɵngcc0.ɵɵnextContext();
    const i_r3 = ctx_r18.index;
    const variable_r2 = ctx_r18.$implicit;
    const ctx_r7 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("id", "variable-expression-" + i_r3)("simple", variable_r2.simple)("variables", ctx_r7.getAvailableVariables(i_r3))("lhcStyle", ctx_r7.lhcStyle);
} }
function VariablesComponent_div_11_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r21 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵelementStart(1, "input", 27);
    ɵngcc0.ɵɵlistener("ngModelChange", function VariablesComponent_div_11_div_15_Template_input_ngModelChange_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r21); const variable_r2 = ɵngcc0.ɵɵnextContext().$implicit; return variable_r2.expression = $event; });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = ɵngcc0.ɵɵnextContext();
    const i_r3 = ctx_r22.index;
    const variable_r2 = ctx_r22.$implicit;
    const ctx_r8 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleMap(ctx_r8.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
} }
function VariablesComponent_div_11_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵelementStart(1, "input", 28);
    ɵngcc0.ɵɵlistener("ngModelChange", function VariablesComponent_div_11_div_16_Template_input_ngModelChange_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const variable_r2 = ɵngcc0.ɵɵnextContext().$implicit; return variable_r2.expression = $event; });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r26 = ɵngcc0.ɵɵnextContext();
    const i_r3 = ctx_r26.index;
    const variable_r2 = ctx_r26.$implicit;
    const ctx_r9 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleMap(ctx_r9.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
} }
function VariablesComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r29 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 9);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵelementStart(2, "svg", 10);
    ɵngcc0.ɵɵelement(3, "path", 11);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵnamespaceHTML();
    ɵngcc0.ɵɵelementStart(4, "input", 12);
    ɵngcc0.ɵɵlistener("ngModelChange", function VariablesComponent_div_11_Template_input_ngModelChange_4_listener($event) { const variable_r2 = ctx.$implicit; return variable_r2.label = $event; })("change", function VariablesComponent_div_11_Template_input_change_4_listener() { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r28 = ɵngcc0.ɵɵnextContext(); return ctx_r28.onNameChange(); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "div", 3);
    ɵngcc0.ɵɵelementStart(6, "select", 13);
    ɵngcc0.ɵɵlistener("ngModelChange", function VariablesComponent_div_11_Template_select_ngModelChange_6_listener($event) { const variable_r2 = ctx.$implicit; return variable_r2.type = $event; })("change", function VariablesComponent_div_11_Template_select_change_6_listener($event) { ɵngcc0.ɵɵrestoreView(_r29); const ctx_r31 = ɵngcc0.ɵɵnextContext(); return ctx_r31.onTypeChange($event); });
    ɵngcc0.ɵɵelementStart(7, "option", 14);
    ɵngcc0.ɵɵtext(8, "Select...");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(9, VariablesComponent_div_11_option_9_Template, 2, 2, "option", 15);
    ɵngcc0.ɵɵpipe(10, "keyvalue");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(11, "div", 16);
    ɵngcc0.ɵɵtemplate(12, VariablesComponent_div_11_lhc_question_12_Template, 1, 2, "lhc-question", 17);
    ɵngcc0.ɵɵtemplate(13, VariablesComponent_div_11_lhc_query_observation_13_Template, 1, 3, "lhc-query-observation", 18);
    ɵngcc0.ɵɵtemplate(14, VariablesComponent_div_11_div_14_Template, 2, 4, "div", 19);
    ɵngcc0.ɵɵtemplate(15, VariablesComponent_div_11_div_15_Template, 2, 4, "div", 19);
    ɵngcc0.ɵɵtemplate(16, VariablesComponent_div_11_div_16_Template, 2, 4, "div", 19);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(17, "div", 20);
    ɵngcc0.ɵɵelementStart(18, "button", 21);
    ɵngcc0.ɵɵlistener("click", function VariablesComponent_div_11_Template_button_click_18_listener() { ɵngcc0.ɵɵrestoreView(_r29); const i_r3 = ctx.index; const ctx_r32 = ɵngcc0.ɵɵnextContext(); return ctx_r32.onRemove(i_r3); });
    ɵngcc0.ɵɵtext(19, "x");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const variable_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r0.lhcStyle.variableRow);
    ɵngcc0.ɵɵproperty("id", "row-" + i_r3);
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵstyleMap(ctx_r0.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "variable-label-" + i_r3)("ngModel", variable_r2.label);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵstyleMap(ctx_r0.lhcStyle.select);
    ɵngcc0.ɵɵproperty("id", "variable-type-" + i_r3)("ngModel", variable_r2.type);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind1(10, 20, ctx_r0.variableType));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngSwitch", variable_r2.type);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "question");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "queryObservation");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "simple");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "expression");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "query");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵstyleMap(ctx_r0.lhcStyle.buttonDanger);
} }
function VariablesComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r34 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 29);
    ɵngcc0.ɵɵtext(1, "No variables, please ");
    ɵngcc0.ɵɵelementStart(2, "a", 30);
    ɵngcc0.ɵɵlistener("click", function VariablesComponent_div_12_Template_a_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r34); const ctx_r33 = ɵngcc0.ɵɵnextContext(); return ctx_r33.onAdd(); });
    ɵngcc0.ɵɵtext(3, "add one");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtext(4, ".");
    ɵngcc0.ɵɵelementEnd();
} }
function UneditableVariablesComponent_div_0_div_11_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵelementStart(1, "div", 3);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div", 4);
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "div", 5);
    ɵngcc0.ɵɵtext(6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const variable_r2 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(variable_r2.name);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(variable_r2.type);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(variable_r2.description);
} }
function UneditableVariablesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵelementStart(1, "h2");
    ɵngcc0.ɵɵtext(2, "Variables in Scope for This Item");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div", 1);
    ɵngcc0.ɵɵelementStart(4, "div", 2);
    ɵngcc0.ɵɵelementStart(5, "div", 3);
    ɵngcc0.ɵɵtext(6, "Label");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "div", 4);
    ɵngcc0.ɵɵtext(8, "Variable Type");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(9, "div", 5);
    ɵngcc0.ɵɵtext(10, "Description");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(11, UneditableVariablesComponent_div_0_div_11_Template, 7, 3, "div", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(11);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.uneditableVariables);
} }
function QuestionComponent_option_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "option", 9);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r4 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("value", question_r4.linkId);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", question_r4.text + " (" + question_r4.linkId + ")", " ");
} }
function QuestionComponent_select_7_option_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "option", 9);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r6 = ctx.$implicit;
    ɵngcc0.ɵɵpropertyInterpolate("value", u_r6.unit);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1("Convert to ", u_r6.unit, "");
} }
function QuestionComponent_select_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "select", 10);
    ɵngcc0.ɵɵlistener("ngModelChange", function QuestionComponent_select_7_Template_select_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.toUnit = $event; })("change", function QuestionComponent_select_7_Template_select_change_0_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r9 = ɵngcc0.ɵɵnextContext(); return ctx_r9.onChange(false); });
    ɵngcc0.ɵɵelementStart(1, "option", 11);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, QuestionComponent_select_7_option_3_Template, 2, 2, "option", 4);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r1.lhcStyle.select);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r1.toUnit);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1("Keep form units (", ctx_r1.unit, ")");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r1.conversionOptions);
} }
function QuestionComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r2.unit);
} }
function QuestionComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵtext(1, "Score");
    ɵngcc0.ɵɵelementEnd();
} }
function SyntaxPreviewComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵtext(2, " FHIRPath: ");
    ɵngcc0.ɵɵelementStart(3, "pre", 3);
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "button", 4, 5);
    ɵngcc0.ɵɵlistener("click", function SyntaxPreviewComponent_div_0_Template_button_click_5_listener() { ɵngcc0.ɵɵrestoreView(_r3); const _r1 = ɵngcc0.ɵɵreference(6); const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.copyNotification(_r1); });
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵelementStart(7, "svg", 6);
    ɵngcc0.ɵɵelement(8, "path", 7);
    ɵngcc0.ɵɵelement(9, "path", 8);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r0.lhcStyle);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵpropertyInterpolate("matTooltip", ctx_r0.syntax);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1("      ", ctx_r0.syntax, "\n    ");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("cdkCopyToClipboard", ctx_r0.syntax);
} }
const _c0 = ["autoComplete"];
function QueryObservationComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 13);
    ɵngcc0.ɵɵtext(1, " x-fhir-query: ");
    ɵngcc0.ɵɵelementStart(2, "pre", 14);
    ɵngcc0.ɵɵtext(3);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngStyle", ctx_r1.lhcStyle);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵpropertyInterpolate("title", ctx_r1.expression);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate(ctx_r1.expression);
} }
function CaseStatementsComponent_div_10_input_4_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵnamespaceHTML();
    ɵngcc0.ɵɵelementStart(0, "input", 19);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r12); const caseStatement_r3 = ɵngcc0.ɵɵnextContext().$implicit; return caseStatement_r3.condition = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r12); const ctx_r13 = ɵngcc0.ɵɵnextContext(2); return ctx_r13.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = ɵngcc0.ɵɵnextContext();
    const i_r4 = ctx_r14.index;
    const caseStatement_r3 = ctx_r14.$implicit;
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r5.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "case-condition-" + i_r4)("ngModel", caseStatement_r3.condition);
} }
function CaseStatementsComponent_div_10_input_5_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵnamespaceHTML();
    ɵngcc0.ɵɵelementStart(0, "input", 19);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const caseStatement_r3 = ɵngcc0.ɵɵnextContext().$implicit; return caseStatement_r3.simpleCondition = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(2); return ctx_r18.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r19 = ɵngcc0.ɵɵnextContext();
    const i_r4 = ctx_r19.index;
    const caseStatement_r3 = ctx_r19.$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r6.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "case-condition-" + i_r4)("ngModel", caseStatement_r3.simpleCondition);
} }
function CaseStatementsComponent_div_10_input_9_Template(rf, ctx) { if (rf & 1) {
    const _r22 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 20);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r22); const caseStatement_r3 = ɵngcc0.ɵɵnextContext().$implicit; return caseStatement_r3.output = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r22); const ctx_r23 = ɵngcc0.ɵɵnextContext(2); return ctx_r23.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = ɵngcc0.ɵɵnextContext();
    const i_r4 = ctx_r24.index;
    const caseStatement_r3 = ctx_r24.$implicit;
    const ctx_r7 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r7.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "case-output-" + i_r4)("ngModel", caseStatement_r3.output);
} }
function CaseStatementsComponent_div_10_input_10_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 20);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const caseStatement_r3 = ɵngcc0.ɵɵnextContext().$implicit; return caseStatement_r3.simpleOutput = $event; })("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r28 = ɵngcc0.ɵɵnextContext(2); return ctx_r28.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r29 = ɵngcc0.ɵɵnextContext();
    const i_r4 = ctx_r29.index;
    const caseStatement_r3 = ctx_r29.$implicit;
    const ctx_r8 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r8.lhcStyle.input);
    ɵngcc0.ɵɵproperty("id", "case-output-" + i_r4)("ngModel", caseStatement_r3.simpleOutput);
} }
function CaseStatementsComponent_div_10_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r32 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 21);
    ɵngcc0.ɵɵelementStart(1, "button", 22);
    ɵngcc0.ɵɵlistener("click", function CaseStatementsComponent_div_10_div_11_Template_button_click_1_listener() { ɵngcc0.ɵɵrestoreView(_r32); const i_r4 = ɵngcc0.ɵɵnextContext().index; const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.onRemove(i_r4); });
    ɵngcc0.ɵɵtext(2, "x");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleMap(ctx_r9.lhcStyle.buttonDanger);
} }
function CaseStatementsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 12);
    ɵngcc0.ɵɵelementStart(1, "div", 2);
    ɵngcc0.ɵɵnamespaceSVG();
    ɵngcc0.ɵɵelementStart(2, "svg", 13);
    ɵngcc0.ɵɵelement(3, "path", 14);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(4, CaseStatementsComponent_div_10_input_4_Template, 1, 4, "input", 15);
    ɵngcc0.ɵɵtemplate(5, CaseStatementsComponent_div_10_input_5_Template, 1, 4, "input", 15);
    ɵngcc0.ɵɵnamespaceHTML();
    ɵngcc0.ɵɵelementStart(6, "span", 16);
    ɵngcc0.ɵɵtext(7, "\u2192");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(8, "div", 3);
    ɵngcc0.ɵɵtemplate(9, CaseStatementsComponent_div_10_input_9_Template, 1, 4, "input", 17);
    ɵngcc0.ɵɵtemplate(10, CaseStatementsComponent_div_10_input_10_Template, 1, 4, "input", 17);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(11, CaseStatementsComponent_div_10_div_11_Template, 3, 2, "div", 18);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r0.lhcStyle.variableRow);
    ɵngcc0.ɵɵproperty("id", "row-" + i_r4);
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.syntax !== "simple");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.syntax === "simple");
    ɵngcc0.ɵɵadvance(4);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.syntax !== "simple");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.syntax === "simple");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.cases.length > 1);
} }
function CaseStatementsComponent_input_18_Template(rf, ctx) { if (rf & 1) {
    const _r34 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 23);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r34); const ctx_r33 = ɵngcc0.ɵɵnextContext(); return ctx_r33.defaultCase = $event; })("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r34); const ctx_r35 = ɵngcc0.ɵɵnextContext(); return ctx_r35.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r1.lhcStyle.input);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r1.defaultCase);
} }
function CaseStatementsComponent_input_19_Template(rf, ctx) { if (rf & 1) {
    const _r37 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "input", 23);
    ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r37); const ctx_r36 = ɵngcc0.ɵɵnextContext(); return ctx_r36.simpleDefaultCase = $event; })("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener() { ɵngcc0.ɵɵrestoreView(_r37); const ctx_r38 = ɵngcc0.ɵɵnextContext(); return ctx_r38.onChange(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleMap(ctx_r2.lhcStyle.input);
    ɵngcc0.ɵɵproperty("ngModel", ctx_r2.simpleDefaultCase);
} }
var AllVariableType;
(function (AllVariableType) {
    AllVariableType["question"] = "Question";
    AllVariableType["expression"] = "FHIRPath Expression";
    AllVariableType["simple"] = "Easy Path Expression";
    AllVariableType["query"] = "FHIR Query";
    AllVariableType["queryObservation"] = "FHIR Query (Observation)";
})(AllVariableType || (AllVariableType = {}));
var SimpleVariableType;
(function (SimpleVariableType) {
    SimpleVariableType["question"] = "Question";
    SimpleVariableType["simple"] = "Easy Path Expression";
    SimpleVariableType["queryObservation"] = "FHIR Query (Observation)";
})(SimpleVariableType || (SimpleVariableType = {}));
const CASE_REGEX = /^\s*iif\s*\((.*)\)\s*$/;

// Supported unit conversions. Key is the "from" and value is the "to" array
const UNIT_CONVERSION = {
    kg: [{ unit: 'lbs', factor: 2.20462 }],
    lbs: [{ unit: 'kg', factor: 0.453592 }],
    '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
};

class RuleEditorService {
    constructor() {
        this.syntaxType = 'simple';
        this.uneditableVariablesChange = new Subject();
        this.variablesChange = new Subject();
        this.questionsChange = new Subject();
        this.mightBeScoreChange = new Subject();
        this.finalExpressionChange = new Subject();
        this.disableAdvancedChange = new Subject();
        this.needsAdvancedInterface = false;
        this.LANGUAGE_FHIRPATH = 'text/fhirpath';
        this.LANGUAGE_FHIR_QUERY = 'application/x-fhir-query';
        this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
        this.QUERY_REGEX = /^Observation\?code=(.+)&date=gt{{today\(\)-(\d+) (.+)}}&patient={{%patient.id}}&_sort=-date&_count=1$/;
        this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
        this.SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
        this.SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-expression';
        this.SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';
        this.CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.LAUNCH_CONTEXT_URI = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-launchContext';
        this.linkIdToQuestion = {};
        this.mightBeScore = false;
        this.variables = [];
        this.uneditableVariables = [];
    }
    /**
     * Create a new variable
     */
    addVariable() {
        // Get all the existing variable names
        const existingNames = this.variables.map((e) => e.label)
            .concat(this.uneditableVariables.map((e) => e.name));
        this.variables.push({
            label: this.getNewLabelName(existingNames),
            type: 'question',
            expression: ''
        });
        this.variablesChange.next(this.variables);
    }
    /**
     * Remove a variable
     * @param i - index of variable to remove
     */
    remove(i) {
        this.variables.splice(i, 1);
    }
    /**
     * Trigger an update (used when changing variable names to update the preview)
     */
    update() {
        this.variablesChange.next(this.variables);
    }
    /**
     * Checks the advanced interface status and allows toggle if no expressions or
     * queries are present
     * @param toggleOn - Set the advanced interface on (without having to run checks)
     */
    checkAdvancedInterface(toggleOn) {
        if (toggleOn) {
            this.needsAdvancedInterface = true;
        }
        else {
            let needsAdvanced = false;
            // Check variables
            if (this.variables.find((e) => e.type === 'expression' || e.type === 'query') !== undefined) {
                needsAdvanced = true;
            }
            // Check final expression
            if (this.syntaxType === 'fhirpath') {
                needsAdvanced = true;
            }
            this.needsAdvancedInterface = needsAdvanced;
        }
        this.disableAdvancedChange.next(this.needsAdvancedInterface);
    }
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire
     * @param questionnaire - FHIR Questionnaire
     */
    getUneditableVariables(questionnaire) {
        if (Array.isArray(questionnaire.extension)) {
            return questionnaire.extension.reduce((accumulator, extension) => {
                var _a, _b;
                if (extension.url === this.LAUNCH_CONTEXT_URI && extension.extension) {
                    const uneditableVariable = {
                        name: extension.extension.find((e) => e.url === 'name').valueId,
                        type: (_a = extension.extension.filter((e) => e.url === 'type')) === null || _a === void 0 ? void 0 : _a.map((e) => e.valueCode).join('|'),
                        description: (_b = extension.extension.find((e) => e.url === 'description')) === null || _b === void 0 ? void 0 : _b.valueString
                    };
                    accumulator.push(uneditableVariable);
                }
                return accumulator;
            }, []);
        }
        return [];
    }
    /**
     * Get and remove the variables from the FHIR object
     * @param questionnaire
     */
    extractVariables(questionnaire) {
        // Look at the top level fhirpath related extensions to populate the editable variables
        // TODO look at the focus item variables
        if (questionnaire.extension) {
            const variables = [];
            const nonVariableExtensions = [];
            // Add an index to each extension which we will then use to get the
            // variables back in the correct order. __$index will be removed on save
            questionnaire.extension = questionnaire.extension.map((e, i) => (Object.assign(Object.assign({}, e), { __$index: i })));
            questionnaire.extension.forEach((extension) => {
                if (extension.url === this.VARIABLE_EXTENSION && extension.valueExpression) {
                    switch (extension.valueExpression.language) {
                        case this.LANGUAGE_FHIRPATH:
                            const fhirPathVarToAdd = this.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index, extension.valueExpression.extension);
                            if (fhirPathVarToAdd.type === 'expression') {
                                this.needsAdvancedInterface = true;
                            }
                            variables.push(fhirPathVarToAdd);
                            break;
                        case this.LANGUAGE_FHIR_QUERY:
                            const queryVarToAdd = this.processQueryVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index);
                            if (queryVarToAdd.type === 'query') {
                                this.needsAdvancedInterface = true;
                            }
                            variables.push(queryVarToAdd);
                            break;
                    }
                }
                else {
                    nonVariableExtensions.push(extension);
                }
            });
            // Remove the variables so they can be re-added on export
            questionnaire.extension = nonVariableExtensions;
            return variables;
        }
        return [];
    }
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */
    itemHasScore(item) {
        if (typeof item === 'string') {
            item = this.linkIdToQuestion[item];
        }
        return (item.answerOption || []).some((answerOption) => {
            return (answerOption.extension || []).some((extension) => {
                return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
            });
        });
    }
    /**
     * Get the number of ordinalValue on the answers of the questions on the
     * Questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire
     */
    getScoreQuestionCount(questionnaire, linkIdContext) {
        let scoreQuestions = 0;
        questionnaire.item.forEach((item) => {
            if (this.itemHasScore(item)) {
                scoreQuestions++;
            }
        });
        return scoreQuestions;
    }
    /**
     * Import a FHIR Questionnaire to populate questions
     * @param expressionUri - URI of expression extension on linkIdContext question
     *  to extract and modify
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @return true if load was successful
     */
    import(expressionUri, questionnaire, linkIdContext) {
        this.linkIdContext = linkIdContext; // TODO change notification for linkId?
        this.fhir = copy(questionnaire);
        let loadSuccess = false;
        if (this.fhir.resourceType === 'Questionnaire' && this.fhir.item && this.fhir.item.length) {
            // If there is at least one score question we will ask the user if they
            // want to calculate the score
            const SCORE_MIN_QUESTIONS = 1;
            this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
            this.mightBeScoreChange.next(this.mightBeScore);
            this.uneditableVariables = this.getUneditableVariables(this.fhir);
            this.uneditableVariablesChange.next(this.uneditableVariables);
            this.linkIdToQuestion = {};
            this.needsAdvancedInterface = false;
            this.processItem(this.fhir.item);
            this.variables = this.extractVariables(this.fhir);
            this.variablesChange.next(this.variables);
            this.questions = [];
            // tslint:disable-next-line:forin
            for (const key in this.linkIdToQuestion) {
                if (!this.linkIdToQuestion.hasOwnProperty(key)) {
                    return;
                }
                const e = this.linkIdToQuestion[key];
                // TODO decimal vs choice
                const MAX_Q_LEN = 60; // Maximum question length before truncating.
                const text = e.text;
                this.questions.push({
                    linkId: e.linkId,
                    text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
                    unit: this.getQuestionUnits(e.linkId)
                });
            }
            this.questionsChange.next(this.questions);
            const expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);
            if (expression !== null) {
                // @ts-ignore
                this.finalExpression = expression.valueExpression.expression;
                this.caseStatements = this.finalExpression.match(CASE_REGEX) !== null;
                const simpleSyntax = this.extractSimpleSyntax(expression);
                if (simpleSyntax === null && this.finalExpression !== '') {
                    this.syntaxType = 'fhirpath';
                    this.needsAdvancedInterface = true;
                }
                else {
                    this.syntaxType = 'simple';
                    this.simpleExpression = simpleSyntax;
                }
            }
            else {
                // Reset input to be a blank simple expression if there is nothing on
                // the form
                this.syntaxType = 'simple';
                this.simpleExpression = '';
                this.finalExpression = '';
            }
            this.finalExpressionChange.next(this.finalExpression);
            loadSuccess = true;
        }
        return loadSuccess;
    }
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */
    processItem(items) {
        items.forEach((e) => {
            this.linkIdToQuestion[e.linkId] = e;
            if (e.item) {
                this.processItem(e.item);
            }
        });
    }
    /**
     * Get and remove the simple syntax if available. If not return null
     * @param expression
     */
    extractSimpleSyntax(expression) {
        if (expression.valueExpression && expression.valueExpression.extension) {
            const customExtension = expression.valueExpression.extension.find((e) => {
                return e.url === this.SIMPLE_SYNTAX_EXTENSION;
            });
            if (customExtension !== undefined) {
                return customExtension.valueString; // TODO move to code
            }
        }
        return null;
    }
    /**
     * Get and remove the final expression
     * @param expressionUri - Expression extension URL
     * @param items - FHIR questionnaire item array
     * @param linkId - linkId of question where to extract expression
     */
    extractExpression(expressionUri, items, linkId) {
        for (const item of items) {
            if (item.linkId === linkId && item.extension) {
                const extensionIndex = item.extension.findIndex((e) => {
                    return e.url === expressionUri && e.valueExpression.language === this.LANGUAGE_FHIRPATH &&
                        e.valueExpression.expression;
                });
                if (extensionIndex !== -1) {
                    const finalExpression = item.extension[extensionIndex];
                    item.extension.splice(extensionIndex, 1);
                    return finalExpression;
                }
            }
            else if (item.item) {
                return this.extractExpression(expressionUri, item.item, linkId);
            }
        }
        return null;
    }
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
    processVariable(name, expression, index, extensions) {
        const matches = expression.match(this.QUESTION_REGEX);
        const simpleExtension = extensions && extensions.find(e => e.url === this.SIMPLE_SYNTAX_EXTENSION);
        if (matches !== null) {
            const linkId = matches[1];
            const factor = matches[2];
            const variable = {
                __$index: index,
                label: name,
                type: 'question',
                linkId,
                expression
            };
            if (factor) {
                // We might be able to do unit conversion
                const sourceUnits = this.getQuestionUnits(linkId);
                if (UNIT_CONVERSION.hasOwnProperty(sourceUnits)) {
                    const conversions = UNIT_CONVERSION[sourceUnits];
                    const conversion = conversions.find((e) => {
                        return e.factor.toString() === factor;
                    });
                    variable.unit = conversion.unit;
                }
            }
            return variable;
        }
        else if (simpleExtension !== undefined) {
            return {
                __$index: index,
                label: name,
                type: 'simple',
                expression,
                simple: simpleExtension.valueString
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'expression',
                expression
            };
        }
    }
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
    processQueryVariable(name, expression, index) {
        const matches = expression.match(this.QUERY_REGEX);
        if (matches !== null) {
            const codes = matches[1].split('%2C'); // URL encoded comma ','
            const timeInterval = parseInt(matches[2], 10);
            const timeIntervalUnits = matches[3];
            return {
                __$index: index,
                label: name,
                type: 'queryObservation',
                codes,
                timeInterval,
                timeIntervalUnit: timeIntervalUnits,
                expression
            };
        }
        else {
            return {
                __$index: index,
                label: name,
                type: 'query',
                expression
            };
        }
    }
    // TODO check behavior of repeating linkId
    /**
     * Get question units for the question
     * @param linkId - Question linkId
     * @private
     */
    getQuestionUnits(linkId) {
        const QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
        const question = this.linkIdToQuestion[linkId];
        if (question.extension) {
            const extension = question.extension.find((e) => {
                return e.url === QUESTIONNAIRE_UNIT &&
                    e.valueCoding.system && e.valueCoding.system === 'http://unitsofmeasure.org';
            });
            if (extension && extension.valueCoding.code) {
                return extension.valueCoding.code;
            }
        }
        return null;
    }
    /**
     * Generate a label name like A, B, C, ... AA, AB which is not already used
     * @param existingNames {string[]} - Array of names already used by existing variables
     * @private
     */
    getNewLabelName(existingNames) {
        // All letters which can be used for a simple variable name
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        // First pass is with a single character variable name. Other passes are with two
        const firstLetterAlphabet = [''].concat(alphabet);
        for (const firstLetter of firstLetterAlphabet) {
            for (const secondLetter of alphabet) {
                const potentialName = firstLetter + secondLetter;
                const count = existingNames.filter((e) => e === potentialName);
                if (count.length === 0) {
                    return potentialName;
                }
            }
        }
        // Don't return a suggested name if we exhausted all combinations
        return '';
    }
    /**
     * Toggle the mightBeScore
     */
    toggleMightBeScore() {
        this.mightBeScore = !this.mightBeScore;
        this.mightBeScoreChange.next(this.mightBeScore);
    }
    /**
     * Add variables and finalExpression and return the new FHIR Questionnaire
     * @param url Extension URL to use for the expression
     * @param finalExpression
     */
    export(url, finalExpression) {
        // TODO support for different variable scopes
        // Copy the fhir object so we can export more than once
        // (if we add our data the second export will have duplicates)
        const fhir = copy(this.fhir);
        const variablesToAdd = this.variables.map((e) => {
            const variable = {
                __$index: e.__$index,
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: e.label,
                    language: e.type === 'query' ? this.LANGUAGE_FHIR_QUERY : this.LANGUAGE_FHIRPATH,
                    expression: e.expression
                }
            };
            if (e.type === 'simple') {
                // @ts-ignore
                variable.valueExpression.extension = [{
                        url: this.SIMPLE_SYNTAX_EXTENSION,
                        valueString: e.simple
                    }];
            }
            return variable;
        });
        // Split the variables into two buckets: Variables present when
        // Questionnaire was imported and variables added by the user using the Rule
        // Editor. Add variables present initially among the existing extensions.
        // Add the remaining variables at the end
        const variablesPresentInitially = [];
        const variablesAdded = [];
        variablesToAdd.forEach(e => {
            if (e.__$index === undefined) {
                variablesAdded.push(e);
            }
            else {
                variablesPresentInitially.push(e);
            }
        });
        if (fhir.extension) {
            // Introduce variables present before
            fhir.extension = fhir.extension.concat(variablesPresentInitially);
            // Sort by index
            fhir.extension.sort((a, b) => a.__$index - b.__$index);
            // Add variables added by the user
            fhir.extension = fhir.extension.concat(variablesAdded);
        }
        else {
            fhir.extension = variablesPresentInitially.concat(variablesAdded);
        }
        // Remove __$index
        fhir.extension = fhir.extension.map((_a) => {
            var { __$index } = _a, other = __rest(_a, ["__$index"]);
            return other;
        });
        const finalExpressionExtension = {
            url,
            valueExpression: {
                language: this.LANGUAGE_FHIRPATH,
                expression: finalExpression
            }
        };
        // TODO keep existing extensions
        if (this.syntaxType === 'simple') {
            finalExpressionExtension.valueExpression.extension = [{
                    url: this.SIMPLE_SYNTAX_EXTENSION,
                    valueString: this.simpleExpression
                }];
        }
        this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
        // If there are any query observation extensions check to make sure there is
        // a patient launch context. If there is not add one.
        const hasQueryObservations = this.variables.find((e) => {
            return e.type === 'queryObservation';
        });
        if (hasQueryObservations !== undefined) {
            const patientLaunchContext = fhir.extension.find((extension) => {
                if (extension.url === this.LAUNCH_CONTEXT_URI &&
                    Array.isArray(extension.extension)) {
                    const patientName = extension.extension.find((subExtension) => {
                        return subExtension.url === 'name' && subExtension.valueId === 'patient';
                    });
                    if (patientName !== undefined) {
                        return true;
                    }
                }
                return false;
            });
            if (patientLaunchContext === undefined) {
                // Add launchContext
                if (!Array.isArray(fhir.extension)) {
                    fhir.extension = [];
                }
                const name = 'patient';
                const type = 'Patient';
                const description = 'For filling in patient information as the subject for the form';
                fhir.extension.push({
                    url: this.LAUNCH_CONTEXT_URI,
                    extension: [
                        { url: 'name', valueId: name },
                        { url: 'type', valueCode: type },
                        { url: 'description', valueString: description }
                    ]
                });
                this.uneditableVariables.push({
                    name,
                    type,
                    description
                });
                this.uneditableVariablesChange.next(this.uneditableVariables);
            }
        }
        return fhir;
    }
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Question linkId
     */
    addTotalScoreRule(questionnaire, linkId) {
        this.fhir = questionnaire;
        this.linkIdContext = linkId;
        return this.addSumOfScores();
    }
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     */
    addSumOfScores() {
        const fhir = this.fhir;
        const linkIdContext = this.linkIdContext;
        const variableNames = [];
        const scoreQuestionLinkIds = [];
        // Get an array of linkIds for score questions
        fhir.item.forEach((item) => {
            if (item.linkId !== linkIdContext && this.itemHasScore(item)) {
                scoreQuestionLinkIds.push(item.linkId);
            }
        });
        // Get as many short suggested variable names as we have score questions
        scoreQuestionLinkIds.forEach(() => {
            variableNames.push(this.getNewLabelName(variableNames));
        });
        const scoreQuestions = scoreQuestionLinkIds.map((e, i) => {
            return {
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: variableNames[i],
                    language: this.LANGUAGE_FHIRPATH,
                    expression: `%questionnaire.item.where(linkId = '${e}').answerOption` +
                        `.where(valueCoding.code=%resource.item.where(linkId = '${e}').answer.valueCoding.code).extension` +
                        `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`,
                    extension: [{
                            url: this.SCORE_VARIABLE_EXTENSION
                        }]
                }
            };
        });
        const anyQuestionAnswered = {
            url: this.VARIABLE_EXTENSION,
            valueExpression: {
                name: 'any_questions_answered',
                language: this.LANGUAGE_FHIRPATH,
                expression: variableNames.map((e) => `%${e}.exists()`).join(' or '),
                extension: [{
                        url: this.SCORE_VARIABLE_EXTENSION
                    }]
            }
        };
        const sumString = variableNames.map((e) => `iif(%${e}.exists(), %${e}, 0)`).join(' + ');
        const totalCalculation = {
            url: this.CALCULATED_EXPRESSION,
            valueExpression: {
                description: 'Total score calculation',
                language: this.LANGUAGE_FHIRPATH,
                expression: `iif(%any_questions_answered, ${sumString}, {})`,
                extension: [{
                        url: this.SCORE_EXPRESSION_EXTENSION
                    }]
            }
        };
        scoreQuestions.push(anyQuestionAnswered);
        // @ts-ignore
        scoreQuestions.push(totalCalculation);
        this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);
        return fhir;
    }
    /**
     * Checks if the referenced Questionnaire item is a score calculation added by
     * the Rule Editor
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to check
     * @return True if the question at linkId is a score calculation created by
     * the Rule Editor, false otherwise
     */
    isScoreCalculation(questionnaire, linkId) {
        const checkForScore = (item) => {
            if (linkId === item.linkId) {
                const isScore = item.extension.find((extension) => !!this.isScoreExtension(extension));
                if (isScore) {
                    return true;
                }
            }
            if (item.item) {
                const subItemHasScore = item.item.find((subItem) => checkForScore(subItem));
                if (subItemHasScore) {
                    return true;
                }
            }
            return false;
        };
        return !!questionnaire.item.find((item) => checkForScore(item));
    }
    /**
     * Updates a FHIR questionnaire score calculation on the item identified by
     * the linkId
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to update
     * @return Questionnaire with updated calculation
     */
    updateScoreCalculation(questionnaire, linkId) {
        this.removeSumOfScores(questionnaire, linkId);
        return this.addTotalScoreRule(questionnaire, linkId);
    }
    /**
     * Removes score calculations added by the rule editor on the entire
     * questionnaire or on a specific item
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID where to remove score. If empty
     * try to remove scores from all items.
     * @return Questionnaire without the score calculation variable and expression
     */
    removeSumOfScores(questionnaire, linkId) {
        this.fhir = questionnaire;
        const removeItemScoreVariables = (item) => {
            if (linkId === undefined || linkId === item.linkId) {
                item.extension = item.extension.filter((extension) => !this.isScoreExtension(extension));
            }
            if (item.item) {
                item.item.forEach((subItem) => removeItemScoreVariables(subItem));
            }
        };
        this.fhir.item.forEach(removeItemScoreVariables);
        return this.fhir;
    }
    /**
     * Returns true if the extension has an extension for calculating score false otherwise
     * @param extension - FHIR Extension object
     * @private
     */
    isScoreExtension(extension) {
        if (extension.valueExpression && extension.valueExpression.extension &&
            extension.valueExpression.extension.length) {
            return !!extension.valueExpression.extension.find(e => e &&
                (e.url === this.SCORE_VARIABLE_EXTENSION ||
                    e.url === this.SCORE_EXPRESSION_EXTENSION));
        }
        else {
            return false;
        }
    }
    insertExtensions(items, linkId, extensions) {
        for (const item of items) {
            if (item.linkId === linkId) {
                if (item.extension) {
                    item.extension = item.extension.concat(extensions);
                }
                else {
                    item.extension = extensions;
                }
                break;
            }
            else if (item.item) {
                this.insertExtensions(item.item, linkId, extensions);
            }
        }
    }
    /**
     * Get the expression for a question
     * @param linkId - Question linkId
     * @param itemHasScore - Answer has an ordinalValue extension
     * @param convertible - Units can be converted
     * @param unit - Base units
     * @param toUnit - Destination units
     */
    valueOrScoreExpression(linkId, itemHasScore, convertible, unit, toUnit) {
        if (itemHasScore) {
            return `%questionnaire.item.where(linkId = '${linkId}').answerOption` +
                `.where(valueCoding.code=%resource.item.where(linkId = '${linkId}').answer.valueCoding.code).extension` +
                `.where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal`;
        }
        else if (convertible && unit && toUnit) {
            const factor = UNIT_CONVERSION[unit].find((e) => e.unit === toUnit).factor;
            return `%resource.item.where(linkId='${linkId}').answer.value*${factor}`;
        }
        else {
            return `%resource.item.where(linkId='${linkId}').answer.value`;
        }
    }
}
RuleEditorService.ɵfac = function RuleEditorService_Factory(t) { return new (t || RuleEditorService)(); };
RuleEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function RuleEditorService_Factory() { return new RuleEditorService(); }, token: RuleEditorService, providedIn: "root" });
RuleEditorService.ctorParameters = () => [];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RuleEditorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class RuleEditorComponent {
    constructor(variableService, liveAnnouncer) {
        this.variableService = variableService;
        this.liveAnnouncer = liveAnnouncer;
        this.advancedInterface = false;
        this.fhirQuestionnaire = null;
        this.itemLinkId = null;
        this.submitButtonName = 'Submit';
        this.titleName = 'Rule Editor';
        this.expressionLabel = 'Final Expression';
        this.expressionUri = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.lhcStyle = {};
        this.save = new EventEmitter();
        this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
        this.datePipe = new DatePipe('en-US');
        this.suggestions = [];
        this.disableInterfaceToggle = false;
        this.loadError = false;
    }
    ngOnInit() {
        this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe((mightBeScore) => {
            this.calculateSum = mightBeScore;
        });
        this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe((finalExpression) => {
            this.finalExpression = finalExpression;
        });
        this.variablesSubscription = this.variableService.variablesChange.subscribe((variables) => {
            this.variables = variables.map(e => e.label);
        });
        this.disableAdvancedSubscription = this.variableService.disableAdvancedChange.subscribe((disable) => {
            this.disableInterfaceToggle = disable;
        });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.calculateSumSubscription.unsubscribe();
        this.finalExpressionSubscription.unsubscribe();
        this.variablesSubscription.unsubscribe();
        this.disableAdvancedSubscription.unsubscribe();
    }
    /**
     * Angular lifecycle hook called on input changes
     */
    ngOnChanges(args) {
        this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */
    reload() {
        if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
            this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);
            if (this.loadError) {
                this.liveAnnouncer.announce(this.errorLoading);
            }
            this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
            this.advancedInterface = this.variableService.needsAdvancedInterface;
        }
        this.simpleExpression = this.variableService.simpleExpression;
        this.linkIdContext = this.variableService.linkIdContext;
        this.expressionSyntax = this.variableService.syntaxType;
        this.caseStatements = this.variableService.caseStatements;
        this.calculateSum = this.variableService.mightBeScore;
        this.finalExpression = this.variableService.finalExpression;
        this.variables = this.variableService.variables.map(e => e.label);
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */
    export() {
        this.save.emit(this.variableService.export(this.expressionUri, this.finalExpression));
    }
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */
    addSumOfScores() {
        this.save.emit(this.variableService.addSumOfScores());
    }
    /**
     * Called when the syntax type is changed to clean up expressions if the data cannot be converted
     * @param $event - event from from the caller
     */
    onSyntaxChange($event) {
        const newSyntax = $event.value;
        // Clear the existing expression if switching away from fhirpath
        if (newSyntax === 'simple') {
            this.finalExpression = '';
        }
        this.variableService.syntaxType = newSyntax;
    }
    /**
     * Update the final expression
     */
    updateFinalExpression(expression) {
        this.finalExpression = expression;
    }
    /**
     * Update the simple final expression
     */
    updateSimpleExpression(simple) {
        this.simpleExpression = simple;
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'fhirpath') {
            this.variableService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.variableService.checkAdvancedInterface();
        }
        if (this.variableService.needsAdvancedInterface) {
            this.advancedInterface = true;
            this.disableInterfaceToggle = true;
        }
        else {
            this.disableInterfaceToggle = false;
        }
    }
}
RuleEditorComponent.ɵfac = function RuleEditorComponent_Factory(t) { return new (t || RuleEditorComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.LiveAnnouncer)); };
RuleEditorComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: RuleEditorComponent, selectors: [["lhc-rule-editor"]], inputs: { advancedInterface: "advancedInterface", fhirQuestionnaire: "fhirQuestionnaire", itemLinkId: "itemLinkId", submitButtonName: "submitButtonName", titleName: "titleName", expressionLabel: "expressionLabel", expressionUri: "expressionUri", lhcStyle: "lhcStyle" }, outputs: { save: "save" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [["class", "error", 4, "ngIf"], [3, "lhcStyle", "export", 4, "ngIf"], [4, "ngIf"], [1, "error"], [3, "lhcStyle", "export"], ["matTooltip", "When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.", 1, "checkbox"], ["type", "checkbox", "id", "advanced-interface", 3, "disabled", "ngModel", "ngModelChange"], ["for", "advanced-interface"], ["id", "uneditable-variables-section", 1, "mb-3"], ["id", "variables-section", 1, "mb-3"], [3, "lhcStyle", "advancedInterface"], ["id", "final-expression-section", 1, "mb-3"], [1, "checkbox"], ["type", "checkbox", "id", "case-statements", 3, "ngModel", "ngModelChange"], ["for", "case-statements"], [1, "flex-container"], ["class", "expression-type", 4, "ngIf"], ["class", "expression", 3, "ngSwitch", 4, "ngIf"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange", 4, "ngIf"], ["id", "export", 1, "primary", 3, "ngStyle", "click"], [1, "expression-type"], ["aria-label", "Expression syntax type", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange", "change"], ["value", "simple"], ["value", "fhirpath"], [1, "expression", 3, "ngSwitch"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange", 4, "ngSwitchCase"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", "class", "form-control", 3, "ngModel", "ngStyle", "ngModelChange", 4, "ngSwitchCase"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange"]], template: function RuleEditorComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, RuleEditorComponent_div_0_Template, 2, 1, "div", 0);
        ɵngcc0.ɵɵtemplate(1, RuleEditorComponent_lhc_calculate_sum_prompt_1_Template, 1, 1, "lhc-calculate-sum-prompt", 1);
        ɵngcc0.ɵɵtemplate(2, RuleEditorComponent_div_2_Template, 24, 16, "div", 2);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.loadError);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.calculateSum && !ctx.loadError);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.calculateSum && !ctx.loadError);
    } }, directives: function () { return [ɵngcc2.NgIf, CalculateSumPromptComponent, ɵngcc3.MatTooltip, ɵngcc4.CheckboxControlValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, UneditableVariablesComponent, VariablesComponent, ɵngcc2.NgStyle, ɵngcc4.SelectControlValueAccessor, ɵngcc4.NgSelectOption, ɵngcc4.ɵangular_packages_forms_forms_x, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, SyntaxConverterComponent, ɵngcc4.DefaultValueAccessor, CaseStatementsComponent]; }, styles: [".toolbar-button[_ngcontent-%COMP%]{height:2.7rem}.file-import[_ngcontent-%COMP%]{width:4.6rem;color:transparent}.file-import[_ngcontent-%COMP%]::-webkit-file-upload-button{visibility:hidden}.file-import[_ngcontent-%COMP%]:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button[_ngcontent-%COMP%]{margin-left:1em}h1[_ngcontent-%COMP%]{margin-top:0}.flex-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.expression[_ngcontent-%COMP%], .expression-type[_ngcontent-%COMP%]{display:flex;padding:.5rem}.expression-type[_ngcontent-%COMP%]{flex:0 0 15em}.expression[_ngcontent-%COMP%]{flex:1 0 30em;min-width:0}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary[_ngcontent-%COMP%]{background-color:#00f;color:#fff}lhc-case-statements[_ngcontent-%COMP%]{flex:100%;padding:.5rem}.checkbox[_ngcontent-%COMP%]{padding:.5rem}@media (max-width:975px){.flex-container[_ngcontent-%COMP%]{flex-direction:column}.expression[_ngcontent-%COMP%], .expression-type[_ngcontent-%COMP%]{flex:100%}}"] });
RuleEditorComponent.ctorParameters = () => [
    { type: RuleEditorService },
    { type: LiveAnnouncer }
];
RuleEditorComponent.propDecorators = {
    advancedInterface: [{ type: Input }],
    fhirQuestionnaire: [{ type: Input }],
    itemLinkId: [{ type: Input }],
    submitButtonName: [{ type: Input }],
    titleName: [{ type: Input }],
    expressionLabel: [{ type: Input }],
    expressionUri: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    save: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RuleEditorComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'lhc-rule-editor',
                template: "<div *ngIf=\"loadError\" class=\"error\">{{errorLoading}}</div>\n<lhc-calculate-sum-prompt *ngIf=\"calculateSum && !loadError\" (export)=\"addSumOfScores()\" [lhcStyle]=\"lhcStyle\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum && !loadError\">\n  <h1 [style]=\"lhcStyle.h1\">{{titleName}}</h1>\n\n  <span class=\"checkbox\" matTooltip=\"When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.\">\n    <input type=\"checkbox\" id=\"advanced-interface\" [disabled]=\"disableInterfaceToggle\"\n           [(ngModel)]=\"advancedInterface\">\n    <label for=\"advanced-interface\">Advanced interface</label>\n  </span>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [lhcStyle]=\"lhcStyle\" [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2 [style]=\"lhcStyle.h2\">{{expressionLabel}}</h2>\n\n    <div class=\"checkbox\">\n      <input type=\"checkbox\" id=\"case-statements\" [(ngModel)]=\"caseStatements\">\n      <label for=\"case-statements\">Use case statements</label>\n    </div>\n\n    <div class=\"flex-container\">\n      <div class=\"expression-type\" *ngIf=\"advancedInterface\">\n        <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" (change)=\"onTypeChange($event)\" aria-label=\"Expression syntax type\" [ngStyle]=\"lhcStyle.select\">\n          <option value=\"simple\">Easy Path Expression</option>\n          <option value=\"fhirpath\">FHIRPath Expression</option>\n        </select>\n      </div>\n      <div *ngIf=\"!caseStatements\" class=\"expression\" [ngSwitch]=\"expressionSyntax\">\n        <lhc-syntax-converter\n          *ngSwitchCase=\"'simple'\"\n          [simple]=\"simpleExpression\"\n          [variables]=\"variables\"\n          (expressionChange)=\"updateFinalExpression($event)\"\n          (simpleChange)=\"updateSimpleExpression($event)\"\n          [lhcStyle]=\"lhcStyle\"></lhc-syntax-converter>\n        <input type=\"text\" aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\" [ngStyle]=\"lhcStyle.input\">\n      </div>\n      <lhc-case-statements\n        *ngIf=\"caseStatements\"\n        [syntax]=\"expressionSyntax\"\n        [simpleExpression]=\"simpleExpression\"\n        [expression]=\"finalExpression\"\n        [lhcStyle]=\"lhcStyle\"\n        (expressionChange)=\"updateFinalExpression($event)\"\n        (simpleChange)=\"updateSimpleExpression($event)\">\n      </lhc-case-statements>\n    </div>\n  </section>\n\n  <button class=\"primary\" (click)=\"export()\" [ngStyle]=\"lhcStyle.buttonPrimary\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}h1{margin-top:0}.flex-container{display:flex;flex-wrap:wrap;flex-direction:row}.expression,.expression-type{display:flex;padding:.5rem}.expression-type{flex:0 0 15em}.expression{flex:1 0 30em;min-width:0}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary{background-color:#00f;color:#fff}lhc-case-statements{flex:100%;padding:.5rem}.checkbox{padding:.5rem}@media (max-width:975px){.flex-container{flex-direction:column}.expression,.expression-type{flex:100%}}"]
            }]
    }], function () { return [{ type: RuleEditorService }, { type: ɵngcc1.LiveAnnouncer }]; }, { advancedInterface: [{
            type: Input
        }], fhirQuestionnaire: [{
            type: Input
        }], itemLinkId: [{
            type: Input
        }], submitButtonName: [{
            type: Input
        }], titleName: [{
            type: Input
        }], expressionLabel: [{
            type: Input
        }], expressionUri: [{
            type: Input
        }], lhcStyle: [{
            type: Input
        }], save: [{
            type: Output
        }] }); })();

class VariablesComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.variableType = SimpleVariableType;
        this.levels = [{
                level: 0,
                name: 'Top Level Scope'
            }
        ];
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.variables = this.ruleEditorService.variables;
        this.variableSubscription = this.ruleEditorService.variablesChange.subscribe((variables) => {
            this.variables = variables;
        });
    }
    /**
     * Angular lifecycle hook called when bound property changes
     */
    ngOnChanges(changes) {
        if (changes.advancedInterface) {
            this.variableType = this.advancedInterface ? AllVariableType : SimpleVariableType;
            if (this.variables) {
                const previousValues = [];
                this.variables.forEach((variable, index) => {
                    previousValues[index] = variable.type;
                    variable.type = '';
                });
                // Not sure of a better way of setting the previous values than this
                setTimeout(() => {
                    previousValues.forEach((type, index) => {
                        this.variables[index].type = type;
                    });
                }, 10);
            }
        }
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.variableSubscription.unsubscribe();
    }
    /**
     * Called when adding a new variable
     */
    onAdd() {
        this.ruleEditorService.addVariable();
    }
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.ruleEditorService.remove(i);
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
    }
    /**
     * Update the preview when the variable name changes
     */
    onNameChange() {
        this.ruleEditorService.update();
    }
    /**
     * Toggle the advanced interface based on the type
     */
    onTypeChange(event) {
        if (event.target.value === 'query' || event.target.value === 'expression') {
            this.ruleEditorService.checkAdvancedInterface(true);
        }
        else {
            // Need to check all other variables and the final expression before we
            // allow the advanced interface to be removed
            this.ruleEditorService.checkAdvancedInterface();
        }
    }
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */
    getAvailableVariables(index) {
        const uneditableVariables = this.ruleEditorService.uneditableVariables.map((e) => e.name);
        // Only return variables up to but not including index
        const editableVariables = this.variables.map((e) => e.label).slice(0, index);
        return uneditableVariables.concat(editableVariables);
    }
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */
    updateExpression(i, expression) {
        this.variables[i].expression = expression;
    }
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */
    updateSimpleExpression(i, easyPath) {
        this.variables[i].simple = easyPath;
    }
}
VariablesComponent.ɵfac = function VariablesComponent_Factory(t) { return new (t || VariablesComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService)); };
VariablesComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: VariablesComponent, selectors: [["lhc-variables"]], inputs: { lhcStyle: "lhcStyle", advancedInterface: "advancedInterface" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 15, vars: 7, consts: [[1, "container"], ["aria-hidden", "true", 1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "variable-row drag-variable", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["class", "no-variables", 4, "ngIf"], ["id", "add-variable", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], ["cdkDrag", "", 1, "variable-row", "drag-variable", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["aria-label", "Variable label", 1, "label", 3, "id", "ngModel", "ngModelChange", "change"], ["aria-label", "Variable type", 3, "id", "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "variable-column-details", 3, "ngSwitch"], [3, "variable", "lhcStyle", 4, "ngSwitchCase"], [3, "variable", "index", "lhcStyle", 4, "ngSwitchCase"], ["class", "form-inline", 4, "ngSwitchCase"], [1, "variable-column-actions"], ["aria-label", "Remove variable", "title", "Remove variable", 1, "btn", "btn-danger", "remove-variable", 3, "click"], [3, "value"], [3, "variable", "lhcStyle"], [3, "variable", "index", "lhcStyle"], [1, "form-inline"], [3, "id", "simple", "variables", "lhcStyle", "simpleChange", "expressionChange"], ["aria-label", "FHIRPath Expression", 3, "id", "ngModel", "ngModelChange"], ["aria-label", "FHIR Query", "placeholder", "x-fhir-query", 3, "id", "ngModel", "ngModelChange"], [1, "no-variables"], ["href", "#", 3, "click"]], template: function VariablesComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "h2");
        ɵngcc0.ɵɵtext(1, "Variables");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "div", 0);
        ɵngcc0.ɵɵelementStart(3, "div", 1);
        ɵngcc0.ɵɵelementStart(4, "div", 2);
        ɵngcc0.ɵɵtext(5, "Label");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 3);
        ɵngcc0.ɵɵtext(7, "Variable Type");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(8, "div", 4);
        ɵngcc0.ɵɵtext(9, "Question/FHIRPath Expression/FHIR Query");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "div", 5);
        ɵngcc0.ɵɵlistener("cdkDropListDropped", function VariablesComponent_Template_div_cdkDropListDropped_10_listener($event) { return ctx.drop($event); });
        ɵngcc0.ɵɵtemplate(11, VariablesComponent_div_11_Template, 20, 22, "div", 6);
        ɵngcc0.ɵɵtemplate(12, VariablesComponent_div_12_Template, 5, 0, "div", 7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "button", 8);
        ɵngcc0.ɵɵlistener("click", function VariablesComponent_Template_button_click_13_listener() { return ctx.onAdd(); });
        ɵngcc0.ɵɵtext(14, "Add variable");
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.h2);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.variableHeader);
        ɵngcc0.ɵɵadvance(8);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.variables);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", !ctx.variables.length);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.lhcStyle.buttonSecondary);
    } }, directives: function () { return [ɵngcc5.CdkDropList, ɵngcc2.NgForOf, ɵngcc2.NgIf, ɵngcc2.NgStyle, ɵngcc5.CdkDrag, ɵngcc5.CdkDragHandle, ɵngcc4.DefaultValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, ɵngcc4.SelectControlValueAccessor, ɵngcc4.NgSelectOption, ɵngcc4.ɵangular_packages_forms_forms_x, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, QuestionComponent, QueryObservationComponent, SyntaxConverterComponent]; }, pipes: function () { return [ɵngcc2.KeyValuePipe]; }, styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.variable-header[_ngcontent-%COMP%], .variable-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header[_ngcontent-%COMP%] > .variable-column-label[_ngcontent-%COMP%]{padding-left:1.6em}.variable-column-label[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;height:2rem;font-size:1rem}.variable-column-details[_ngcontent-%COMP%], .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{padding:.5rem}.variable-column-label[_ngcontent-%COMP%]{display:flex;flex:0 0 12em}.label[_ngcontent-%COMP%]{flex-grow:100}.variable-column-type[_ngcontent-%COMP%]{flex:0 0 15em}.variable-column-details[_ngcontent-%COMP%]{flex:1 0 25em;min-width:0}.variable-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions[_ngcontent-%COMP%]{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row[_ngcontent-%COMP%]{flex-direction:column}.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{flex:100%}.variable-column-details[_ngcontent-%COMP%]{flex:20 0 10em}.variable-column-actions[_ngcontent-%COMP%]{flex:auto}}.drag-variable[_ngcontent-%COMP%]{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle[_ngcontent-%COMP%]{cursor:move;margin-top:.4rem}.no-variables[_ngcontent-%COMP%]{padding:2rem}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"] });
VariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
VariablesComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    advancedInterface: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(VariablesComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-variables',
                template: "<h2 [style]=\"lhcStyle.h2\">Variables</h2>\n\n<div class=\"container\">\n  <div class=\"variable-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"variable-column-label\">Label</div>\n    <div class=\"variable-column-type\">Variable Type</div>\n    <div class=\"variable-column-details\">Question/FHIRPath Expression/FHIR Query</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"variable-column-label\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" (change)=\"onNameChange()\" [style]=\"lhcStyle.input\" class=\"label\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"variable-column-type\">\n        <select [id]=\"'variable-type-' + i\" [(ngModel)]=\"variable.type\" (change)=\"onTypeChange($event)\" [style]=\"lhcStyle.select\" aria-label=\"Variable type\">\n          <option value=\"\" disabled hidden>Select...</option>\n          <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n        </select>\n      </div>\n      <div class=\"variable-column-details\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" *ngSwitchCase=\"'question'\" [lhcStyle]=\"lhcStyle\"></lhc-question>\n        <lhc-query-observation [variable]=\"variable\" [index]=\"i\" *ngSwitchCase=\"'queryObservation'\" [lhcStyle]=\"lhcStyle\"></lhc-query-observation>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <lhc-syntax-converter\n            [id]=\"'variable-expression-' + i\"\n            [simple]=\"variable.simple\"\n            [variables]=\"getAvailableVariables(i)\"\n            [lhcStyle]=\"lhcStyle\"\n            (simpleChange)=\"updateSimpleExpression(i, $event)\"\n            (expressionChange)=\"updateExpression(i, $event)\">\n          </lhc-syntax-converter>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\" aria-label=\"FHIRPath Expression\" />\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'query'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" [style]=\"lhcStyle.input\"\n                 aria-label=\"FHIR Query\" placeholder=\"x-fhir-query\" />\n        </div>\n      </div>\n      <div class=\"variable-column-actions\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove variable\" title=\"Remove variable\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"no-variables\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add variable</button>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header>.variable-column-label{padding-left:1.6em}.variable-column-label>input,.variable-column-type select{width:100%;height:2rem;font-size:1rem}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.label{flex-grow:100}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}.variable-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:20 0 10em}.variable-column-actions{flex:auto}}.drag-variable{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.no-variables{padding:2rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            }]
    }], function () { return [{ type: RuleEditorService }]; }, { lhcStyle: [{
            type: Input
        }], advancedInterface: [{
            type: Input
        }] }); })();

class UneditableVariablesComponent {
    constructor(variableService) {
        this.variableService = variableService;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.uneditableVariables = this.variableService.uneditableVariables;
        this.uneditableVariablesSubscription =
            this.variableService.uneditableVariablesChange.subscribe((variables) => {
                this.uneditableVariables = variables;
            });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */
    ngDestroy() {
        this.uneditableVariablesSubscription.unsubscribe();
    }
}
UneditableVariablesComponent.ɵfac = function UneditableVariablesComponent_Factory(t) { return new (t || UneditableVariablesComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService)); };
UneditableVariablesComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: UneditableVariablesComponent, selectors: [["lhc-uneditable-variables"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "container"], [1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["class", "variable-row", 4, "ngFor", "ngForOf"], [1, "variable-row"]], template: function UneditableVariablesComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, UneditableVariablesComponent_div_0_Template, 12, 1, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.uneditableVariables.length);
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgForOf], styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.variable-header[_ngcontent-%COMP%], .variable-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details[_ngcontent-%COMP%], .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{padding:.5rem}.variable-column-label[_ngcontent-%COMP%]{display:flex;flex:0 0 12em}.variable-column-type[_ngcontent-%COMP%]{flex:0 0 15em}.variable-column-details[_ngcontent-%COMP%]{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row[_ngcontent-%COMP%]{flex-direction:column}.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{flex:100%}.variable-column-details[_ngcontent-%COMP%]{flex:auto}}"] });
UneditableVariablesComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(UneditableVariablesComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-uneditable-variables',
                template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Variables in Scope for This Item</h2>\n\n  <div class=\"container\">\n    <div class=\"variable-header\">\n      <div class=\"variable-column-label\">Label</div>\n      <div class=\"variable-column-type\">Variable Type</div>\n      <div class=\"variable-column-details\">Description</div>\n    </div>\n    <div class=\"variable-row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"variable-column-label\">{{variable.name}}</div>\n      <div class=\"variable-column-type\">{{variable.type}}</div>\n      <div class=\"variable-column-details\">{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n",
                styles: ["*{box-sizing:border-box}.variable-header,.variable-row{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details,.variable-column-label,.variable-column-type{padding:.5rem}.variable-column-label{display:flex;flex:0 0 12em}.variable-column-type{flex:0 0 15em}.variable-column-details{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row{flex-direction:column}.variable-column-label,.variable-column-type{flex:100%}.variable-column-details{flex:auto}}"]
            }]
    }], function () { return [{ type: RuleEditorService }]; }, null); })();

class QuestionComponent {
    constructor(variableService) {
        this.variableService = variableService;
        this.lhcStyle = {};
        this.linkId = '';
        this.itemHasScore = false;
        this.isNonConvertibleUnit = false;
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() {
        this.linkId = this.variable.linkId ? this.variable.linkId : '';
        this.toUnit = this.variable.unit ? this.variable.unit : '';
        this.questions = this.variableService.questions;
        this.onChange(false);
        this.variableService.questionsChange.subscribe((questions) => {
            this.questions = questions;
        });
    }
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */
    getQuestion(linkId) {
        return this.questions.find((q) => {
            return q.linkId === linkId;
        });
    }
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */
    getConversionOptions(unit) {
        return UNIT_CONVERSION[unit];
    }
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */
    onChange(isQuestion) {
        if (isQuestion) {
            // Reset the conversion options when the question changes
            this.toUnit = '';
        }
        // If we already have a question selected (as opposed to the select... prompt)
        if (this.linkId) {
            const question = this.getQuestion(this.linkId);
            this.unit = question === null || question === void 0 ? void 0 : question.unit;
            this.conversionOptions = this.getConversionOptions(this.unit);
            this.isNonConvertibleUnit = this.unit && !this.conversionOptions;
            // Check if this is a score
            if (!this.conversionOptions && !this.isNonConvertibleUnit) {
                this.itemHasScore = this.variableService.itemHasScore(this.linkId);
            }
            else {
                this.itemHasScore = false;
            }
            this.variable.expression = this.variableService.valueOrScoreExpression(this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
        }
    }
}
QuestionComponent.ɵfac = function QuestionComponent_Factory(t) { return new (t || QuestionComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService)); };
QuestionComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: QuestionComponent, selectors: [["lhc-question"]], inputs: { lhcStyle: "lhcStyle", variable: "variable" }, decls: 11, vars: 9, consts: [[1, "form-inline", "question"], [1, "question-select"], ["aria-label", "Question", 3, "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "unit-select"], ["aria-label", "Unit conversion", 3, "ngModel", "style", "ngModelChange", "change", 4, "ngIf"], ["class", "detail", 4, "ngIf"], [3, "syntax", "lhcStyle"], [3, "value"], ["aria-label", "Unit conversion", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [1, "detail"]], template: function QuestionComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "select", 2);
        ɵngcc0.ɵɵlistener("ngModelChange", function QuestionComponent_Template_select_ngModelChange_2_listener($event) { return ctx.linkId = $event; })("change", function QuestionComponent_Template_select_change_2_listener() { return ctx.onChange(true); });
        ɵngcc0.ɵɵelementStart(3, "option", 3);
        ɵngcc0.ɵɵtext(4, "Select...");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(5, QuestionComponent_option_5_Template, 2, 2, "option", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 5);
        ɵngcc0.ɵɵtemplate(7, QuestionComponent_select_7_Template, 4, 5, "select", 6);
        ɵngcc0.ɵɵtemplate(8, QuestionComponent_div_8_Template, 2, 1, "div", 7);
        ɵngcc0.ɵɵtemplate(9, QuestionComponent_div_9_Template, 2, 0, "div", 7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(10, "lhc-syntax-preview", 8);
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.select);
        ɵngcc0.ɵɵproperty("ngModel", ctx.linkId);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.questions);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.conversionOptions);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.isNonConvertibleUnit);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.itemHasScore);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("syntax", ctx.variable.expression)("lhcStyle", ctx.lhcStyle);
    } }, directives: function () { return [ɵngcc4.SelectControlValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, ɵngcc4.NgSelectOption, ɵngcc4.ɵangular_packages_forms_forms_x, ɵngcc2.NgForOf, ɵngcc2.NgIf, SyntaxPreviewComponent]; }, styles: [".question[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.detail[_ngcontent-%COMP%]{margin-top:.5rem}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{box-sizing:border-box;margin-bottom:.5rem}.question-select[_ngcontent-%COMP%]{flex:50%;padding-right:.5rem}.unit-select[_ngcontent-%COMP%]{flex:50%;padding-left:.5rem}select[_ngcontent-%COMP%]{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question[_ngcontent-%COMP%]{flex-direction:column}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{flex:100%;padding:0}}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"] });
QuestionComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
QuestionComponent.propDecorators = {
    variable: [{ type: Input }],
    lhcStyle: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(QuestionComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-question',
                template: "<div class=\"form-inline question\">\n  <div class=\"question-select\">\n    <select [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" [style]=\"lhcStyle.select\" aria-label=\"Question\">\n      <option value=\"\" disabled hidden>Select...</option>\n      <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n        {{question.text + ' (' + question.linkId + ')'}}\n      </option>\n    </select>\n  </div>\n\n  <div class=\"unit-select\">\n    <select *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\" [style]=\"lhcStyle.select\"\n            (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n      <option value=\"\">Keep form units ({{unit}})</option>\n      <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n    </select>\n\n    <div *ngIf=\"isNonConvertibleUnit\" class=\"detail\">{{unit}}</div>\n    <div *ngIf=\"itemHasScore\" class=\"detail\">Score</div>\n  </div>\n</div>\n\n<lhc-syntax-preview [syntax]=\"variable.expression\" [lhcStyle]=\"lhcStyle\"></lhc-syntax-preview>\n",
                styles: [".question{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.question-select{flex:50%;padding-right:.5rem}.unit-select{flex:50%;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            }]
    }], function () { return [{ type: RuleEditorService }]; }, { lhcStyle: [{
            type: Input
        }], variable: [{
            type: Input
        }] }); })();

class CalculateSumPromptComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.export = new EventEmitter();
    }
    /**
     * Angular lifecycle hook called when the component is initialized
     */
    ngOnInit() { }
    /**
     * Close the dialog by specifying this should not be a score calculation
     */
    onCloseClick() {
        this.ruleEditorService.toggleMightBeScore();
    }
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */
    onExportClick() {
        this.export.emit();
    }
}
CalculateSumPromptComponent.ɵfac = function CalculateSumPromptComponent_Factory(t) { return new (t || CalculateSumPromptComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService)); };
CalculateSumPromptComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: CalculateSumPromptComponent, selectors: [["lhc-calculate-sum-prompt"]], inputs: { lhcStyle: "lhcStyle" }, outputs: { export: "export" }, decls: 9, vars: 6, consts: [[1, "score-modal"], ["id", "export-score", 1, "primary", 3, "click"], ["id", "skip-export-score", 3, "click"]], template: function CalculateSumPromptComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "p");
        ɵngcc0.ɵɵtext(2, "It looks like this might be a score calculation.");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "p");
        ɵngcc0.ɵɵtext(4, "Would you like to calculate the sum of scores?");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "button", 1);
        ɵngcc0.ɵɵlistener("click", function CalculateSumPromptComponent_Template_button_click_5_listener() { return ctx.onExportClick(); });
        ɵngcc0.ɵɵtext(6, "Yes");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "button", 2);
        ɵngcc0.ɵɵlistener("click", function CalculateSumPromptComponent_Template_button_click_7_listener() { return ctx.onCloseClick(); });
        ɵngcc0.ɵɵtext(8, "No");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.description);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.description);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.buttonPrimary);
    } }, styles: ["*[_ngcontent-%COMP%]{font-size:1rem}.score-modal[_ngcontent-%COMP%]{text-align:center}button[_ngcontent-%COMP%]{margin:0 .5em;height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"] });
CalculateSumPromptComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CalculateSumPromptComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    export: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CalculateSumPromptComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-calculate-sum-prompt',
                template: "<div class=\"score-modal\">\n  <p [style]=\"lhcStyle.description\">It looks like this might be a score calculation.</p>\n\n  <p [style]=\"lhcStyle.description\">Would you like to calculate the sum of scores?</p>\n\n  <button class=\"primary\" (click)=\"onExportClick()\" [style]=\"lhcStyle.buttonPrimary\" id=\"export-score\">Yes</button>\n  <button (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                styles: ["*{font-size:1rem}.score-modal{text-align:center}button{margin:0 .5em;height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
            }]
    }], function () { return [{ type: RuleEditorService }]; }, { lhcStyle: [{
            type: Input
        }], export: [{
            type: Output
        }] }); })();

class EasyPathExpressionsPipe {
    transform(value, variables) {
        if (value !== undefined) {
            const fhirPath = easyPathExpressions.fhirConvert(value, variables);
            if (fhirPath !== null) {
                return fhirPath;
            }
        }
        return 'Not valid';
    }
}
EasyPathExpressionsPipe.ɵfac = function EasyPathExpressionsPipe_Factory(t) { return new (t || EasyPathExpressionsPipe)(); };
EasyPathExpressionsPipe.ɵpipe = ɵngcc0.ɵɵdefinePipe({ name: "easyPathExpressions", type: EasyPathExpressionsPipe, pure: true });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(EasyPathExpressionsPipe, [{
        type: Pipe,
        args: [{
                name: 'easyPathExpressions'
            }]
    }], null, null); })();

class SyntaxConverterComponent {
    constructor() {
        this.lhcStyle = {};
        this.simpleChange = new EventEmitter();
        this.expressionChange = new EventEmitter();
        this.jsToFhirPathPipe = new EasyPathExpressionsPipe();
    }
    ngOnChanges() {
        this.onExpressionChange(this.simple);
    }
    onExpressionChange(simple) {
        const fhirPath = this.jsToFhirPathPipe.transform(simple, this.variables);
        this.fhirPathExpression = fhirPath;
        this.simpleChange.emit(simple);
        this.expressionChange.emit(fhirPath);
    }
}
SyntaxConverterComponent.ɵfac = function SyntaxConverterComponent_Factory(t) { return new (t || SyntaxConverterComponent)(); };
SyntaxConverterComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: SyntaxConverterComponent, selectors: [["lhc-syntax-converter"]], inputs: { lhcStyle: "lhcStyle", simple: "simple", variables: "variables" }, outputs: { simpleChange: "simpleChange", expressionChange: "expressionChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 2, vars: 4, consts: [["aria-label", "Easy Path Expression", 1, "simple-expression", 3, "ngModel", "ngModelChange"], [3, "syntax"]], template: function SyntaxConverterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "input", 0);
        ɵngcc0.ɵɵlistener("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) { return ctx.simple = $event; })("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) { return ctx.onExpressionChange($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(1, "lhc-syntax-preview", 1);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.input);
        ɵngcc0.ɵɵproperty("ngModel", ctx.simple);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("syntax", ctx.fhirPathExpression);
    } }, directives: function () { return [ɵngcc4.DefaultValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, SyntaxPreviewComponent]; }, styles: ["[_nghost-%COMP%]{width:100%}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"] });
SyntaxConverterComponent.ctorParameters = () => [];
SyntaxConverterComponent.propDecorators = {
    simple: [{ type: Input }],
    variables: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    simpleChange: [{ type: Output }],
    expressionChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SyntaxConverterComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-syntax-converter',
                template: "<input [(ngModel)]=\"simple\" (ngModelChange)=\"onExpressionChange($event)\" class=\"simple-expression\"\n       aria-label=\"Easy Path Expression\" [style]=\"lhcStyle.input\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\"></lhc-syntax-preview>\n",
                styles: [":host{width:100%}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
            }]
    }], function () { return []; }, { lhcStyle: [{
            type: Input
        }], simpleChange: [{
            type: Output
        }], expressionChange: [{
            type: Output
        }], simple: [{
            type: Input
        }], variables: [{
            type: Input
        }] }); })();

class SyntaxPreviewComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.showWhenEmpty = false;
    }
    ngOnInit() {
    }
    /**
     * Show an ephemeral notification that the value was copied.
     */
    copyNotification() {
        this.snackBar.open('Copied to clipboard', null, {
            duration: 2000
        });
    }
}
SyntaxPreviewComponent.ɵfac = function SyntaxPreviewComponent_Factory(t) { return new (t || SyntaxPreviewComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc6.MatSnackBar)); };
SyntaxPreviewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: SyntaxPreviewComponent, selectors: [["lhc-syntax-preview"]], inputs: { showWhenEmpty: "showWhenEmpty", syntax: "syntax", lhcStyle: "lhcStyle" }, decls: 1, vars: 1, consts: [["class", "text-muted syntax-preview", 3, "ngStyle", 4, "ngIf"], [1, "text-muted", "syntax-preview", 3, "ngStyle"], [1, "fhirpath"], [1, "d-inline", "text-muted", "syntax", 3, "matTooltip"], ["matTooltip", "Copy to clipboard", "aria-label", "Copy to clipboard", 1, "copy", 3, "cdkCopyToClipboard", "click"], ["toolTip", "matTooltip"], ["xmlns", "http://www.w3.org/2000/svg", "height", "16px", "viewBox", "0 0 24 24", "width", "24px", "fill", "#000000"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"]], template: function SyntaxPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, SyntaxPreviewComponent_div_0_Template, 10, 4, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.syntax || ctx.showWhenEmpty);
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgStyle, ɵngcc3.MatTooltip, ɵngcc7.CdkCopyToClipboard], styles: [".syntax[_ngcontent-%COMP%], [_nghost-%COMP%]{overflow:hidden}.syntax[_ngcontent-%COMP%]{white-space:nowrap;text-overflow:ellipsis}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.syntax-preview[_ngcontent-%COMP%]{display:flex;width:100%}.fhirpath[_ngcontent-%COMP%]{flex:1 0 10em;min-width:0;padding-right:1em}.copy[_ngcontent-%COMP%]{margin-top:1em;flex:0 0 3em;border:none;background:transparent}  .mat-tooltip{overflow-wrap:break-word}"] });
SyntaxPreviewComponent.ctorParameters = () => [
    { type: MatSnackBar }
];
SyntaxPreviewComponent.propDecorators = {
    syntax: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    showWhenEmpty: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SyntaxPreviewComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-syntax-preview',
                template: "<div class=\"text-muted syntax-preview\" [ngStyle]=\"lhcStyle\" *ngIf=\"syntax || showWhenEmpty\">\n  <div class=\"fhirpath\">\n    FHIRPath:\n    <pre class=\"d-inline text-muted syntax\" matTooltip=\"{{syntax}}\">\n      {{syntax}}\n    </pre>\n  </div>\n  <button class=\"copy\" #toolTip=\"matTooltip\" matTooltip=\"Copy to clipboard\"\n          [cdkCopyToClipboard]=\"syntax\" (click)=\"copyNotification(toolTip)\" aria-label=\"Copy to clipboard\">\n    <!-- Copy icon https://fonts.google.com/icons?icon.query=copy -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\">\n      <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n      <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/>\n    </svg>\n  </button>\n</div>\n",
                styles: [".syntax,:host{overflow:hidden}.syntax{white-space:nowrap;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{display:flex;width:100%}.fhirpath{flex:1 0 10em;min-width:0;padding-right:1em}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            }]
    }], function () { return [{ type: ɵngcc6.MatSnackBar }]; }, { showWhenEmpty: [{
            type: Input
        }], syntax: [{
            type: Input
        }], lhcStyle: [{
            type: Input
        }] }); })();

class QueryObservationComponent {
    constructor(http) {
        this.http = http;
        this.queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';
        this.lhcStyle = {};
    }
    ngOnInit() {
        if (this.variable !== undefined) {
            this.codes = (this.variable.codes !== undefined) ? this.variable.codes : [];
            this.timeInterval = this.variable.timeInterval || 1;
            this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
            this.expression = this.variable.expression;
        }
        else {
            this.codes = [];
        }
    }
    /**
     * After the autocomplete is ready to be interacted with fetch the name for
     * any codes already in the query search.
     */
    ngAfterViewInit() {
        this.autoComplete = new Def.Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
            tableFormat: true,
            valueCols: [0, 1],
            colHeaders: ['Text', 'LOINC Number'],
            maxSelect: '*'
        });
        this.codes.forEach((code) => {
            const matches = code.match(/http:\/\/loinc.org\|(.+)/);
            if (matches !== null) {
                const loincCode = matches[1];
                // LOINC Code
                this.http.get(`${this.queryUrl}&terms=${loincCode}`)
                    .subscribe((data) => {
                    const namePosition = 3;
                    const name = [data[namePosition][0][0], loincCode].join(' - ');
                    this.autoComplete.storeSelectedItem(name, loincCode);
                    this.autoComplete.addToSelectedArea(name);
                });
            }
            else {
                // Non-loinc code
                this.autoComplete.storeSelectedItem(code, undefined);
                this.autoComplete.addToSelectedArea(code);
            }
        });
        Def.Autocompleter.Event.observeListSelections(`autocomplete-${this.index}`, () => {
            const selectedItemData = this.autoComplete.getSelectedItemData();
            // If there is no code then this is not a loinc code and we need to get
            // the value from the array above
            this.codes = this.autoComplete.getSelectedCodes().map((code, index) => {
                return (code === undefined) ? selectedItemData[index].text : `http://loinc.org|${code}`;
            });
            this.onChange();
        });
    }
    /**
     * Angular lifecycle hook
     */
    ngOnDestroy() {
        if (this.autoComplete !== undefined) {
            this.autoComplete.destroy();
        }
    }
    /**
     * On changes update the expression and preview
     */
    onChange() {
        // Separate with URL encoded version of the comma: ','
        const codes = this.codes.join('%2C');
        this.variable.expression = this.expression =
            `Observation?code=${codes}&` +
                `date=gt{{today()-${this.timeInterval} ${this.timeIntervalUnit}}}&` +
                `patient={{%patient.id}}&_sort=-date&_count=1`;
    }
}
QueryObservationComponent.ɵfac = function QueryObservationComponent_Factory(t) { return new (t || QueryObservationComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc8.HttpClient)); };
QueryObservationComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: QueryObservationComponent, selectors: [["lhc-query-observation"]], viewQuery: function QueryObservationComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.autoCompleteElement = _t.first);
    } }, inputs: { lhcStyle: "lhcStyle", variable: "variable", index: "index" }, decls: 17, vars: 10, consts: [[1, "form-inline", "query"], [1, "query-select"], ["placeholder", "LOINC Name / LOINC Number / Other Code", 1, "query-autocomplete", 3, "id"], ["autoComplete", ""], [1, "time-input"], ["aria-label", "Time interval", "type", "number", "min", "1", 3, "ngModel", "ngModelChange", "change"], [1, "time-select"], ["aria-label", "Time interval units", 3, "ngModel", "ngModelChange", "change"], ["value", "days"], ["value", "weeks"], ["value", "months"], ["value", "years"], ["class", "syntax-preview text-muted", 3, "ngStyle", 4, "ngIf"], [1, "syntax-preview", "text-muted", 3, "ngStyle"], [1, "d-inline", "text-muted", 3, "title"]], template: function QueryObservationComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelement(2, "input", 2, 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 4);
        ɵngcc0.ɵɵelementStart(5, "input", 5);
        ɵngcc0.ɵɵlistener("ngModelChange", function QueryObservationComponent_Template_input_ngModelChange_5_listener($event) { return ctx.timeInterval = $event; })("change", function QueryObservationComponent_Template_input_change_5_listener() { return ctx.onChange(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 6);
        ɵngcc0.ɵɵelementStart(7, "select", 7);
        ɵngcc0.ɵɵlistener("ngModelChange", function QueryObservationComponent_Template_select_ngModelChange_7_listener($event) { return ctx.timeIntervalUnit = $event; })("change", function QueryObservationComponent_Template_select_change_7_listener() { return ctx.onChange(); });
        ɵngcc0.ɵɵelementStart(8, "option", 8);
        ɵngcc0.ɵɵtext(9, "Day(s)");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(10, "option", 9);
        ɵngcc0.ɵɵtext(11, "Week(s)");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(12, "option", 10);
        ɵngcc0.ɵɵtext(13, "Month(s)");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(14, "option", 11);
        ɵngcc0.ɵɵtext(15, "Year(s)");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(16, QueryObservationComponent_div_16_Template, 4, 3, "div", 12);
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.input);
        ɵngcc0.ɵɵpropertyInterpolate1("id", "autocomplete-", ctx.index, "");
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.input);
        ɵngcc0.ɵɵproperty("ngModel", ctx.timeInterval);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.input);
        ɵngcc0.ɵɵproperty("ngModel", ctx.timeIntervalUnit);
        ɵngcc0.ɵɵadvance(9);
        ɵngcc0.ɵɵproperty("ngIf", ctx.codes.length);
    } }, directives: [ɵngcc4.NumberValueAccessor, ɵngcc4.DefaultValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, ɵngcc4.SelectControlValueAccessor, ɵngcc4.NgSelectOption, ɵngcc4.ɵangular_packages_forms_forms_x, ɵngcc2.NgIf, ɵngcc2.NgStyle], styles: [".query[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.detail[_ngcontent-%COMP%]{margin-top:.5rem}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{box-sizing:border-box;margin-bottom:.5rem}.query-select[_ngcontent-%COMP%]{flex:1 0 6em;padding-right:.5rem}.time-input[_ngcontent-%COMP%], .time-select[_ngcontent-%COMP%]{flex:0 0 7em;padding-left:.5rem}select[_ngcontent-%COMP%]{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question[_ngcontent-%COMP%]{flex-direction:column}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{flex:100%;padding:0}}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.syntax-preview[_ngcontent-%COMP%]{margin-top:1em}.syntax-preview[_ngcontent-%COMP%] > pre[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"] });
QueryObservationComponent.ctorParameters = () => [
    { type: HttpClient }
];
QueryObservationComponent.propDecorators = {
    variable: [{ type: Input }],
    index: [{ type: Input }],
    lhcStyle: [{ type: Input }],
    autoCompleteElement: [{ type: ViewChild, args: ['autoComplete',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(QueryObservationComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-query-observation',
                template: "<div class=\"form-inline query\">\n  <div class=\"query-select\">\n    <input [style]=\"lhcStyle.input\" placeholder=\"LOINC Name / LOINC Number / Other Code\"\n           class=\"query-autocomplete\" #autoComplete id=\"autocomplete-{{index}}\" />\n  </div>\n  <div class=\"time-input\">\n    <input [style]=\"lhcStyle.input\" [(ngModel)]=\"timeInterval\" (change)=\"onChange()\"\n           aria-label=\"Time interval\" type=\"number\" min=\"1\" />\n  </div>\n  <div class=\"time-select\">\n    <select [style]=\"lhcStyle.input\" [(ngModel)]=\"timeIntervalUnit\"\n            (change)=\"onChange()\" aria-label=\"Time interval units\">\n      <option value=\"days\">Day(s)</option>\n      <option value=\"weeks\">Week(s)</option>\n      <option value=\"months\">Month(s)</option>\n      <option value=\"years\">Year(s)</option>\n    </select>\n  </div>\n</div>\n<div class=\"syntax-preview text-muted\" [ngStyle]=\"lhcStyle\" *ngIf=\"codes.length\">\n  x-fhir-query: <pre class=\"d-inline text-muted\" title=\"{{expression}}\">{{expression}}</pre>\n</div>\n",
                styles: [".query{display:flex;flex-wrap:wrap;flex-direction:row}.detail{margin-top:.5rem}.question-select,.unit-select{box-sizing:border-box;margin-bottom:.5rem}.query-select{flex:1 0 6em;padding-right:.5rem}.time-input,.time-select{flex:0 0 7em;padding-left:.5rem}select{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question{flex-direction:column}.question-select,.unit-select{flex:100%;padding:0}}input,select{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted{margin:0;color:#555;font-size:.8rem}.syntax-preview{margin-top:1em}.syntax-preview>pre{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
            }]
    }], function () { return [{ type: ɵngcc8.HttpClient }]; }, { lhcStyle: [{
            type: Input
        }], variable: [{
            type: Input
        }], index: [{
            type: Input
        }], autoCompleteElement: [{
            type: ViewChild,
            args: ['autoComplete']
        }] }); })();

class CaseStatementsComponent {
    constructor(ruleEditorService) {
        this.ruleEditorService = ruleEditorService;
        this.lhcStyle = {};
        this.expressionChange = new EventEmitter();
        this.simpleChange = new EventEmitter();
        this.STRING_REGEX = /^'(.*)'$/;
        this.pipe = new EasyPathExpressionsPipe();
        this.outputExpressions = true;
        this.cases = [{ condition: '', simpleCondition: '', output: '', simpleOutput: '' }];
        this.output = '';
    }
    /**
     * Angular lifecycle hook for initialization
     */
    ngOnInit() {
        if (this.syntax === 'fhirpath' && this.expression !== undefined) {
            this.parseIif(this.expression, 0);
        }
        else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
            this.parseSimpleCases();
        }
        this.output = this.getIif(0);
    }
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */
    parseSimpleCases() {
        this.parseIif(this.simpleExpression, 0);
        // If all output values are strings toggle off "use expressions"
        const outputString = this.cases.find(e => (!this.isString(e.simpleOutput)));
        const defaultIsString = this.isString(this.simpleDefaultCase);
        if (outputString === undefined && defaultIsString) {
            this.outputExpressions = false;
            // Remove quotes from output strings and default case
            this.cases.forEach(e => {
                e.simpleOutput = this.removeQuotes(e.simpleOutput);
            });
            this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
        }
    }
    /**
     * Checks if the expression is a string
     */
    isString(expression) {
        return this.STRING_REGEX.test(expression);
    }
    /**
     * Removes surrounding quotes
     */
    removeQuotes(expression) {
        return expression.match(this.STRING_REGEX)[1];
    }
    /**
     * Angular lifecycle hook for changes
     */
    ngOnChanges(changes) {
        if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
            this.parseSimpleCases();
            this.onChange();
        }
        else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
            this.outputExpressions = true;
            this.parseIif(this.expression, 0);
            this.onChange();
        }
    }
    /**
     * Called when adding a new case
     */
    onAdd() {
        this.cases.push({ condition: '', simpleCondition: '', output: '', simpleOutput: '' });
        this.onChange();
        // TODO select next input box that was added
    }
    /**
     * Remove the case at an index
     * @param i - index to remove
     */
    onRemove(i) {
        this.cases.splice(i, 1);
        this.onChange();
    }
    /**
     * Angular lifecycle hook for changes
     */
    onChange() {
        this.output = this.getIif(0);
        this.expressionChange.emit(this.output);
        this.simpleChange.emit(this.simpleExpression);
    }
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */
    parseIif(expression, level) {
        // If expressions don't start with iif( and end with ) they cannot be parsed
        const matches = expression.match(CASE_REGEX);
        if (matches !== null) {
            const iifContents = matches[1];
            let commaMatches = 0;
            let nestingLevel = 0;
            let comma1 = -1;
            let comma2 = -1;
            // Check where the ',' is relative to depth as indicated by parenthesis
            for (let i = 0; i < iifContents.length; i++) {
                switch (iifContents[i]) {
                    case '(':
                        nestingLevel++;
                        break;
                    case ')':
                        nestingLevel--;
                        break;
                    case ',':
                        if (nestingLevel === 0) {
                            commaMatches++;
                            if (comma1 === -1) {
                                comma1 = i;
                            }
                            else if (comma2 === -1) {
                                comma2 = i;
                            }
                        }
                        break;
                }
            }
            if (commaMatches === 2 && nestingLevel === 0) {
                // Clear out any existing cases if we have a match for iif
                if (level === 0) {
                    this.cases = [];
                }
                const condition = iifContents.substring(0, comma1).trim();
                const trueCase = iifContents.substring(comma1 + 1, comma2).trim();
                const falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();
                if (this.syntax === 'simple') {
                    const variableNames = this.ruleEditorService.variables.map(e => e.label);
                    this.cases.push({
                        simpleCondition: condition,
                        simpleOutput: trueCase,
                        condition: this.pipe.transform(condition, variableNames),
                        output: this.pipe.transform(trueCase, variableNames)
                    });
                }
                else {
                    this.cases.push({
                        condition,
                        output: trueCase
                    });
                }
                const parseResult = this.parseIif(falseCase, level + 1);
                if (parseResult === false && this.syntax !== 'simple') {
                    this.defaultCase = falseCase;
                }
                else if (parseResult === false && this.syntax === 'simple') {
                    this.simpleDefaultCase = falseCase;
                }
                return true;
            }
        }
        return false;
    }
    /**
     * Get an iif expression given a nesting level
     * @param level - nesting level
     */
    getIif(level) {
        const isSimple = this.syntax === 'simple';
        const output = this.transformIfSimple(isSimple ?
            this.cases[level].simpleOutput :
            this.cases[level].output, true);
        const condition = this.transformIfSimple(isSimple ?
            this.cases[level].simpleCondition :
            this.cases[level].condition, false);
        if (level === this.cases.length - 1) {
            const defaultCase = this.transformIfSimple(isSimple ?
                this.simpleDefaultCase : this.defaultCase, true);
            return `iif(${condition},${output},${defaultCase})`;
        }
        else {
            return `iif(${condition},${output},${this.getIif(level + 1)})`;
        }
    }
    /**
     * Transform the expression parameter if the syntax type is Easy Path,
     * otherwise return the expression. Additionally if this is an output column
     * and output expressions are off surround with quotes.
     * @param expression - Easy Path or FHIRPath expression
     * @param isOutput - True if processing an output or default value
     * @return FHIRPath Expression
     */
    transformIfSimple(expression, isOutput) {
        if (expression === undefined) {
            return '';
        }
        let processedExpression = expression;
        if (isOutput && !this.outputExpressions) {
            processedExpression = `'${processedExpression}'`; // TODO should we escape the expression?
        }
        // Convert when syntax is simple but not in the output column is outputExpressions is disabled
        if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
            return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(e => e.label));
        }
        else {
            return processedExpression;
        }
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */
    drop(event) {
        moveItemInArray(this.cases, event.previousIndex, event.currentIndex);
        this.onChange();
    }
}
CaseStatementsComponent.ɵfac = function CaseStatementsComponent_Factory(t) { return new (t || CaseStatementsComponent)(ɵngcc0.ɵɵdirectiveInject(RuleEditorService)); };
CaseStatementsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: CaseStatementsComponent, selectors: [["lhc-case-statements"]], inputs: { lhcStyle: "lhcStyle", syntax: "syntax", simpleExpression: "simpleExpression", expression: "expression" }, outputs: { expressionChange: "expressionChange", simpleChange: "simpleChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 21, vars: 9, consts: [[1, "container"], ["aria-hidden", "true", 1, "case-header"], [1, "case-condition-column"], [1, "case-output-column"], ["type", "checkbox", "id", "output-expressions", 3, "ngModel", "ngModelChange", "change"], ["for", "output-expressions"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "case-row drag-case", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["id", "add-case", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], [1, "case-row"], ["type", "text", "class", "default", 3, "ngModel", "style", "ngModelChange", 4, "ngIf"], [3, "lhcStyle", "syntax"], ["cdkDrag", "", 1, "case-row", "drag-case", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["type", "text", "class", "condition", "aria-label", "Case condition", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], [1, "arrow"], ["type", "text", "class", "output", "aria-label", "Case output", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], ["class", "case-column-actions", 4, "ngIf"], ["type", "text", "aria-label", "Case condition", 1, "condition", 3, "id", "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Case output", 1, "output", 3, "id", "ngModel", "ngModelChange"], [1, "case-column-actions"], ["aria-label", "Remove case", "title", "Remove case", 1, "btn", "btn-danger", "remove-case", 3, "click"], ["type", "text", 1, "default", 3, "ngModel", "ngModelChange"]], template: function CaseStatementsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtext(3, "When expression is true");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 3);
        ɵngcc0.ɵɵtext(5, " Output ");
        ɵngcc0.ɵɵelementStart(6, "input", 4);
        ɵngcc0.ɵɵlistener("ngModelChange", function CaseStatementsComponent_Template_input_ngModelChange_6_listener($event) { return ctx.outputExpressions = $event; })("change", function CaseStatementsComponent_Template_input_change_6_listener() { return ctx.onChange(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(7, "label", 5);
        ɵngcc0.ɵɵtext(8, "Use expressions (strings if unchecked)");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(9, "div", 6);
        ɵngcc0.ɵɵlistener("cdkDropListDropped", function CaseStatementsComponent_Template_div_cdkDropListDropped_9_listener($event) { return ctx.drop($event); });
        ɵngcc0.ɵɵtemplate(10, CaseStatementsComponent_div_10_Template, 12, 8, "div", 7);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "button", 8);
        ɵngcc0.ɵɵlistener("click", function CaseStatementsComponent_Template_button_click_11_listener() { return ctx.onAdd(); });
        ɵngcc0.ɵɵtext(12, "Add case");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "div", 9);
        ɵngcc0.ɵɵelement(14, "div", 2);
        ɵngcc0.ɵɵelementStart(15, "div", 3);
        ɵngcc0.ɵɵelementStart(16, "label");
        ɵngcc0.ɵɵtext(17, " Default output value: ");
        ɵngcc0.ɵɵtemplate(18, CaseStatementsComponent_input_18_Template, 1, 3, "input", 10);
        ɵngcc0.ɵɵtemplate(19, CaseStatementsComponent_input_19_Template, 1, 3, "input", 10);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(20, "lhc-syntax-preview", 11);
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleMap(ctx.lhcStyle.variableHeader);
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("ngModel", ctx.outputExpressions);
        ɵngcc0.ɵɵadvance(4);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.cases);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngStyle", ctx.lhcStyle.buttonSecondary);
        ɵngcc0.ɵɵadvance(7);
        ɵngcc0.ɵɵproperty("ngIf", ctx.syntax !== "simple");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.syntax === "simple");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("lhcStyle", ctx.lhcStyle)("syntax", ctx.output);
    } }, directives: [ɵngcc4.CheckboxControlValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.NgModel, ɵngcc5.CdkDropList, ɵngcc2.NgForOf, ɵngcc2.NgStyle, ɵngcc2.NgIf, SyntaxPreviewComponent, ɵngcc5.CdkDrag, ɵngcc5.CdkDragHandle, ɵngcc4.DefaultValueAccessor], styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.case-header[_ngcontent-%COMP%], .case-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.case-header[_ngcontent-%COMP%] > .case-column-label[_ngcontent-%COMP%]{padding-left:1.6em}.case-condition-column[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;height:2rem;font-size:1rem}.case-condition-column[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%]{padding:.5rem}.case-condition-column[_ngcontent-%COMP%]{display:flex;flex:0 0 50%}.condition[_ngcontent-%COMP%], .output[_ngcontent-%COMP%]{flex-grow:100}.case-actions-column[_ngcontent-%COMP%]{flex:auto}.case-output-column[_ngcontent-%COMP%]{flex:1 0 40%;min-width:0}.case-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions[_ngcontent-%COMP%]{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row[_ngcontent-%COMP%]{flex-direction:column}.case-condition-column[_ngcontent-%COMP%]{flex:100%}.case-output-column[_ngcontent-%COMP%]{flex:20 0 10em}.case-actions-column[_ngcontent-%COMP%]{flex:auto}}.drag-case[_ngcontent-%COMP%]{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle[_ngcontent-%COMP%]{cursor:move;margin-top:.4rem}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions[_ngcontent-%COMP%]{margin-left:2em}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow[_ngcontent-%COMP%]{font-size:1.6em;padding-left:.5em}.default[_ngcontent-%COMP%]{margin-top:.5rem}.syntax[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.copy[_ngcontent-%COMP%]{margin-top:1em;flex:0 0 3em;border:none;background:transparent}  .mat-tooltip{overflow-wrap:break-word}"] });
CaseStatementsComponent.ctorParameters = () => [
    { type: RuleEditorService }
];
CaseStatementsComponent.propDecorators = {
    lhcStyle: [{ type: Input }],
    syntax: [{ type: Input }],
    simpleExpression: [{ type: Input }],
    expression: [{ type: Input }],
    expressionChange: [{ type: Output }],
    simpleChange: [{ type: Output }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CaseStatementsComponent, [{
        type: Component,
        args: [{
                selector: 'lhc-case-statements',
                template: "<div class=\"container\">\n  <div class=\"case-header\" [style]=\"lhcStyle.variableHeader\" aria-hidden=\"true\">\n    <div class=\"case-condition-column\">When expression is true</div>\n    <div class=\"case-output-column\">\n      Output\n      <input type=\"checkbox\" id=\"output-expressions\" [(ngModel)]=\"outputExpressions\" (change)=\"onChange()\">\n      <label for=\"output-expressions\">Use expressions (strings if unchecked)</label>\n    </div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"case-row drag-case\" [style]=\"lhcStyle.variableRow\" *ngFor=\"let caseStatement of cases; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"case-condition-column\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.condition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-condition-' + i\" [(ngModel)]=\"caseStatement.simpleCondition\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"condition\" aria-label=\"Case condition\" />\n        <span class=\"arrow\">\u2192</span>\n      </div>\n      <div class=\"case-output-column\">\n        <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.output\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n        <input *ngIf=\"syntax === 'simple'\" type=\"text\" [id]=\"'case-output-' + i\" [(ngModel)]=\"caseStatement.simpleOutput\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"output\" aria-label=\"Case output\" />\n      </div>\n      <div class=\"case-column-actions\" *ngIf=\"cases.length > 1\">\n        <button class=\"btn btn-danger remove-case\" aria-label=\"Remove case\" title=\"Remove case\" [style]=\"lhcStyle.buttonDanger\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<button id=\"add-case\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\" [ngStyle]=\"lhcStyle.buttonSecondary\">Add case</button>\n\n<div class=\"case-row\">\n  <div class=\"case-condition-column\"></div>\n  <div class=\"case-output-column\">\n    <label>\n      Default output value:\n      <input *ngIf=\"syntax !== 'simple'\" type=\"text\" [(ngModel)]=\"defaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n      <input *ngIf=\"syntax === 'simple'\" type=\"text\" [(ngModel)]=\"simpleDefaultCase\" (ngModelChange)=\"onChange()\" [style]=\"lhcStyle.input\" class=\"default\" />\n    </label>\n  </div>\n</div>\n<lhc-syntax-preview [lhcStyle]=\"lhcStyle\" [syntax]=\"output\"></lhc-syntax-preview>\n",
                styles: ["*{box-sizing:border-box}.case-header,.case-row{display:flex;flex-direction:row;flex-wrap:wrap}.case-header>.case-column-label{padding-left:1.6em}.case-condition-column>input,.case-output-column select{width:100%;height:2rem;font-size:1rem}.case-condition-column,.case-output-column{padding:.5rem}.case-condition-column{display:flex;flex:0 0 50%}.condition,.output{flex-grow:100}.case-actions-column{flex:auto}.case-output-column{flex:1 0 40%;min-width:0}.case-column-actions button{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row{flex-direction:column}.case-condition-column{flex:100%}.case-output-column{flex:20 0 10em}.case-actions-column{flex:auto}}.drag-case{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move;margin-top:.4rem}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions{margin-left:2em}input[type=text],select{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow{font-size:1.6em;padding-left:.5em}.default{margin-top:.5rem}.syntax{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted{margin:0;color:#555;font-size:.8rem}.copy{margin-top:1em;flex:0 0 3em;border:none;background:transparent}::ng-deep .mat-tooltip{overflow-wrap:break-word}"]
            }]
    }], function () { return [{ type: RuleEditorService }]; }, { lhcStyle: [{
            type: Input
        }], expressionChange: [{
            type: Output
        }], simpleChange: [{
            type: Output
        }], syntax: [{
            type: Input
        }], simpleExpression: [{
            type: Input
        }], expression: [{
            type: Input
        }] }); })();

class RuleEditorModule {
}
RuleEditorModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: RuleEditorModule });
RuleEditorModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function RuleEditorModule_Factory(t) { return new (t || RuleEditorModule)(); }, imports: [[
            FormsModule,
            BrowserAnimationsModule,
            DragDropModule,
            MatRadioModule,
            ClipboardModule,
            MatTooltipModule,
            MatSnackBarModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RuleEditorModule, { declarations: function () { return [RuleEditorComponent, VariablesComponent, UneditableVariablesComponent, QuestionComponent, CalculateSumPromptComponent, EasyPathExpressionsPipe, SyntaxConverterComponent, SyntaxPreviewComponent, QueryObservationComponent, CaseStatementsComponent]; }, imports: function () { return [FormsModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatRadioModule,
        ClipboardModule,
        MatTooltipModule,
        MatSnackBarModule]; }, exports: function () { return [RuleEditorComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RuleEditorModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    RuleEditorComponent,
                    VariablesComponent,
                    UneditableVariablesComponent,
                    QuestionComponent,
                    CalculateSumPromptComponent,
                    EasyPathExpressionsPipe,
                    SyntaxConverterComponent,
                    SyntaxPreviewComponent,
                    QueryObservationComponent,
                    CaseStatementsComponent
                ],
                imports: [
                    FormsModule,
                    BrowserAnimationsModule,
                    DragDropModule,
                    MatRadioModule,
                    ClipboardModule,
                    MatTooltipModule,
                    MatSnackBarModule
                ],
                exports: [
                    RuleEditorComponent
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-rule-editor
 */

/**
 * Generated bundle index. Do not edit.
 */

export { RuleEditorComponent, RuleEditorModule, RuleEditorService, VariablesComponent as ɵa, UneditableVariablesComponent as ɵb, QuestionComponent as ɵc, CalculateSumPromptComponent as ɵd, EasyPathExpressionsPipe as ɵe, SyntaxConverterComponent as ɵf, SyntaxPreviewComponent as ɵg, QueryObservationComponent as ɵh, CaseStatementsComponent as ɵi };

//# sourceMappingURL=ng-rule-editor.js.map