(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mazilumt/dev/pr-rule-editor/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng_rule_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-rule-editor */ "vnGe");








function AppComponent_div_24_span_6_option_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var currentLinkId_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", currentLinkId_r7.linkId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](currentLinkId_r7.text);
} }
function AppComponent_div_24_span_6_option_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var expressionType_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", expressionType_r8.uri)("selected", expressionType_r8.selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", expressionType_r8.name, " ");
} }
function AppComponent_div_24_span_6_input_16_Template(rf, ctx) { if (rf & 1) {
    var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_24_span_6_input_16_Template_input_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3); return ctx_r9.expressionUri = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r6.expressionUri);
} }
function AppComponent_div_24_span_6_Template(rf, ctx) { if (rf & 1) {
    var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Question: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_24_span_6_Template_select_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r11.linkId = $event; })("change", function AppComponent_div_24_span_6_Template_select_change_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r13.doNotAskToCalculateScore = true; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "None (Edit top level variables)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AppComponent_div_24_span_6_option_6_Template, 2, 2, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Output Expression: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "select", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AppComponent_div_24_span_6_Template_select_change_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.expressionChange($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "None");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, AppComponent_div_24_span_6_option_13_Template, 2, 3, "option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Other...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, AppComponent_div_24_span_6_input_16_Template, 1, 1, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r3.linkId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.linkIds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", !ctx_r3.linkId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.expressionTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.customExpressionUri);
} }
function AppComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    var _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Please specify the questionnaire, item Link ID, and the corresponding Expression URI where the output should be placed:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Questionnaire: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_div_24_Template_input_ngModelChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r15.file = $event; })("change", function AppComponent_div_24_Template_input_change_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.prepareForImport($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AppComponent_div_24_span_6_Template, 17, 5, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.file);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.fhir);
} }
function AppComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.error, "\n");
} }
function AppComponent_div_26_button_3_Template(rf, ctx) { if (rf & 1) {
    var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_div_26_button_3_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r19.downloadJson(ctx_r19.fhirPreview); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Download Questionnaire ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
var _c0 = function () { return { backgroundColor: "navy", color: "white" }; };
var _c1 = function () { return { backgroundColor: "darkgreen", color: "white" }; };
var _c2 = function () { return { backgroundColor: "#ffe" }; };
var _c3 = function (a0, a1, a2, a3) { return { buttonPrimary: a0, buttonSecondary: a1, input: a2, select: a3 }; };
function AppComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "lhc-rule-editor", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("save", function AppComponent_div_26_Template_lhc_rule_editor_save_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.onSave($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppComponent_div_26_button_3_Template, 2, 0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "pre", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("fhirQuestionnaire", ctx_r2.fhir)("itemLinkId", ctx_r2.linkId)("submitButtonName", "Save")("expressionLabel", "Output Expression")("expressionUri", ctx_r2.linkId ? ctx_r2.expressionUri : "")("lhcStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](13, _c3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c0), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c1), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c2)))("doNotAskToCalculateScore", ctx_r2.doNotAskToCalculateScore);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.fhirPreview);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.fhirPreview);
} }
var AppComponent = /** @class */ (function () {
    function AppComponent(http, liveAnnouncer) {
        this.http = http;
        this.liveAnnouncer = liveAnnouncer;
        this.formAppearedAnnouncement = 'The rule editor for the selected form has appeared below the current field.';
        this.calculatedExpression = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
        this.originalLinkId = '/39156-5';
        this.expressionTypes = [
            {
                name: 'Answer Expression',
                uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression'
            },
            {
                name: 'Calculated Expression',
                uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
                selected: true
            },
            {
                name: 'Enable When Expression',
                uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression',
            },
            {
                name: 'Initial Expression',
                uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression'
            }
        ];
        this.linkId = '';
        this.expressionUri = this.calculatedExpression;
        this.customExpressionUri = false;
        this.fhir = null;
        this.formType = 'bmisimple';
        this.file = '';
        this.error = '';
        this.doNotAskToCalculateScore = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.onChange();
    };
    /**
     * Used when changing the questionnaire dropdown
     */
    AppComponent.prototype.onChange = function () {
        var _this = this;
        // Clear out preview when changing forms
        this.fhirPreview = '';
        this.error = '';
        this.doNotAskToCalculateScore = false;
        if (this.formType === '' || this.formType === 'upload') {
            this.liveAnnouncer.announce('Additional settings must be entered below to load the rule editor.');
            this.fhir = null;
            this.file = '';
            this.linkId = '';
        }
        else {
            this.liveAnnouncer.announce(this.formAppearedAnnouncement);
            this.linkId = this.originalLinkId;
            this.expressionUri = this.calculatedExpression;
            this.http.get("./" + this.formType + ".json")
                .subscribe(function (data) {
                _this.fhir = data;
            });
        }
    };
    /**
     * Show a preview of the output questionnaire under the rule editor
     */
    AppComponent.prototype.onSave = function (fhirResult) {
        this.fhirPreview = JSON.stringify(fhirResult, null, 2);
    };
    /**
     * Import a questionnaire from a file using the linkId and expression URI
     * @param fileInput - input file change event
     */
    AppComponent.prototype.prepareForImport = function (fileInput) {
        var _this = this;
        if (fileInput.target.files && fileInput.target.files[0]) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                if (typeof e.target.result === 'string') {
                    _this.doNotAskToCalculateScore = false;
                    _this.linkId = '';
                    try {
                        _this.fhir = JSON.parse(e.target.result);
                        _this.error = '';
                        if (_this.fhir && _this.fhir.item instanceof Array) {
                            _this.linkIds = _this.getQuestionnaireLinkIds(_this.fhir.item);
                        }
                        _this.liveAnnouncer.announce(_this.formAppearedAnnouncement);
                    }
                    catch (e) {
                        _this.fhir = '';
                        _this.error = "Could not parse file: " + e;
                        _this.liveAnnouncer.announce(_this.error);
                    }
                }
                else {
                    _this.fhir = '';
                    _this.error = 'Could not read file';
                    _this.liveAnnouncer.announce(_this.error);
                }
            };
            fileReader.readAsText(fileInput.target.files[0]);
        }
    };
    /**
     * Get the list of item link IDs in the questionnaire
     * @param items - FHIR questionnaire item array
     * @param level - Depth of item nesting, starting at 0
     * @return Array of link IDs.
     */
    AppComponent.prototype.getQuestionnaireLinkIds = function (items, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        var linkIds = [];
        items.forEach(function (item) {
            if (item.linkId) {
                if (item.text) {
                    var indent = '—'.repeat(level) + " ";
                    linkIds.push({
                        linkId: item.linkId,
                        text: indent + " " + item.text + " (" + item.linkId + ")"
                    });
                }
                else {
                    linkIds.push({
                        linkId: item.linkId,
                        text: item.linkId
                    });
                }
            }
            if (item.item instanceof Array) {
                linkIds = linkIds.concat(_this.getQuestionnaireLinkIds(item.item, level + 1));
            }
        });
        return linkIds;
    };
    /**
     * Trigger a file download of the provided data.
     * @param data - Content of the file which will be downloaded
     * @param name - Name the user sees for the file
     */
    AppComponent.prototype.downloadJson = function (data, name) {
        var datePipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"]('en-US');
        var blob = new Blob([data]);
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        var date = datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = name ? name + ".json" : "fhirpath-" + date + ".json";
        a.click();
        window.URL.revokeObjectURL(url);
    };
    /**
     * Called when the expression type changes
     * @param $event - Event
     */
    AppComponent.prototype.expressionChange = function ($event) {
        var newValue = $event.target.value;
        if (newValue === 'custom') {
            this.customExpressionUri = true;
            this.expressionUri = '';
        }
        else {
            this.customExpressionUri = false;
            this.expressionUri = newValue;
        }
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["LiveAnnouncer"])); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 27, vars: 4, consts: [["href", "https://github.com/NLMLHC/rule-editor#the-lhc-rule-editor"], ["id", "questionnaire-select", 3, "ngModel", "ngModelChange", "change"], ["value", "upload"], ["value", "bmi"], ["value", "bmisimple"], ["value", "bmicase"], ["value", "bmicasesimple"], ["value", "phq9"], ["value", "query"], ["id", "upload", 4, "ngIf"], ["class", "error", 4, "ngIf"], [4, "ngIf"], ["id", "upload"], ["type", "file", "id", "file-upload", "accept", ".json", 3, "ngModel", "ngModelChange", "change"], ["required", "", "id", "link-id", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "hidden"], ["id", "expression-entry"], [3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["value", "custom"], ["required", "", "type", "text", "id", "expression-uri", 3, "ngModel", "ngModelChange", 4, "ngIf"], [3, "value"], [3, "value", "selected"], ["required", "", "type", "text", "id", "expression-uri", 3, "ngModel", "ngModelChange"], [1, "error"], [1, "rule-editor"], [3, "fhirQuestionnaire", "itemLinkId", "submitButtonName", "expressionLabel", "expressionUri", "lhcStyle", "doNotAskToCalculateScore", "save"], ["class", "download", 3, "click", 4, "ngIf"], ["id", "output"], [1, "download", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Rule Editor Demo");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " The Rule Editor is a widget which helps you add FHIRPath expressions to a FHIR Questionnaire. For documentation refer to the ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Readme on GitHub");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, ". In the demo below you can choose one of the provided questionnaires or upload your own to be able to add, remove or rearrange variables and expressions.\n");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Questionnaire: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "select", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function AppComponent_Template_select_ngModelChange_9_listener($event) { return ctx.formType = $event; })("change", function AppComponent_Template_select_change_9_listener() { return ctx.onChange(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "option", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Upload your own questionnaire");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "option", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "BMI Calculation");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "option", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "BMI Calculation (Easy Path expression)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "option", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "BMI Calculation (with cases)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "option", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "BMI Calculation (Easy Path expression with cases)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "option", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "PHQ9 (no FHIRPath)");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "option", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Query");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, AppComponent_div_24_Template, 7, 2, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, AppComponent_div_25_Template, 2, 1, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, AppComponent_div_26_Template, 6, 18, "div", 11);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.formType);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.formType == "upload");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.error);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.fhir);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], ng_rule_editor__WEBPACK_IMPORTED_MODULE_5__["RuleEditorComponent"]], styles: [".rule-editor[_ngcontent-%COMP%] {\n  border: 1px solid #ccc;\n  padding: 1em;\n  margin: 1em 0;\n  box-shadow: 10px 10px 10px #ccc;\n}\n\nbutton.download[_ngcontent-%COMP%] {\n  padding: 0.5em 1em;\n  margin: 1em 0;\n}\n\n#upload[_ngcontent-%COMP%] {\n  padding: 1em 0;\n}\n\n#upload[_ngcontent-%COMP%], #link-id[_ngcontent-%COMP%] {\n  margin-right: 3em;\n}\n\n#expression-entry[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n#link-id[_ngcontent-%COMP%], #expression-entry[_ngcontent-%COMP%] {\n  width: 18em;\n}\n\n.error[_ngcontent-%COMP%] {\n  background-color: lightyellow;\n  padding: 1em;\n  margin: 1em 0;\n  border: 1px solid lightgoldenrodyellow;\n}\n\n.warning[_ngcontent-%COMP%] {\n  font-size: small;\n  color: darkorange;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0VBQ2IsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25CIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJ1bGUtZWRpdG9yIHtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgcGFkZGluZzogMWVtO1xuICBtYXJnaW46IDFlbSAwO1xuICBib3gtc2hhZG93OiAxMHB4IDEwcHggMTBweCAjY2NjO1xufVxuXG5idXR0b24uZG93bmxvYWQge1xuICBwYWRkaW5nOiAwLjVlbSAxZW07XG4gIG1hcmdpbjogMWVtIDA7XG59XG5cbiN1cGxvYWQge1xuICBwYWRkaW5nOiAxZW0gMDtcbn1cblxuI3VwbG9hZCwgI2xpbmstaWQge1xuICBtYXJnaW4tcmlnaHQ6IDNlbTtcbn1cblxuI2V4cHJlc3Npb24tZW50cnkge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbiNsaW5rLWlkLCAjZXhwcmVzc2lvbi1lbnRyeSB7XG4gIHdpZHRoOiAxOGVtO1xufVxuXG4uZXJyb3Ige1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHllbGxvdztcbiAgcGFkZGluZzogMWVtO1xuICBtYXJnaW46IDFlbSAwO1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdvbGRlbnJvZHllbGxvdztcbn1cblxuLndhcm5pbmcge1xuICBmb250LXNpemU6IHNtYWxsO1xuICBjb2xvcjogZGFya29yYW5nZTtcbn1cbiJdfQ== */"] });
    return AppComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["LiveAnnouncer"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var ng_rule_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-rule-editor */ "vnGe");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                ng_rule_editor__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        ng_rule_editor__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    ng_rule_editor__WEBPACK_IMPORTED_MODULE_2__["RuleEditorModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
                ],
                providers: [],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "vnGe":
/*!********************************************************!*\
  !*** ./dist/ng-rule-editor/fesm2015/ng-rule-editor.js ***!
  \********************************************************/
/*! exports provided: RuleEditorComponent, RuleEditorModule, RuleEditorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorComponent", function() { return RuleEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorModule", function() { return RuleEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleEditorService", function() { return RuleEditorService; });
/* harmony import */ var _home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "rePB");
/* harmony import */ var _home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ "uFwe");
/* harmony import */ var _home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "KQm4");
/* harmony import */ var _home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "1OyB");
/* harmony import */ var _home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "vuIU");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fast-copy */ "Q1PT");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/drag-drop */ "5+WD");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/snack-bar */ "dNgK");
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/clipboard */ "UXJo");
/* harmony import */ var autocomplete_lhc__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! autocomplete-lhc */ "0QMv");
/* harmony import */ var autocomplete_lhc__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(autocomplete_lhc__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var easy_path_expressions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! easy-path-expressions */ "zL9l");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/radio */ "QibW");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");



























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

var CASE_REGEX = /^\s*iif\s*\((.*)\)\s*$/; // Supported unit conversions. Key is the "from" and value is the "to" array

var UNIT_CONVERSION = {
  kg: [{
    unit: 'lbs',
    factor: 2.20462
  }],
  lbs: [{
    unit: 'kg',
    factor: 0.453592
  }],
  '[in_i]': [{
    unit: 'cm',
    factor: 2.54
  }, {
    unit: 'm',
    factor: 0.0254
  }]
};

var RuleEditorService = /*#__PURE__*/function () {
  function RuleEditorService() {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, RuleEditorService);

    this.syntaxType = 'simple';
    this.uneditableVariablesChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.variablesChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.questionsChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.mightBeScoreChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.finalExpressionChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.disableAdvancedChange = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    this.needsAdvancedInterface = false;
    this.doNotAskToCalculateScore = false;
    this.LANGUAGE_FHIRPATH = 'text/fhirpath';
    this.LANGUAGE_FHIR_QUERY = 'application/x-fhir-query';
    this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
    this.QUERY_REGEX = /^Observation\?code=(.+)&date=gt{{today\(\)-(\d+) (.+)}}&patient={{%patient.id}}&_sort=-date&_count=1$/;
    this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
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


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(RuleEditorService, [{
    key: "addVariable",
    value: function addVariable() {
      // Get all the existing variable names
      var existingNames = this.variables.map(function (e) {
        return e.label;
      }).concat(this.uneditableVariables.map(function (e) {
        return e.name;
      }));
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

  }, {
    key: "remove",
    value: function remove(i) {
      this.variables.splice(i, 1);
    }
    /**
     * Trigger an update (used when changing variable names to update the preview)
     */

  }, {
    key: "update",
    value: function update() {
      this.variablesChange.next(this.variables);
    }
    /**
     * Checks the advanced interface status and allows toggle if no expressions or
     * queries are present
     * @param toggleOn - Set the advanced interface on (without having to run checks)
     */

  }, {
    key: "checkAdvancedInterface",
    value: function checkAdvancedInterface(toggleOn) {
      if (toggleOn) {
        this.needsAdvancedInterface = true;
      } else {
        var needsAdvanced = false; // Check variables

        if (this.variables.find(function (e) {
          return e.type === 'expression' || e.type === 'query';
        }) !== undefined) {
          needsAdvanced = true;
        } // Check final expression


        if (this.syntaxType === 'fhirpath') {
          needsAdvanced = true;
        }

        this.needsAdvancedInterface = needsAdvanced;
      }

      this.disableAdvancedChange.next(this.needsAdvancedInterface);
    }
    /**
     * Get the list of uneditable variables based on the FHIR Questionnaire:
     * Launch context + variables outside not on the current item scope
     * @param questionnaire - FHIR Questionnaire
     * @param linkIdContext - Context to use for final expression
     * @param launchContextOnly - Only show the launch context related extensions (default: false)
     */

  }, {
    key: "getUneditableVariables",
    value: function getUneditableVariables(questionnaire, linkIdContext) {
      var _this = this;

      var launchContextOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var uneditableVariables = [];

      if (Array.isArray(questionnaire.extension)) {
        var variables = questionnaire.extension.reduce(function (accumulator, extension) {
          var _a, _b;

          if (extension.url === _this.LAUNCH_CONTEXT_URI && extension.extension) {
            accumulator.push({
              name: extension.extension.find(function (e) {
                return e.url === 'name';
              }).valueId,
              type: (_a = extension.extension.filter(function (e) {
                return e.url === 'type';
              })) === null || _a === void 0 ? void 0 : _a.map(function (e) {
                return e.valueCode;
              }).join('|'),
              description: (_b = extension.extension.find(function (e) {
                return e.url === 'description';
              })) === null || _b === void 0 ? void 0 : _b.valueString
            });
          } else if (_this.isVariable(extension) && !launchContextOnly) {
            accumulator.push({
              name: extension.valueExpression.name,
              type: 'Variable',
              description: extension.valueExpression.expression
            });
          }

          return accumulator;
        }, []);
        uneditableVariables.push.apply(uneditableVariables, Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(variables));
      } // Get the variables on item ancestors where linkId matches


      if (questionnaire.item instanceof Array && !launchContextOnly) {
        var ancestors = this.getAncestors(questionnaire.item, linkIdContext, []);

        if (ancestors instanceof Array) {
          ancestors.forEach(function (currentItem) {
            if (currentItem.extension instanceof Array) {
              currentItem.extension.forEach(function (extension) {
                if (_this.isVariable(extension)) {
                  uneditableVariables.push({
                    name: extension.valueExpression.name,
                    type: 'Item variable',
                    description: extension.valueExpression.expression
                  });
                }
              });
            }
          });
        }
      }

      return uneditableVariables;
    }
    /**
     * Find the ancestors of an item given the linkId and return those items.
     * @param items - Items array
     * @param itemLinkId - The item for which to determine ancestors
     * @param ancestors - Array of ancestor items. Empty array for root level
     * @return
     */

  }, {
    key: "getAncestors",
    value: function getAncestors(items, itemLinkId, ancestors) {
      var _iterator = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var currentItem = _step.value;

          if (currentItem.linkId === itemLinkId) {
            return ancestors;
          }

          if (currentItem.item instanceof Array) {
            var tmp = this.getAncestors(currentItem.item, itemLinkId, ancestors.concat(currentItem));

            if (tmp !== null) {
              return tmp;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
    /**
     * Returns true if extension is a variable with FHIRPath or FHIR Query as the
     * language
     * @param extension - FHIR extension
     * @return true if extension is a variable
     * @private
     */

  }, {
    key: "isVariable",
    value: function isVariable(extension) {
      return extension.url === this.VARIABLE_EXTENSION && extension.valueExpression && (extension.valueExpression.language === this.LANGUAGE_FHIRPATH || extension.valueExpression.language === this.LANGUAGE_FHIR_QUERY);
    }
    /**
     * Get and remove the variables from the FHIR object
     * @param items - Question array
     * @param linkIdContext - Context to use for extracting variables
     * @return Array of variables
     */

  }, {
    key: "extractVariablesFromItems",
    value: function extractVariablesFromItems(items, linkIdContext) {
      // Look at the item fhirpath related extensions to populate the editable variables
      var item = items.find(function (e) {
        return e.linkId === linkIdContext && e.extension;
      });

      if (item) {
        return this.extractVariablesFromExtensions(item);
      } else {
        if (items.item && items.item.length) {
          var _iterator2 = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(items.item),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var searchItem = _step2.value;

              if (searchItem.item) {
                var ret = this.extractVariablesFromItems(searchItem.item, linkIdContext);

                if (ret.length) {
                  return ret;
                }
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return [];
      }
    }
    /**
     * Get and remove the variables from an item or FHIR questionnaire
     * @param item - FHIR Questionnaire or item
     * @return Array of variables
     * @private
     */

  }, {
    key: "extractVariablesFromExtensions",
    value: function extractVariablesFromExtensions(item) {
      var _this2 = this;

      var variables = [];
      var nonVariableExtensions = []; // Add an index to each extension which we will then use to get the
      // variables back in the correct order. __$index will be removed on save

      item.extension = item.extension.map(function (e, i) {
        return Object.assign(Object.assign({}, e), {
          __$index: i
        });
      });
      item.extension.forEach(function (extension) {
        if (extension.url === _this2.VARIABLE_EXTENSION && extension.valueExpression) {
          switch (extension.valueExpression.language) {
            case _this2.LANGUAGE_FHIRPATH:
              var fhirPathVarToAdd = _this2.processVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index, extension.valueExpression.extension);

              if (fhirPathVarToAdd.type === 'expression') {
                _this2.needsAdvancedInterface = true;
              }

              variables.push(fhirPathVarToAdd);
              break;

            case _this2.LANGUAGE_FHIR_QUERY:
              var queryVarToAdd = _this2.processQueryVariable(extension.valueExpression.name, extension.valueExpression.expression, extension.__$index);

              if (queryVarToAdd.type === 'query') {
                _this2.needsAdvancedInterface = true;
              }

              variables.push(queryVarToAdd);
              break;
          }
        } else {
          nonVariableExtensions.push(extension);
        }
      }); // Remove the variables so they can be re-added on export

      item.extension = nonVariableExtensions;
      return variables;
    }
    /**
     * Get and remove the variables from the FHIR object
     * @param fhir - FHIR Questionnaire
     */

  }, {
    key: "extractTopLevelVariables",
    value: function extractTopLevelVariables(fhir) {
      if (fhir.extension instanceof Array) {
        return this.extractVariablesFromExtensions(fhir);
      } else {
        return [];
      }
    }
    /**
     * Check if the current item has an ordinalValue extension on the answer
     * @param item - Question item or linkId
     */

  }, {
    key: "itemHasScore",
    value: function itemHasScore(item) {
      if (typeof item === 'string') {
        item = this.linkIdToQuestion[item];
      }

      return (item.answerOption || []).some(function (answerOption) {
        return (answerOption.extension || []).some(function (extension) {
          return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
        });
      });
    }
    /**
     * Get the number of ordinalValue on the answers of the questions on the
     * Questionnaire
     * @param item - FHIR Questionnaire or item
     * @param linkIdContext - linkId to exclude from calculation
     * @return number of score questions on the questionnaire
     */

  }, {
    key: "getScoreQuestionCount",
    value: function getScoreQuestionCount(item, linkIdContext) {
      var _this3 = this;

      var scoreQuestions = 0;
      item.item.forEach(function (currentItem) {
        if (!currentItem.repeats && _this3.itemHasScore(currentItem)) {
          scoreQuestions++;
        }

        if (currentItem.item instanceof Array) {
          var nestedScoreQuestionCount = _this3.getScoreQuestionCount(currentItem, linkIdContext);

          scoreQuestions += nestedScoreQuestionCount;
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

  }, {
    key: "import",
    value: function _import(expressionUri, questionnaire, linkIdContext) {
      this.linkIdContext = linkIdContext;
      this.fhir = fast_copy__WEBPACK_IMPORTED_MODULE_8___default()(questionnaire);
      var loadSuccess = this.fhir.resourceType === 'Questionnaire';

      if (loadSuccess && this.fhir.item && this.fhir.item.length) {
        if (!this.doNotAskToCalculateScore) {
          // If there is at least one score question we will ask the user if they
          // want to calculate the score
          var SCORE_MIN_QUESTIONS = 1;
          this.mightBeScore = this.getScoreQuestionCount(this.fhir, linkIdContext) > SCORE_MIN_QUESTIONS;
          this.mightBeScoreChange.next(this.mightBeScore);
        }

        this.linkIdToQuestion = {};
        this.needsAdvancedInterface = false;
        this.caseStatements = false;
        this.processItem(this.fhir.item);

        if (linkIdContext !== undefined && linkIdContext !== '') {
          this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext);
          this.variables = this.extractVariablesFromItems(this.fhir.item, linkIdContext);
        } else {
          this.uneditableVariables = this.getUneditableVariables(this.fhir, linkIdContext, true);
          this.variables = this.extractTopLevelVariables(this.fhir); // Since we don't have a target item the output expression does not make sense so hide it.

          expressionUri = '';
        }

        this.uneditableVariablesChange.next(this.uneditableVariables);
        this.variablesChange.next(this.variables);
        this.questions = []; // tslint:disable-next-line:forin

        for (var key in this.linkIdToQuestion) {
          if (!this.linkIdToQuestion.hasOwnProperty(key)) {
            return;
          }

          var e = this.linkIdToQuestion[key]; // TODO decimal vs choice

          var MAX_Q_LEN = 60; // Maximum question length before truncating.

          var text = e.text;

          if (e.text) {
            this.questions.push({
              linkId: e.linkId,
              text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
              unit: this.getQuestionUnits(e.linkId)
            });
          }
        }

        this.questionsChange.next(this.questions);

        if (expressionUri) {
          var expression = this.extractExpression(expressionUri, this.fhir.item, linkIdContext);

          if (expression !== null) {
            // @ts-ignore
            this.finalExpression = expression.valueExpression.expression;
            this.finalExpressionExtension = expression;
            this.caseStatements = this.finalExpression.match(CASE_REGEX) !== null;
            var simpleSyntax = this.extractSimpleSyntax(expression);

            if (simpleSyntax === null && this.finalExpression !== '') {
              this.syntaxType = 'fhirpath';
              this.needsAdvancedInterface = true;
            } else {
              this.syntaxType = 'simple';
              this.simpleExpression = simpleSyntax;
            }
          } else {
            // Reset input to be a blank simple expression if there is nothing on
            // the form
            this.syntaxType = 'simple';
            this.simpleExpression = '';
            this.finalExpression = '';
            this.finalExpressionExtension = {
              url: expressionUri,
              valueExpression: {
                language: 'text/fhirpath',
                expression: this.finalExpression
              }
            };
          }

          this.finalExpressionChange.next(this.finalExpression);
        }
      }

      return loadSuccess;
    }
    /**
     * Process nested FHIR Questionnaire items
     * @param items - Current level of item nesting
     * @private
     */

  }, {
    key: "processItem",
    value: function processItem(items) {
      var _this4 = this;

      items.forEach(function (e) {
        _this4.linkIdToQuestion[e.linkId] = e;

        if (e.item) {
          _this4.processItem(e.item);
        }
      });
    }
    /**
     * Get and remove the simple syntax if available. If not return null
     * @param expression
     */

  }, {
    key: "extractSimpleSyntax",
    value: function extractSimpleSyntax(expression) {
      if (expression.valueExpression && expression.valueExpression.extension) {
        var customExtension = expression.valueExpression.extension.find(function (e) {
          return e.url === RuleEditorService.SIMPLE_SYNTAX_EXTENSION;
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

  }, {
    key: "extractExpression",
    value: function extractExpression(expressionUri, items, linkId) {
      var _this5 = this;

      var _iterator3 = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(items),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;

          if (item.linkId === linkId && item.extension) {
            var extensionIndex = item.extension.findIndex(function (e) {
              return e.url === expressionUri && e.valueExpression.language === _this5.LANGUAGE_FHIRPATH && e.valueExpression.expression;
            });

            if (extensionIndex !== -1) {
              var finalExpression = item.extension[extensionIndex];
              item.extension.splice(extensionIndex, 1);
              return finalExpression;
            }
          } else if (item.item) {
            return this.extractExpression(expressionUri, item.item, linkId);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
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

  }, {
    key: "processVariable",
    value: function processVariable(name, expression, index, extensions) {
      var matches = expression.match(this.QUESTION_REGEX);
      var simpleExtension = extensions && extensions.find(function (e) {
        return e.url === RuleEditorService.SIMPLE_SYNTAX_EXTENSION;
      });

      if (matches !== null) {
        var linkId = matches[1];
        var factor = matches[2];
        var variable = {
          __$index: index,
          label: name,
          type: 'question',
          linkId: linkId,
          expression: expression
        };

        if (factor) {
          // We might be able to do unit conversion
          var sourceUnits = this.getQuestionUnits(linkId);

          if (UNIT_CONVERSION.hasOwnProperty(sourceUnits)) {
            var conversions = UNIT_CONVERSION[sourceUnits];
            var conversion = conversions.find(function (e) {
              return e.factor.toString() === factor;
            });
            variable.unit = conversion.unit;
          }
        }

        return variable;
      } else if (simpleExtension !== undefined) {
        return {
          __$index: index,
          label: name,
          type: 'simple',
          expression: expression,
          simple: simpleExtension.valueString
        };
      } else {
        return {
          __$index: index,
          label: name,
          type: 'expression',
          expression: expression
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

  }, {
    key: "processQueryVariable",
    value: function processQueryVariable(name, expression, index) {
      var matches = expression.match(this.QUERY_REGEX);

      if (matches !== null) {
        var codes = matches[1].split('%2C'); // URL encoded comma ','

        var timeInterval = parseInt(matches[2], 10);
        var timeIntervalUnits = matches[3];
        return {
          __$index: index,
          label: name,
          type: 'queryObservation',
          codes: codes,
          timeInterval: timeInterval,
          timeIntervalUnit: timeIntervalUnits,
          expression: expression
        };
      } else {
        return {
          __$index: index,
          label: name,
          type: 'query',
          expression: expression
        };
      }
    } // TODO check behavior of repeating linkId

    /**
     * Get question units for the question
     * @param linkId - Question linkId
     * @private
     */

  }, {
    key: "getQuestionUnits",
    value: function getQuestionUnits(linkId) {
      var QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
      var question = this.linkIdToQuestion[linkId];

      if (question.extension) {
        var extension = question.extension.find(function (e) {
          return e.url === QUESTIONNAIRE_UNIT && e.valueCoding.system && e.valueCoding.system === 'http://unitsofmeasure.org';
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

  }, {
    key: "getNewLabelName",
    value: function getNewLabelName(existingNames) {
      // All letters which can be used for a simple variable name
      var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split(''); // First pass is with a single character variable name. Other passes are with two

      var firstLetterAlphabet = [''].concat(alphabet);

      var _iterator4 = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(firstLetterAlphabet),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var firstLetter = _step4.value;

          var _iterator5 = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(alphabet),
              _step5;

          try {
            var _loop = function _loop() {
              var secondLetter = _step5.value;
              var potentialName = firstLetter + secondLetter;
              var count = existingNames.filter(function (e) {
                return e === potentialName;
              });

              if (count.length === 0) {
                return {
                  v: potentialName
                };
              }
            };

            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _ret = _loop();

              if (typeof _ret === "object") return _ret.v;
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        } // Don't return a suggested name if we exhausted all combinations

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return '';
    }
    /**
     * Toggle the mightBeScore
     */

  }, {
    key: "toggleMightBeScore",
    value: function toggleMightBeScore() {
      this.mightBeScore = !this.mightBeScore;
      this.mightBeScoreChange.next(this.mightBeScore);
    }
    /**
     * Add variables and finalExpression and return the new FHIR Questionnaire
     * @param url Extension URL to use for the expression
     * @param finalExpression
     */

  }, {
    key: "export",
    value: function _export(url, finalExpression) {
      var _this6 = this;

      // Copy the fhir object, so we can export more than once
      // (if we add our data the second export will have duplicates)
      var fhir = fast_copy__WEBPACK_IMPORTED_MODULE_8___default()(this.fhir);
      var variablesToAdd = this.variables.map(function (e) {
        var variable = {
          __$index: e.__$index,
          url: _this6.VARIABLE_EXTENSION,
          valueExpression: {
            name: e.label,
            language: e.type === 'query' ? _this6.LANGUAGE_FHIR_QUERY : _this6.LANGUAGE_FHIRPATH,
            expression: e.expression
          }
        };

        if (e.type === 'simple') {
          // @ts-ignore
          variable.valueExpression.extension = [{
            url: RuleEditorService.SIMPLE_SYNTAX_EXTENSION,
            valueString: e.simple
          }];
        }

        return variable;
      }); // Split the variables into two buckets: Variables present when
      // Questionnaire was imported and variables added by the user using the Rule
      // Editor. Add variables present initially among the existing extensions.
      // Add the remaining variables at the end

      var variablesPresentInitially = [];
      var variablesAdded = [];
      variablesToAdd.forEach(function (e) {
        if (e.__$index === undefined) {
          variablesAdded.push(e);
        } else {
          variablesPresentInitially.push(e);
        }
      });

      if (this.syntaxType === 'simple') {
        this.findOrAddExtension(finalExpression.valueExpression.extension, RuleEditorService.SIMPLE_SYNTAX_EXTENSION, 'String', this.simpleExpression);
      }

      if (this.linkIdContext !== undefined && this.linkIdContext !== null && this.linkIdContext !== '') {
        // Treat the final expression as an added variable since it needs to go after the variables added
        this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded.concat(finalExpression));
      } else {
        this.insertExtensions(fhir, fhir.item, this.linkIdContext, variablesPresentInitially, variablesAdded);
      } // If there are any query observation extensions check to make sure there is
      // a patient launch context. If there is not add one.


      var hasQueryObservations = this.variables.find(function (e) {
        return e.type === 'queryObservation';
      });

      if (hasQueryObservations !== undefined) {
        var patientLaunchContext = fhir.extension.find(function (extension) {
          if (extension.url === _this6.LAUNCH_CONTEXT_URI && Array.isArray(extension.extension)) {
            var patientName = extension.extension.find(function (subExtension) {
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

          var name = 'patient';
          var type = 'Patient';
          var description = 'For filling in patient information as the subject for the form';
          fhir.extension.push({
            url: this.LAUNCH_CONTEXT_URI,
            extension: [{
              url: 'name',
              valueId: name
            }, {
              url: 'type',
              valueCode: type
            }, {
              url: 'description',
              valueString: description
            }]
          });
          this.uneditableVariables.push({
            name: name,
            type: type,
            description: description
          });
          this.uneditableVariablesChange.next(this.uneditableVariables);
        }
      }

      return fhir;
    }
    /**
     * Given an extension array, find an extension based on the URI and update the
     * value for the type. If one does not exist add it to the extension list
     * @param extension - Extension array
     * @param uri - URI to search for
     * @param type - Type of value
     * @param value - Value
     * @private
     */

  }, {
    key: "findOrAddExtension",
    value: function findOrAddExtension(extension, uri, type, value) {
      if (extension instanceof Array) {
        var index = extension.findIndex(function (e) {
          return e.url === uri;
        });

        var extensionToAdd = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({
          url: uri
        }, 'value' + type, value);

        if (index === -1) {
          extension.push(extensionToAdd);
        } else {
          extension[index] = extensionToAdd;
        }
      }
    }
    /**
     * Takes FHIR questionnaire definition and a linkId and returns the FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Question linkId
     */

  }, {
    key: "addTotalScoreRule",
    value: function addTotalScoreRule(questionnaire, linkId) {
      this.fhir = questionnaire;
      this.linkIdContext = linkId;
      return this.addSumOfScores();
    }
    /**
     * Get a list of item ids based on the logic for `addSumOfScores()`
     * @param items - FHIR item array
     * @param linkId - Link ID context
     */

  }, {
    key: "getScoreItemIds",
    value: function getScoreItemIds(items, linkId) {
      var scoreItemIds = [];

      for (var i = 0; i < items.length; i++) {
        var item = items[i]; // Repeating items are currently not supported

        if (item.repeats) {
          continue;
        }

        if (item.linkId === linkId) {
          // Do not consider items at or below the linkId context required
          break;
        } else if (this.hasRuleEditorExtension(item)) {
          // If the current item is already a score calculation or this is
          // repeating we should not consider it or any items above
          scoreItemIds = [];
        } else if (this.itemHasScore(item)) {
          scoreItemIds.push(item.linkId);
        } // Work with nested items


        if (item.item) {
          scoreItemIds = scoreItemIds.concat(this.getScoreItemIds(item.item, linkId));
        }
      }

      return scoreItemIds;
    }
    /**
     * Given the current FHIR questionnaire definition and a linkId return a new FHIR
     * Questionnaire with a calculated expression at the given linkId which sums up
     * all the ordinal values in the questionnaire:
     *  * Assume scored items are above (in question order) the total score item.
     *  * If a preceding item is also a total score item, don’t consider any earlier items.
     */

  }, {
    key: "addSumOfScores",
    value: function addSumOfScores() {
      var _this7 = this;

      var fhir = this.fhir;
      var linkIdContext = this.linkIdContext;
      var variableNames = []; // Get an array of linkIds for score questions

      var scoreQuestionLinkIds = this.getScoreItemIds(fhir.item, linkIdContext); // Get as many short suggested variable names as we have score questions

      scoreQuestionLinkIds.forEach(function () {
        variableNames.push(_this7.getNewLabelName(variableNames));
      });
      var scoreQuestions = scoreQuestionLinkIds.map(function (e, i) {
        return {
          url: _this7.VARIABLE_EXTENSION,
          valueExpression: {
            name: variableNames[i],
            language: _this7.LANGUAGE_FHIRPATH,
            expression: "%questionnaire.item.where(linkId = '".concat(e, "').answerOption") + ".where(valueCoding.code=%resource.item.where(linkId = '".concat(e, "').answer.valueCoding.code).extension") + ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal",
            extension: [{
              url: RuleEditorService.SCORE_VARIABLE_EXTENSION
            }]
          }
        };
      });
      var anyQuestionAnswered = {
        url: this.VARIABLE_EXTENSION,
        valueExpression: {
          name: 'any_questions_answered',
          language: this.LANGUAGE_FHIRPATH,
          expression: variableNames.map(function (e) {
            return "%".concat(e, ".exists()");
          }).join(' or '),
          extension: [{
            url: RuleEditorService.SCORE_VARIABLE_EXTENSION
          }]
        }
      };
      var sumString = variableNames.map(function (e) {
        return "iif(%".concat(e, ".exists(), %").concat(e, ", 0)");
      }).join(' + ');
      var totalCalculation = {
        url: this.CALCULATED_EXPRESSION,
        valueExpression: {
          description: 'Total score calculation',
          language: this.LANGUAGE_FHIRPATH,
          expression: "iif(%any_questions_answered, ".concat(sumString, ", {})"),
          extension: [{
            url: RuleEditorService.SCORE_EXPRESSION_EXTENSION
          }]
        }
      };
      scoreQuestions.push(anyQuestionAnswered); // @ts-ignore

      scoreQuestions.push(totalCalculation);
      this.insertExtensions(fhir, fhir.item, linkIdContext, [], scoreQuestions);
      return fhir;
    }
    /**
     * Checks if the referenced Questionnaire item is a score calculation added by
     * the Rule Editor
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to check, if not provided check
     * all items on the questionnaire
     * @return True if the question at linkId is a score calculation created by
     * the Rule Editor, false otherwise
     */

  }, {
    key: "isScoreCalculation",
    value: function isScoreCalculation(questionnaire, linkId) {
      var _this8 = this;

      var checkForScore = function checkForScore(item) {
        if (linkId === undefined || linkId === item.linkId) {
          var isScore = _this8.hasRuleEditorExtension(item);

          if (isScore) {
            return true;
          }
        }

        if (item.item) {
          var subItemHasScore = item.item.find(function (subItem) {
            return checkForScore(subItem);
          });

          if (subItemHasScore) {
            return true;
          }
        }

        return false;
      };

      return !!questionnaire.item.find(function (item) {
        return checkForScore(item);
      });
    }
    /**
     * Returns true if the current item has a custom Rule Editor score extension
     * (indicating it was previously modified by the Rule Editor)
     * @param item
     * @private
     */

  }, {
    key: "hasRuleEditorExtension",
    value: function hasRuleEditorExtension(item) {
      var _this9 = this;

      if (item.extension) {
        return item.extension.find(function (extension) {
          return !!_this9.isRuleEditorExtension(extension);
        });
      } else {
        return false;
      }
    }
    /**
     * Updates a FHIR questionnaire score calculation on the item identified by
     * the linkId
     * @param questionnaire - FHIR Questionnaire
     * @param linkId - Questionnaire item Link ID to update
     * @return Questionnaire with updated calculation
     */

  }, {
    key: "updateScoreCalculation",
    value: function updateScoreCalculation(questionnaire, linkId) {
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

  }, {
    key: "removeSumOfScores",
    value: function removeSumOfScores(questionnaire, linkId) {
      var _this10 = this;

      this.fhir = questionnaire;

      var removeItemScoreVariables = function removeItemScoreVariables(item) {
        if (linkId === undefined || linkId === item.linkId) {
          item.extension = item.extension.filter(function (extension) {
            return !_this10.isRuleEditorExtension(extension);
          });
        }

        if (item.item) {
          item.item.forEach(function (subItem) {
            return removeItemScoreVariables(subItem);
          });
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

  }, {
    key: "isRuleEditorExtension",
    value: function isRuleEditorExtension(extension) {
      if (extension.valueExpression && extension.valueExpression.extension && extension.valueExpression.extension.length) {
        return !!extension.valueExpression.extension.find(function (e) {
          return e && (e.url === RuleEditorService.SCORE_VARIABLE_EXTENSION || e.url === RuleEditorService.SCORE_EXPRESSION_EXTENSION);
        });
      } else {
        return false;
      }
    }
  }, {
    key: "insertExtensions",
    value: function insertExtensions(fhir, items, linkId, variablesPresentInitially, variablesAdded) {
      if (linkId === undefined || linkId === null || linkId === '') {
        addOrInsertExtensions(fhir);
      } else {
        var _iterator6 = Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__["default"])(items),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var item = _step6.value;

            if (item.linkId === linkId) {
              addOrInsertExtensions(item);
              break;
            } else if (item.item) {
              this.insertExtensions(fhir, item.item, linkId, variablesPresentInitially, variablesAdded);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }

      function addOrInsertExtensions(item) {
        if (item.extension) {
          // Introduce variables present before
          item.extension = item.extension.concat(variablesPresentInitially); // Sort by index

          item.extension.sort(function (a, b) {
            return a.__$index - b.__$index;
          }); // Add variables added by the user

          item.extension = item.extension.concat(variablesAdded);
        } else {
          item.extension = variablesPresentInitially.concat(variablesAdded);
        } // Remove __$index


        item.extension = item.extension.map(function (_a) {
          var __$index = _a.__$index,
              other = Object(tslib__WEBPACK_IMPORTED_MODULE_5__["__rest"])(_a, ["__$index"]);

          return other;
        });
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

  }, {
    key: "valueOrScoreExpression",
    value: function valueOrScoreExpression(linkId, itemHasScore, convertible, unit, toUnit) {
      if (itemHasScore) {
        return "%questionnaire.item.where(linkId = '".concat(linkId, "').answerOption") + ".where(valueCoding.code=%resource.item.where(linkId = '".concat(linkId, "').answer.valueCoding.code).extension") + ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').valueDecimal";
      } else if (convertible && unit && toUnit) {
        var factor = UNIT_CONVERSION[unit].find(function (e) {
          return e.unit === toUnit;
        }).factor;
        return "%resource.item.where(linkId='".concat(linkId, "').answer.value*").concat(factor);
      } else {
        return "%resource.item.where(linkId='".concat(linkId, "').answer.value");
      }
    }
  }]);

  return RuleEditorService;
}();

RuleEditorService.SCORE_VARIABLE_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-variable';
RuleEditorService.SCORE_EXPRESSION_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/rule-editor-score-expression';
RuleEditorService.SIMPLE_SYNTAX_EXTENSION = 'http://lhcforms.nlm.nih.gov/fhir/ext/simple-syntax';

RuleEditorService.ɵfac = function RuleEditorService_Factory(t) {
  return new (t || RuleEditorService)();
};

RuleEditorService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: RuleEditorService,
  factory: RuleEditorService.ɵfac,
  providedIn: 'root'
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](RuleEditorService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Injectable"],
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [];
  }, null);
})();

var CalculateSumPromptComponent = /*#__PURE__*/function () {
  function CalculateSumPromptComponent(ruleEditorService) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, CalculateSumPromptComponent);

    this.ruleEditorService = ruleEditorService;
    this.lhcStyle = {};
    this.export = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
  }
  /**
   * Angular lifecycle hook called when the component is initialized
   */


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(CalculateSumPromptComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {}
    /**
     * Close the dialog by specifying this should not be a score calculation
     */

  }, {
    key: "onCloseClick",
    value: function onCloseClick() {
      this.ruleEditorService.toggleMightBeScore();
    }
    /**
     * Export the sum of scores as a FHIR Questionnaire
     */

  }, {
    key: "onExportClick",
    value: function onExportClick() {
      this.export.emit();
    }
  }]);

  return CalculateSumPromptComponent;
}();

CalculateSumPromptComponent.ɵfac = function CalculateSumPromptComponent_Factory(t) {
  return new (t || CalculateSumPromptComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService));
};

CalculateSumPromptComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: CalculateSumPromptComponent,
  selectors: [["lhc-calculate-sum-prompt"]],
  inputs: {
    lhcStyle: "lhcStyle"
  },
  outputs: {
    export: "export"
  },
  decls: 9,
  vars: 6,
  consts: [[1, "score-modal"], ["id", "export-score", 1, "primary", 3, "click"], ["id", "skip-export-score", 3, "click"]],
  template: function CalculateSumPromptComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "It looks like this might be a score calculation.");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Would you like to calculate the sum of scores?");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculateSumPromptComponent_Template_button_click_5_listener() {
        return ctx.onExportClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Yes");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculateSumPromptComponent_Template_button_click_7_listener() {
        return ctx.onCloseClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "No");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.description);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.description);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.buttonPrimary);
    }
  },
  styles: ["*[_ngcontent-%COMP%]{font-size:1rem}.score-modal[_ngcontent-%COMP%]{text-align:center}button[_ngcontent-%COMP%]{margin:0 .5em;height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](CalculateSumPromptComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-calculate-sum-prompt',
      templateUrl: './calculate-sum-prompt.component.html',
      styleUrls: ['./calculate-sum-prompt.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }];
  }, {
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    export: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }]
  });
})();

function UneditableVariablesComponent_div_0_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var variable_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](variable_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](variable_r2.description);
  }
}

function UneditableVariablesComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Variables in Scope for This Item");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Variable Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Description/Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, UneditableVariablesComponent_div_0_div_11_Template, 7, 3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r0.uneditableVariables);
  }
}

var UneditableVariablesComponent = /*#__PURE__*/function () {
  function UneditableVariablesComponent(variableService) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, UneditableVariablesComponent);

    this.variableService = variableService;
  }
  /**
   * Angular lifecycle hook called when the component is initialized
   */


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(UneditableVariablesComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this11 = this;

      this.uneditableVariables = this.variableService.uneditableVariables;
      this.uneditableVariablesSubscription = this.variableService.uneditableVariablesChange.subscribe(function (variables) {
        _this11.uneditableVariables = variables;
      });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */

  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      this.uneditableVariablesSubscription.unsubscribe();
    }
  }]);

  return UneditableVariablesComponent;
}();

UneditableVariablesComponent.ɵfac = function UneditableVariablesComponent_Factory(t) {
  return new (t || UneditableVariablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService));
};

UneditableVariablesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: UneditableVariablesComponent,
  selectors: [["lhc-uneditable-variables"]],
  decls: 1,
  vars: 1,
  consts: [[4, "ngIf"], [1, "container"], [1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["class", "variable-row", 4, "ngFor", "ngForOf"], [1, "variable-row"]],
  template: function UneditableVariablesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, UneditableVariablesComponent_div_0_Template, 12, 1, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.uneditableVariables.length);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"]],
  styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.variable-header[_ngcontent-%COMP%], .variable-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.variable-row[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.1)}.variable-column-details[_ngcontent-%COMP%], .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{padding:.5rem}.variable-column-label[_ngcontent-%COMP%]{display:flex;flex:0 0 12em}.variable-column-type[_ngcontent-%COMP%]{flex:0 0 15em}.variable-column-details[_ngcontent-%COMP%]{flex:1 0 25em;min-width:0}@media (max-width:975px){.variable-row[_ngcontent-%COMP%]{flex-direction:column}.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{flex:100%}.variable-column-details[_ngcontent-%COMP%]{flex:auto}}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](UneditableVariablesComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-uneditable-variables',
      templateUrl: './uneditable-variables.component.html',
      styleUrls: ['./uneditable-variables.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }];
  }, null);
})();

function SyntaxPreviewComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " FHIRPath: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "pre", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SyntaxPreviewComponent_div_0_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r2);
      var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r1.copyNotification();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "svg", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "path", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "path", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", ctx_r0.lhcStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r0.syntax);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("      ", ctx_r0.syntax, "\n    ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("cdkCopyToClipboard", ctx_r0.syntax);
  }
}

var SyntaxPreviewComponent = /*#__PURE__*/function () {
  function SyntaxPreviewComponent(snackBar) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, SyntaxPreviewComponent);

    this.snackBar = snackBar;
    this.showWhenEmpty = false;
  }

  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(SyntaxPreviewComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {}
    /**
     * Show an ephemeral notification that the value was copied.
     */

  }, {
    key: "copyNotification",
    value: function copyNotification() {
      this.snackBar.open('Copied to clipboard', null, {
        duration: 2000
      });
    }
  }]);

  return SyntaxPreviewComponent;
}();

SyntaxPreviewComponent.ɵfac = function SyntaxPreviewComponent_Factory(t) {
  return new (t || SyntaxPreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBar"]));
};

SyntaxPreviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: SyntaxPreviewComponent,
  selectors: [["lhc-syntax-preview"]],
  inputs: {
    syntax: "syntax",
    lhcStyle: "lhcStyle",
    showWhenEmpty: "showWhenEmpty"
  },
  decls: 1,
  vars: 1,
  consts: [["class", "text-muted syntax-preview", 3, "ngStyle", 4, "ngIf"], [1, "text-muted", "syntax-preview", 3, "ngStyle"], [1, "fhirpath"], [1, "d-inline", "text-muted", "syntax", 3, "matTooltip"], ["matTooltip", "Copy to clipboard", "aria-label", "Copy to clipboard", 1, "copy", 3, "cdkCopyToClipboard", "click"], ["xmlns", "http://www.w3.org/2000/svg", "height", "16px", "viewBox", "0 0 24 24", "width", "24px", "fill", "#000000"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"]],
  template: function SyntaxPreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SyntaxPreviewComponent_div_0_Template, 9, 4, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.syntax || ctx.showWhenEmpty);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"], _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_15__["CdkCopyToClipboard"]],
  styles: [".syntax[_ngcontent-%COMP%], [_nghost-%COMP%]{overflow:hidden}.syntax[_ngcontent-%COMP%]{white-space:nowrap;text-overflow:ellipsis}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.syntax-preview[_ngcontent-%COMP%]{display:flex;width:100%}.fhirpath[_ngcontent-%COMP%]{flex:1 0 10em;min-width:0;padding-right:1em}.copy[_ngcontent-%COMP%]{margin-top:1em;flex:0 0 3em;border:none;background:transparent}  .mat-tooltip{overflow-wrap:break-word}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](SyntaxPreviewComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-syntax-preview',
      templateUrl: './syntax-preview.component.html',
      styleUrls: ['./syntax-preview.component.css']
    }]
  }], function () {
    return [{
      type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBar"]
    }];
  }, {
    syntax: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    showWhenEmpty: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }]
  });
})();

function QuestionComponent_option_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var question_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", question_r4.linkId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", question_r4.text + " (" + question_r4.linkId + ")", " ");
  }
}

function QuestionComponent_select_7_option_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var u_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("value", u_r6.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Convert to ", u_r6.unit, "");
  }
}

function QuestionComponent_select_7_Template(rf, ctx) {
  if (rf & 1) {
    var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "select", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function QuestionComponent_select_7_Template_select_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r7.toUnit = $event;
    })("change", function QuestionComponent_select_7_Template_select_change_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r9.onChange(false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, QuestionComponent_select_7_option_3_Template, 2, 2, "option", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r1.lhcStyle.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r1.toUnit);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Keep form units (", ctx_r1.unit, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r1.conversionOptions);
  }
}

function QuestionComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.unit);
  }
}

function QuestionComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Score");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

var QuestionComponent = /*#__PURE__*/function () {
  function QuestionComponent(variableService) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, QuestionComponent);

    this.variableService = variableService;
    this.lhcStyle = {};
    this.linkId = '';
    this.itemHasScore = false;
    this.isNonConvertibleUnit = false;
  }
  /**
   * Angular lifecycle hook called when the component is initialized
   */


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(QuestionComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this12 = this;

      this.linkId = this.variable.linkId ? this.variable.linkId : '';
      this.toUnit = this.variable.unit ? this.variable.unit : '';
      this.questions = this.variableService.questions;
      this.onChange(false);
      this.variableService.questionsChange.subscribe(function (questions) {
        _this12.questions = questions;
      });
    }
    /**
     * Get the question based on linkId
     * @param linkId - FHIR linkId
     */

  }, {
    key: "getQuestion",
    value: function getQuestion(linkId) {
      return this.questions.find(function (q) {
        return q.linkId === linkId;
      });
    }
    /**
     * Get the list of units we can convert to based on the starting unit
     * @param unit - Starting unit
     */

  }, {
    key: "getConversionOptions",
    value: function getConversionOptions(unit) {
      return UNIT_CONVERSION[unit];
    }
    /**
     * Called when the questionnaire question or unit is changed
     * @param isQuestion - The change was for a question
     */

  }, {
    key: "onChange",
    value: function onChange(isQuestion) {
      if (isQuestion) {
        // Reset the conversion options when the question changes
        this.toUnit = '';
      } // If we already have a question selected (as opposed to the select... prompt)


      if (this.linkId) {
        var question = this.getQuestion(this.linkId);
        this.unit = question === null || question === void 0 ? void 0 : question.unit;
        this.conversionOptions = this.getConversionOptions(this.unit);
        this.isNonConvertibleUnit = this.unit && !this.conversionOptions; // Check if this is a score

        if (!this.conversionOptions && !this.isNonConvertibleUnit) {
          this.itemHasScore = this.variableService.itemHasScore(this.linkId);
        } else {
          this.itemHasScore = false;
        }

        this.variable.expression = this.variableService.valueOrScoreExpression(this.linkId, this.itemHasScore, !this.isNonConvertibleUnit, this.unit, this.toUnit);
      }
    }
  }]);

  return QuestionComponent;
}();

QuestionComponent.ɵfac = function QuestionComponent_Factory(t) {
  return new (t || QuestionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService));
};

QuestionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: QuestionComponent,
  selectors: [["lhc-question"]],
  inputs: {
    variable: "variable",
    lhcStyle: "lhcStyle"
  },
  decls: 11,
  vars: 9,
  consts: [[1, "form-inline", "question"], [1, "question-select"], ["aria-label", "Question", 3, "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "unit-select"], ["aria-label", "Unit conversion", 3, "ngModel", "style", "ngModelChange", "change", 4, "ngIf"], ["class", "detail", 4, "ngIf"], [3, "syntax", "lhcStyle"], [3, "value"], ["aria-label", "Unit conversion", 3, "ngModel", "ngModelChange", "change"], ["value", ""], [1, "detail"]],
  template: function QuestionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "select", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function QuestionComponent_Template_select_ngModelChange_2_listener($event) {
        return ctx.linkId = $event;
      })("change", function QuestionComponent_Template_select_change_2_listener() {
        return ctx.onChange(true);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "option", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Select...");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, QuestionComponent_option_5_Template, 2, 2, "option", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, QuestionComponent_select_7_Template, 4, 5, "select", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, QuestionComponent_div_8_Template, 2, 1, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, QuestionComponent_div_9_Template, 2, 0, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "lhc-syntax-preview", 8);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.select);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.linkId);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.questions);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.conversionOptions);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isNonConvertibleUnit);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.itemHasScore);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("syntax", ctx.variable.expression)("lhcStyle", ctx.lhcStyle);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], SyntaxPreviewComponent],
  styles: [".question[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.detail[_ngcontent-%COMP%]{margin-top:.5rem}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{box-sizing:border-box;margin-bottom:.5rem}.question-select[_ngcontent-%COMP%]{flex:50%;padding-right:.5rem}.unit-select[_ngcontent-%COMP%]{flex:50%;padding-left:.5rem}select[_ngcontent-%COMP%]{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question[_ngcontent-%COMP%]{flex-direction:column}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{flex:100%;padding:0}}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](QuestionComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-question',
      templateUrl: './question.component.html',
      styleUrls: ['./question.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }];
  }, {
    variable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }]
  });
})();

var _c0 = ["autoComplete"];

function QueryObservationComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " x-fhir-query: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "pre", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", ctx_r1.lhcStyle);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("title", ctx_r1.expression);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.expression);
  }
}

var QueryObservationComponent = /*#__PURE__*/function () {
  function QueryObservationComponent(http) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, QueryObservationComponent);

    this.http = http;
    this.queryUrl = 'https://clinicaltables.nlm.nih.gov/api/loinc_items/v3/search?df=text,LOINC_NUM';
    this.lhcStyle = {};
  }

  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(QueryObservationComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      if (this.variable !== undefined) {
        this.codes = this.variable.codes !== undefined ? this.variable.codes : [];
        this.timeInterval = this.variable.timeInterval || 1;
        this.timeIntervalUnit = this.variable.timeIntervalUnit || 'months';
        this.expression = this.variable.expression;
      } else {
        this.codes = [];
      }
    }
    /**
     * After the autocomplete is ready to be interacted with fetch the name for
     * any codes already in the query search.
     */

  }, {
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      var _this13 = this;

      this.autoComplete = new autocomplete_lhc__WEBPACK_IMPORTED_MODULE_16___default.a.Autocompleter.Search(this.autoCompleteElement.nativeElement, this.queryUrl, {
        tableFormat: true,
        valueCols: [0, 1],
        colHeaders: ['Text', 'LOINC Number'],
        maxSelect: '*'
      });
      this.codes.forEach(function (code) {
        var matches = code.match(/http:\/\/loinc.org\|(.+)/);

        if (matches !== null) {
          var loincCode = matches[1]; // LOINC Code

          _this13.http.get("".concat(_this13.queryUrl, "&terms=").concat(loincCode)).subscribe(function (data) {
            var namePosition = 3;
            var name = [data[namePosition][0][0], loincCode].join(' - ');

            _this13.autoComplete.storeSelectedItem(name, loincCode);

            _this13.autoComplete.addToSelectedArea(name);
          });
        } else {
          // Non-loinc code
          _this13.autoComplete.storeSelectedItem(code, undefined);

          _this13.autoComplete.addToSelectedArea(code);
        }
      });
      autocomplete_lhc__WEBPACK_IMPORTED_MODULE_16___default.a.Autocompleter.Event.observeListSelections("autocomplete-".concat(this.index), function () {
        var selectedItemData = _this13.autoComplete.getSelectedItemData(); // If there is no code then this is not a loinc code and we need to get
        // the value from the array above


        _this13.codes = _this13.autoComplete.getSelectedCodes().map(function (code, index) {
          return code === undefined ? selectedItemData[index].text : "http://loinc.org|".concat(code);
        });

        _this13.onChange();
      });
    }
    /**
     * Angular lifecycle hook
     */

  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      if (this.autoComplete !== undefined) {
        this.autoComplete.destroy();
      }
    }
    /**
     * On changes update the expression and preview
     */

  }, {
    key: "onChange",
    value: function onChange() {
      // Separate with URL encoded version of the comma: ','
      var codes = this.codes.join('%2C');
      this.variable.expression = this.expression = "Observation?code=".concat(codes, "&") + "date=gt{{today()-".concat(this.timeInterval, " ").concat(this.timeIntervalUnit, "}}&") + "patient={{%patient.id}}&_sort=-date&_count=1";
    }
  }]);

  return QueryObservationComponent;
}();

QueryObservationComponent.ɵfac = function QueryObservationComponent_Factory(t) {
  return new (t || QueryObservationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_17__["HttpClient"]));
};

QueryObservationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: QueryObservationComponent,
  selectors: [["lhc-query-observation"]],
  viewQuery: function QueryObservationComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, true);
    }

    if (rf & 2) {
      var _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.autoCompleteElement = _t.first);
    }
  },
  inputs: {
    variable: "variable",
    index: "index",
    lhcStyle: "lhcStyle"
  },
  decls: 17,
  vars: 10,
  consts: [[1, "form-inline", "query"], [1, "query-select"], ["placeholder", "LOINC Name / LOINC Number / Other Code", 1, "query-autocomplete", 3, "id"], ["autoComplete", ""], [1, "time-input"], ["aria-label", "Time interval", "type", "number", "min", "1", 3, "ngModel", "ngModelChange", "change"], [1, "time-select"], ["aria-label", "Time interval units", 3, "ngModel", "ngModelChange", "change"], ["value", "days"], ["value", "weeks"], ["value", "months"], ["value", "years"], ["class", "syntax-preview text-muted", 3, "ngStyle", 4, "ngIf"], [1, "syntax-preview", "text-muted", 3, "ngStyle"], [1, "d-inline", "text-muted", 3, "title"]],
  template: function QueryObservationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "input", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function QueryObservationComponent_Template_input_ngModelChange_5_listener($event) {
        return ctx.timeInterval = $event;
      })("change", function QueryObservationComponent_Template_input_change_5_listener() {
        return ctx.onChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "select", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function QueryObservationComponent_Template_select_ngModelChange_7_listener($event) {
        return ctx.timeIntervalUnit = $event;
      })("change", function QueryObservationComponent_Template_select_change_7_listener() {
        return ctx.onChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "option", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Day(s)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "option", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Week(s)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "option", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Month(s)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "option", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "Year(s)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, QueryObservationComponent_div_16_Template, 4, 3, "div", 12);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.input);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("id", "autocomplete-", ctx.index, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.input);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.timeInterval);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.input);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.timeIntervalUnit);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.codes.length);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"]],
  styles: [".query[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.detail[_ngcontent-%COMP%]{margin-top:.5rem}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{box-sizing:border-box;margin-bottom:.5rem}.query-select[_ngcontent-%COMP%]{flex:1 0 6em;padding-right:.5rem}.time-input[_ngcontent-%COMP%], .time-select[_ngcontent-%COMP%]{flex:0 0 7em;padding-left:.5rem}select[_ngcontent-%COMP%]{width:100%;font-size:1rem;height:2rem}@media (max-width:975px){.question[_ngcontent-%COMP%]{flex-direction:column}.question-select[_ngcontent-%COMP%], .unit-select[_ngcontent-%COMP%]{flex:100%;padding:0}}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.syntax-preview[_ngcontent-%COMP%]{margin-top:1em}.syntax-preview[_ngcontent-%COMP%] > pre[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](QueryObservationComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-query-observation',
      templateUrl: './query-observation.component.html',
      styleUrls: ['./query-observation.component.css']
    }]
  }], function () {
    return [{
      type: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__["HttpClient"]
    }];
  }, {
    variable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    index: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    autoCompleteElement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"],
      args: ['autoComplete']
    }]
  });
})();

var EasyPathExpressionsPipe = /*#__PURE__*/function () {
  function EasyPathExpressionsPipe() {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, EasyPathExpressionsPipe);
  }

  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(EasyPathExpressionsPipe, [{
    key: "transform",
    value: function transform(value, variables) {
      if (value !== undefined) {
        var fhirPath = easy_path_expressions__WEBPACK_IMPORTED_MODULE_18__["fhirConvert"](value, variables);

        if (fhirPath !== null) {
          return fhirPath;
        }
      }

      return 'Not valid';
    }
  }]);

  return EasyPathExpressionsPipe;
}();

EasyPathExpressionsPipe.ɵfac = function EasyPathExpressionsPipe_Factory(t) {
  return new (t || EasyPathExpressionsPipe)();
};

EasyPathExpressionsPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefinePipe"]({
  name: "easyPathExpressions",
  type: EasyPathExpressionsPipe,
  pure: true
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](EasyPathExpressionsPipe, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Pipe"],
    args: [{
      name: 'easyPathExpressions'
    }]
  }], null, null);
})();

var SyntaxConverterComponent = /*#__PURE__*/function () {
  function SyntaxConverterComponent() {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, SyntaxConverterComponent);

    this.lhcStyle = {};
    this.simpleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.expressionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.jsToFhirPathPipe = new EasyPathExpressionsPipe();
  }

  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(SyntaxConverterComponent, [{
    key: "ngOnChanges",
    value: function ngOnChanges() {
      this.onExpressionChange(this.simple);
    }
  }, {
    key: "onExpressionChange",
    value: function onExpressionChange(simple) {
      var fhirPath = this.jsToFhirPathPipe.transform(simple, this.variables);
      this.fhirPathExpression = fhirPath;
      this.simpleChange.emit(simple);
      this.expressionChange.emit(fhirPath);
    }
  }]);

  return SyntaxConverterComponent;
}();

SyntaxConverterComponent.ɵfac = function SyntaxConverterComponent_Factory(t) {
  return new (t || SyntaxConverterComponent)();
};

SyntaxConverterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: SyntaxConverterComponent,
  selectors: [["lhc-syntax-converter"]],
  inputs: {
    simple: "simple",
    variables: "variables",
    lhcStyle: "lhcStyle"
  },
  outputs: {
    simpleChange: "simpleChange",
    expressionChange: "expressionChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 2,
  vars: 4,
  consts: [["aria-label", "Easy Path Expression", 1, "simple-expression", 3, "ngModel", "ngModelChange"], [3, "syntax"]],
  template: function SyntaxConverterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) {
        return ctx.simple = $event;
      })("ngModelChange", function SyntaxConverterComponent_Template_input_ngModelChange_0_listener($event) {
        return ctx.onExpressionChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "lhc-syntax-preview", 1);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.input);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.simple);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("syntax", ctx.fhirPathExpression);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], SyntaxPreviewComponent],
  styles: ["[_nghost-%COMP%]{width:100%}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](SyntaxConverterComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-syntax-converter',
      templateUrl: './syntax-converter.component.html',
      styleUrls: ['./syntax-converter.component.css']
    }]
  }], function () {
    return [];
  }, {
    simple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    variables: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    simpleChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }],
    expressionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }]
  });
})();

function VariablesComponent_div_11_option_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var type_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("value", type_r10.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](type_r10.value);
  }
}

function VariablesComponent_div_11_lhc_question_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "lhc-question", 23);
  }

  if (rf & 2) {
    var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("variable", variable_r2)("lhcStyle", ctx_r5.lhcStyle);
  }
}

function VariablesComponent_div_11_lhc_query_observation_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "lhc-query-observation", 24);
  }

  if (rf & 2) {
    var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var variable_r2 = ctx_r12.$implicit;
    var i_r3 = ctx_r12.index;
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("variable", variable_r2)("index", i_r3)("lhcStyle", ctx_r6.lhcStyle);
  }
}

function VariablesComponent_div_11_div_14_Template(rf, ctx) {
  if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "lhc-syntax-converter", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("simpleChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_simpleChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      var i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r13.updateSimpleExpression(i_r3, $event);
    })("expressionChange", function VariablesComponent_div_11_div_14_Template_lhc_syntax_converter_expressionChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      var i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r16.updateExpression(i_r3, $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r3 = ctx_r18.index;
    var variable_r2 = ctx_r18.$implicit;
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("simple", variable_r2.simple)("variables", ctx_r7.getAvailableVariables(i_r3))("lhcStyle", ctx_r7.lhcStyle);
  }
}

function VariablesComponent_div_11_div_15_Template(rf, ctx) {
  if (rf & 1) {
    var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_div_15_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21);
      var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return variable_r2.expression = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r3 = ctx_r22.index;
    var variable_r2 = ctx_r22.$implicit;
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r8.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
  }
}

function VariablesComponent_div_11_div_16_Template(rf, ctx) {
  if (rf & 1) {
    var _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_div_16_Template_input_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25);
      var variable_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return variable_r2.expression = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r3 = ctx_r26.index;
    var variable_r2 = ctx_r26.$implicit;
    var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r9.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "variable-expression-" + i_r3)("ngModel", variable_r2.expression);
  }
}

function VariablesComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    var _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "svg", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_Template_input_ngModelChange_4_listener($event) {
      var variable_r2 = ctx.$implicit;
      return variable_r2.label = $event;
    })("change", function VariablesComponent_div_11_Template_input_change_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r28.onNameChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function VariablesComponent_div_11_Template_select_ngModelChange_6_listener($event) {
      var variable_r2 = ctx.$implicit;
      return variable_r2.type = $event;
    })("change", function VariablesComponent_div_11_Template_select_change_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r31.onTypeChange($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Select...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, VariablesComponent_div_11_option_9_Template, 2, 2, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, VariablesComponent_div_11_lhc_question_12_Template, 1, 2, "lhc-question", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, VariablesComponent_div_11_lhc_query_observation_13_Template, 1, 3, "lhc-query-observation", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, VariablesComponent_div_11_div_14_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, VariablesComponent_div_11_div_15_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, VariablesComponent_div_11_div_16_Template, 2, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function VariablesComponent_div_11_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      var i_r3 = ctx.index;
      var ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r32.onRemove(i_r3);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var variable_r2 = ctx.$implicit;
    var i_r3 = ctx.index;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r0.lhcStyle.variableRow);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "row-" + i_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r0.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "variable-label-" + i_r3)("ngModel", variable_r2.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r0.lhcStyle.select);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "variable-type-" + i_r3)("ngModel", variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](10, 20, ctx_r0.variableType));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitch", variable_r2.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "question");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "queryObservation");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "query");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r0.lhcStyle.buttonDanger);
  }
}

function VariablesComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    var _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "No variables, please ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function VariablesComponent_div_12_Template_a_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r34);
      var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r33.onAdd();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "add one");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, ".");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

var VariablesComponent = /*#__PURE__*/function () {
  function VariablesComponent(ruleEditorService) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, VariablesComponent);

    this.ruleEditorService = ruleEditorService;
    this.lhcStyle = {};
    this.variableType = SimpleVariableType;
  }
  /**
   * Angular lifecycle hook called when the component is initialized
   */


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(VariablesComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this14 = this;

      this.variables = this.ruleEditorService.variables;
      this.variableSubscription = this.ruleEditorService.variablesChange.subscribe(function (variables) {
        _this14.variables = variables;
      });
    }
    /**
     * Angular lifecycle hook called when bound property changes
     */

  }, {
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      var _this15 = this;

      if (changes.advancedInterface) {
        this.variableType = this.advancedInterface ? AllVariableType : SimpleVariableType;

        if (this.variables) {
          var previousValues = [];
          this.variables.forEach(function (variable, index) {
            previousValues[index] = variable.type;
            variable.type = '';
          }); // Not sure of a better way of setting the previous values than this

          setTimeout(function () {
            previousValues.forEach(function (type, index) {
              _this15.variables[index].type = type;
            });
          }, 10);
        }
      }
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */

  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      this.variableSubscription.unsubscribe();
    }
    /**
     * Called when adding a new variable
     */

  }, {
    key: "onAdd",
    value: function onAdd() {
      this.ruleEditorService.addVariable();
    }
    /**
     * Remove a variable at an index
     * @param i - index to remove
     */

  }, {
    key: "onRemove",
    value: function onRemove(i) {
      this.ruleEditorService.remove(i);
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */

  }, {
    key: "drop",
    value: function drop(event) {
      Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["moveItemInArray"])(this.variables, event.previousIndex, event.currentIndex);
    }
    /**
     * Update the preview when the variable name changes
     */

  }, {
    key: "onNameChange",
    value: function onNameChange() {
      this.ruleEditorService.update();
    }
    /**
     * Toggle the advanced interface based on the type
     */

  }, {
    key: "onTypeChange",
    value: function onTypeChange(event) {
      if (event.target.value === 'query' || event.target.value === 'expression') {
        this.ruleEditorService.checkAdvancedInterface(true);
      } else {
        // Need to check all other variables and the final expression before we
        // allow the advanced interface to be removed
        this.ruleEditorService.checkAdvancedInterface();
      }
    }
    /**
     * Get the labels of available variables at the current index
     * @param index - Index of variable we're editing
     */

  }, {
    key: "getAvailableVariables",
    value: function getAvailableVariables(index) {
      var uneditableVariables = this.ruleEditorService.uneditableVariables.map(function (e) {
        return e.name;
      }); // Only return variables up to but not including index

      var editableVariables = this.variables.map(function (e) {
        return e.label;
      }).slice(0, index);
      return uneditableVariables.concat(editableVariables);
    }
    /**
     * Update the expression for variable at the given index.
     * @param i - index
     * @param expression - new expression to use
     */

  }, {
    key: "updateExpression",
    value: function updateExpression(i, expression) {
      this.variables[i].expression = expression;
    }
    /**
     * Update the Easy Path for variable at the given index.
     * @param i - index
     * @param easyPath - new expression to use
     */

  }, {
    key: "updateSimpleExpression",
    value: function updateSimpleExpression(i, easyPath) {
      this.variables[i].simple = easyPath;
    }
  }]);

  return VariablesComponent;
}();

VariablesComponent.ɵfac = function VariablesComponent_Factory(t) {
  return new (t || VariablesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService));
};

VariablesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: VariablesComponent,
  selectors: [["lhc-variables"]],
  inputs: {
    lhcStyle: "lhcStyle",
    advancedInterface: "advancedInterface"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 15,
  vars: 7,
  consts: [[1, "container"], ["aria-hidden", "true", 1, "variable-header"], [1, "variable-column-label"], [1, "variable-column-type"], [1, "variable-column-details"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "variable-row drag-variable", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["class", "no-variables", 4, "ngIf"], ["id", "add-variable", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], ["cdkDrag", "", 1, "variable-row", "drag-variable", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["aria-label", "Variable label", 1, "label", 3, "id", "ngModel", "ngModelChange", "change"], ["aria-label", "Variable type", 3, "id", "ngModel", "ngModelChange", "change"], ["value", "", "disabled", "", "hidden", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "variable-column-details", 3, "ngSwitch"], [3, "variable", "lhcStyle", 4, "ngSwitchCase"], [3, "variable", "index", "lhcStyle", 4, "ngSwitchCase"], ["class", "form-inline", 4, "ngSwitchCase"], [1, "variable-column-actions"], ["aria-label", "Remove variable", "title", "Remove variable", 1, "btn", "btn-danger", "remove-variable", 3, "click"], [3, "value"], [3, "variable", "lhcStyle"], [3, "variable", "index", "lhcStyle"], [1, "form-inline"], [3, "id", "simple", "variables", "lhcStyle", "simpleChange", "expressionChange"], ["aria-label", "FHIRPath Expression", 3, "id", "ngModel", "ngModelChange"], ["aria-label", "FHIR Query", "placeholder", "x-fhir-query", 3, "id", "ngModel", "ngModelChange"], [1, "no-variables"], ["href", "#", 3, "click"]],
  template: function VariablesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Item Variables");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Variable Type");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Question/FHIRPath Expression/FHIR Query");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("cdkDropListDropped", function VariablesComponent_Template_div_cdkDropListDropped_10_listener($event) {
        return ctx.drop($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, VariablesComponent_div_11_Template, 20, 22, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, VariablesComponent_div_12_Template, 5, 0, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function VariablesComponent_Template_button_click_13_listener() {
        return ctx.onAdd();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Add variable");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.h2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.variableHeader);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.variables);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.variables.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", ctx.lhcStyle.buttonSecondary);
    }
  },
  directives: [_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDrag"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDragHandle"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgSwitchCase"], QuestionComponent, QueryObservationComponent, SyntaxConverterComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["KeyValuePipe"]],
  styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.variable-header[_ngcontent-%COMP%], .variable-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.variable-header[_ngcontent-%COMP%] > .variable-column-label[_ngcontent-%COMP%]{padding-left:1.6em}.variable-column-label[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;height:2rem;font-size:1rem}.variable-column-details[_ngcontent-%COMP%], .variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{padding:.5rem}.variable-column-label[_ngcontent-%COMP%]{display:flex;flex:0 0 12em}.label[_ngcontent-%COMP%]{flex-grow:100}.variable-column-type[_ngcontent-%COMP%]{flex:0 0 15em}.variable-column-details[_ngcontent-%COMP%]{flex:1 0 25em;min-width:0}.variable-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.variable-column-actions[_ngcontent-%COMP%]{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.variable-row[_ngcontent-%COMP%]{flex-direction:column}.variable-column-label[_ngcontent-%COMP%], .variable-column-type[_ngcontent-%COMP%]{flex:100%}.variable-column-details[_ngcontent-%COMP%]{flex:20 0 10em}.variable-column-actions[_ngcontent-%COMP%]{flex:auto}}.drag-variable[_ngcontent-%COMP%]{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle[_ngcontent-%COMP%]{cursor:move;margin-top:.4rem}.no-variables[_ngcontent-%COMP%]{padding:2rem}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](VariablesComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-variables',
      templateUrl: './variables.component.html',
      styleUrls: ['./variables.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }];
  }, {
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    advancedInterface: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }]
  });
})();

function CaseStatementsComponent_div_10_input_4_Template(rf, ctx) {
  if (rf & 1) {
    var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return caseStatement_r4.condition = $event;
    })("ngModelChange", function CaseStatementsComponent_div_10_input_4_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r13);
      var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r14.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r5 = ctx_r15.index;
    var caseStatement_r4 = ctx_r15.$implicit;
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r6.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "case-condition-" + i_r5)("ngModel", caseStatement_r4.condition);
  }
}

function CaseStatementsComponent_div_10_input_5_Template(rf, ctx) {
  if (rf & 1) {
    var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return caseStatement_r4.simpleCondition = $event;
    })("ngModelChange", function CaseStatementsComponent_div_10_input_5_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r19.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r5 = ctx_r20.index;
    var caseStatement_r4 = ctx_r20.$implicit;
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r7.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "case-condition-" + i_r5)("ngModel", caseStatement_r4.simpleCondition);
  }
}

function CaseStatementsComponent_div_10_input_9_Template(rf, ctx) {
  if (rf & 1) {
    var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return caseStatement_r4.output = $event;
    })("ngModelChange", function CaseStatementsComponent_div_10_input_9_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r24.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r5 = ctx_r25.index;
    var caseStatement_r4 = ctx_r25.$implicit;
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r8.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "case-output-" + i_r5)("ngModel", caseStatement_r4.output);
  }
}

function CaseStatementsComponent_div_10_input_10_Template(rf, ctx) {
  if (rf & 1) {
    var _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r28);
      var caseStatement_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return caseStatement_r4.simpleOutput = $event;
    })("ngModelChange", function CaseStatementsComponent_div_10_input_10_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r28);
      var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r29.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    var i_r5 = ctx_r30.index;
    var caseStatement_r4 = ctx_r30.$implicit;
    var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r9.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "case-output-" + i_r5)("ngModel", caseStatement_r4.simpleOutput);
  }
}

function CaseStatementsComponent_div_10_div_11_Template(rf, ctx) {
  if (rf & 1) {
    var _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CaseStatementsComponent_div_10_div_11_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r33);
      var i_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r31.onRemove(i_r5);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r10.lhcStyle.buttonDanger);
  }
}

function CaseStatementsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "svg", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "path", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, CaseStatementsComponent_div_10_input_4_Template, 1, 4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, CaseStatementsComponent_div_10_input_5_Template, 1, 4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "\u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, CaseStatementsComponent_div_10_input_9_Template, 1, 4, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, CaseStatementsComponent_div_10_input_10_Template, 1, 4, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, CaseStatementsComponent_div_10_div_11_Template, 3, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var i_r5 = ctx.index;
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r0.lhcStyle.variableRow);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("id", "row-" + i_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.syntax !== "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.syntax === "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.syntax !== "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.syntax === "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.cases.length > 1);
  }
}

function CaseStatementsComponent_input_18_Template(rf, ctx) {
  if (rf & 1) {
    var _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r35);
      var ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r34.defaultCase = $event;
    })("ngModelChange", function CaseStatementsComponent_input_18_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r35);
      var ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r36.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r1.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r1.defaultCase);
  }
}

function CaseStatementsComponent_input_19_Template(rf, ctx) {
  if (rf & 1) {
    var _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r38);
      var ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r37.simpleDefaultCase = $event;
    })("ngModelChange", function CaseStatementsComponent_input_19_Template_input_ngModelChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r38);
      var ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r39.onChange();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r2.lhcStyle.input);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.simpleDefaultCase);
  }
}

function CaseStatementsComponent_lhc_syntax_preview_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "lhc-syntax-preview", 24);
  }

  if (rf & 2) {
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("lhcStyle", ctx_r3.lhcStyle)("syntax", ctx_r3.output);
  }
}

var CaseStatementsComponent = /*#__PURE__*/function () {
  function CaseStatementsComponent(ruleEditorService, liveAnnouncer) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, CaseStatementsComponent);

    this.ruleEditorService = ruleEditorService;
    this.liveAnnouncer = liveAnnouncer;
    this.lhcStyle = {};
    this.expressionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.simpleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.STRING_REGEX = /^'(.*)'$/;
    this.pipe = new EasyPathExpressionsPipe();
    this.outputExpressions = true;
    this.cases = [{
      condition: '',
      simpleCondition: '',
      output: '',
      simpleOutput: ''
    }];
    this.output = '';
    this.hidePreview = false;
  }
  /**
   * Angular lifecycle hook for initialization
   */


  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(CaseStatementsComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      if (this.syntax === 'fhirpath' && this.expression !== undefined) {
        this.parseIif(this.expression, 0);
      } else if (this.syntax === 'simple' && this.simpleExpression !== undefined) {
        this.parseSimpleCases();
      }

      this.output = this.getIif(0);
    }
    /**
     * Parses the Easy Path expression and populates the case editor. Toggles "use
     * expressions" off if output is only strings.
     */

  }, {
    key: "parseSimpleCases",
    value: function parseSimpleCases() {
      var _this16 = this;

      this.parseIif(this.simpleExpression, 0); // If all output values are strings toggle off "use expressions"

      var outputString = this.cases.find(function (e) {
        return !_this16.isString(e.simpleOutput);
      });
      var defaultIsString = this.isString(this.simpleDefaultCase);

      if (outputString === undefined && defaultIsString) {
        this.outputExpressions = false; // Remove quotes from output strings and default case

        this.cases.forEach(function (e) {
          e.simpleOutput = _this16.removeQuotes(e.simpleOutput);
        });
        this.simpleDefaultCase = this.removeQuotes(this.simpleDefaultCase);
      }
    }
    /**
     * Checks if the expression is a string
     */

  }, {
    key: "isString",
    value: function isString(expression) {
      return this.STRING_REGEX.test(expression);
    }
    /**
     * Removes surrounding quotes
     */

  }, {
    key: "removeQuotes",
    value: function removeQuotes(expression) {
      return expression.match(this.STRING_REGEX)[1];
    }
    /**
     * Angular lifecycle hook for changes
     */

  }, {
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (changes.syntax && this.syntax === 'simple' && changes.syntax.firstChange === false) {
        this.parseSimpleCases();
        this.onChange();
      } else if (changes.syntax && this.syntax === 'fhirpath' && changes.syntax.firstChange === false) {
        this.outputExpressions = true;
        this.parseIif(this.expression, 0);
        this.onChange();
      }
    }
    /**
     * Called when adding a new case
     */

  }, {
    key: "onAdd",
    value: function onAdd() {
      this.cases.push({
        condition: '',
        simpleCondition: '',
        output: '',
        simpleOutput: ''
      });
      this.onChange(); // TODO select next input box that was added
    }
    /**
     * Remove the case at an index
     * @param i - index to remove
     */

  }, {
    key: "onRemove",
    value: function onRemove(i) {
      this.cases.splice(i, 1);
      this.onChange();
    }
    /**
     * Angular lifecycle hook for changes
     */

  }, {
    key: "onChange",
    value: function onChange() {
      this.output = this.getIif(0);
      this.expressionChange.emit(this.output);
      this.simpleChange.emit(this.simpleExpression);
    }
    /**
     * Parse iif expression at specified level. Top level is 0
     * @param expression - expression to parse
     * @param level - depth or level of expression nesting
     */

  }, {
    key: "parseIif",
    value: function parseIif(expression, level) {
      // If expressions don't start with iif( and end with ) they cannot be parsed
      var matches = expression.match(CASE_REGEX);

      if (matches !== null) {
        var iifContents = matches[1];
        var commaMatches = 0;
        var nestingLevel = 0;
        var comma1 = -1;
        var comma2 = -1; // Check where the ',' is relative to depth as indicated by parenthesis

        for (var i = 0; i < iifContents.length; i++) {
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
                } else if (comma2 === -1) {
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

          var condition = iifContents.substring(0, comma1).trim();
          var trueCase = iifContents.substring(comma1 + 1, comma2).trim();
          var falseCase = iifContents.substring(comma2 + 1, iifContents.length).trim();

          if (this.syntax === 'simple') {
            var variableNames = this.ruleEditorService.variables.map(function (e) {
              return e.label;
            });
            this.cases.push({
              simpleCondition: condition,
              simpleOutput: trueCase,
              condition: this.pipe.transform(condition, variableNames),
              output: this.pipe.transform(trueCase, variableNames)
            });
          } else {
            this.cases.push({
              condition: condition,
              output: trueCase
            });
          }

          var parseResult = this.parseIif(falseCase, level + 1);

          if (parseResult === false && this.syntax !== 'simple') {
            this.defaultCase = falseCase;
          } else if (parseResult === false && this.syntax === 'simple') {
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

  }, {
    key: "getIif",
    value: function getIif(level) {
      var isSimple = this.syntax === 'simple';
      var output = this.transformIfSimple(isSimple ? this.cases[level].simpleOutput : this.cases[level].output, true);
      var condition = this.transformIfSimple(isSimple ? this.cases[level].simpleCondition : this.cases[level].condition, false);
      var defaultCase = this.transformIfSimple(isSimple ? this.simpleDefaultCase : this.defaultCase, true);

      if (level === 0) {
        var previousValue = this.hidePreview;
        this.hidePreview = condition === '' || output === '' || defaultCase === '';

        if (!this.hidePreview && previousValue !== this.hidePreview) {
          this.liveAnnouncer.announce('A FHIRPath conversion preview has appeared below.');
        }
      }

      if (level === this.cases.length - 1) {
        return "iif(".concat(condition, ",").concat(output, ",").concat(defaultCase, ")");
      } else {
        return "iif(".concat(condition, ",").concat(output, ",").concat(this.getIif(level + 1), ")");
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

  }, {
    key: "transformIfSimple",
    value: function transformIfSimple(expression, isOutput) {
      if (expression === undefined) {
        return '';
      }

      var processedExpression = expression;

      if (isOutput && !this.outputExpressions) {
        processedExpression = "'".concat(processedExpression, "'"); // TODO should we escape the expression?
      } // Convert when syntax is simple but not in the output column is outputExpressions is disabled


      if (this.syntax === 'simple' && !(isOutput && !this.outputExpressions)) {
        return this.pipe.transform(processedExpression, this.ruleEditorService.variables.map(function (e) {
          return e.label;
        }));
      } else {
        return processedExpression;
      }
    }
    /**
     * Drag and drop rearrange of variable order
     * @param event - drag and drop event
     */

  }, {
    key: "drop",
    value: function drop(event) {
      Object(_angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["moveItemInArray"])(this.cases, event.previousIndex, event.currentIndex);
      this.onChange();
    }
  }]);

  return CaseStatementsComponent;
}();

CaseStatementsComponent.ɵfac = function CaseStatementsComponent_Factory(t) {
  return new (t || CaseStatementsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["LiveAnnouncer"]));
};

CaseStatementsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: CaseStatementsComponent,
  selectors: [["lhc-case-statements"]],
  inputs: {
    lhcStyle: "lhcStyle",
    syntax: "syntax",
    simpleExpression: "simpleExpression",
    expression: "expression"
  },
  outputs: {
    expressionChange: "expressionChange",
    simpleChange: "simpleChange"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 21,
  vars: 8,
  consts: [[1, "container"], ["aria-hidden", "true", 1, "case-header"], [1, "case-condition-column"], [1, "case-output-column"], ["type", "checkbox", "id", "output-expressions", 3, "ngModel", "ngModelChange", "change"], ["for", "output-expressions"], ["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "case-row drag-case", "cdkDrag", "", 3, "style", "id", 4, "ngFor", "ngForOf"], ["id", "add-case", 1, "btn", "btn-secondary", "mt-2", 3, "ngStyle", "click"], [1, "case-row"], ["type", "text", "class", "default", 3, "ngModel", "style", "ngModelChange", 4, "ngIf"], [3, "lhcStyle", "syntax", 4, "ngIf"], ["cdkDrag", "", 1, "case-row", "drag-case", 3, "id"], ["cdkDragHandle", "", "xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "handle"], ["d", "M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["type", "text", "class", "condition", "aria-label", "Case condition", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], [1, "arrow"], ["type", "text", "class", "output", "aria-label", "Case output", 3, "id", "ngModel", "style", "ngModelChange", 4, "ngIf"], ["class", "case-column-actions", 4, "ngIf"], ["type", "text", "aria-label", "Case condition", 1, "condition", 3, "id", "ngModel", "ngModelChange"], ["type", "text", "aria-label", "Case output", 1, "output", 3, "id", "ngModel", "ngModelChange"], [1, "case-column-actions"], ["aria-label", "Remove case", "title", "Remove case", 1, "btn", "btn-danger", "remove-case", 3, "click"], ["type", "text", 1, "default", 3, "ngModel", "ngModelChange"], [3, "lhcStyle", "syntax"]],
  template: function CaseStatementsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "When expression is true");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " Output ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "input", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CaseStatementsComponent_Template_input_ngModelChange_6_listener($event) {
        return ctx.outputExpressions = $event;
      })("change", function CaseStatementsComponent_Template_input_change_6_listener() {
        return ctx.onChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "label", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Use expressions (strings if unchecked)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("cdkDropListDropped", function CaseStatementsComponent_Template_div_cdkDropListDropped_9_listener($event) {
        return ctx.drop($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, CaseStatementsComponent_div_10_Template, 12, 8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CaseStatementsComponent_Template_button_click_11_listener() {
        return ctx.onAdd();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "Add case");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "label");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, " Default output value: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, CaseStatementsComponent_input_18_Template, 1, 3, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, CaseStatementsComponent_input_19_Template, 1, 3, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, CaseStatementsComponent_lhc_syntax_preview_20_Template, 1, 2, "lhc-syntax-preview", 11);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx.lhcStyle.variableHeader);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.outputExpressions);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.cases);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", ctx.lhcStyle.buttonSecondary);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.syntax !== "simple");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.syntax === "simple");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.hidePreview);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDropList"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDrag"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["CdkDragHandle"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], SyntaxPreviewComponent],
  styles: ["*[_ngcontent-%COMP%]{box-sizing:border-box}.case-header[_ngcontent-%COMP%], .case-row[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap}.case-header[_ngcontent-%COMP%] > .case-column-label[_ngcontent-%COMP%]{padding-left:1.6em}.case-condition-column[_ngcontent-%COMP%] > input[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{width:100%;height:2rem;font-size:1rem}.case-condition-column[_ngcontent-%COMP%], .case-output-column[_ngcontent-%COMP%]{padding:.5rem}.case-condition-column[_ngcontent-%COMP%]{display:flex;flex:0 0 50%}.condition[_ngcontent-%COMP%], .output[_ngcontent-%COMP%]{flex-grow:100}.case-actions-column[_ngcontent-%COMP%]{flex:auto}.case-output-column[_ngcontent-%COMP%]{flex:1 0 40%;min-width:0}.case-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:2rem;width:2rem;background-color:#8b0000;color:#fff;padding:0}.case-column-actions[_ngcontent-%COMP%]{flex:0 0 auto;padding-top:.5rem;padding-left:.5rem}@media (max-width:975px){.case-row[_ngcontent-%COMP%]{flex-direction:column}.case-condition-column[_ngcontent-%COMP%]{flex:100%}.case-output-column[_ngcontent-%COMP%]{flex:20 0 10em}.case-actions-column[_ngcontent-%COMP%]{flex:auto}}.drag-case[_ngcontent-%COMP%]{padding:.75rem 0;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;justify-content:space-between;box-sizing:border-box;background:#fff}.handle[_ngcontent-%COMP%]{cursor:move;margin-top:.4rem}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}#output-expressions[_ngcontent-%COMP%]{margin-left:2em}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:1rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.arrow[_ngcontent-%COMP%]{font-size:1.6em;padding-left:.5em}.default[_ngcontent-%COMP%]{margin-top:.5rem}.syntax[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.text-muted[_ngcontent-%COMP%]{margin:0;color:#555;font-size:.8rem}.copy[_ngcontent-%COMP%]{margin-top:1em;flex:0 0 3em;border:none;background:transparent}  .mat-tooltip{overflow-wrap:break-word}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](CaseStatementsComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      selector: 'lhc-case-statements',
      templateUrl: './case-statements.component.html',
      styleUrls: ['./case-statements.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["LiveAnnouncer"]
    }];
  }, {
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    syntax: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    simpleExpression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    expression: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    expressionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }],
    simpleChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }]
  });
})();

function RuleEditorComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.errorLoading);
  }
}

function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template(rf, ctx) {
  if (rf & 1) {
    var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "lhc-calculate-sum-prompt", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("export", function RuleEditorComponent_lhc_calculate_sum_prompt_1_Template_lhc_calculate_sum_prompt_export_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r3.addSumOfScores();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("lhcStyle", ctx_r1.lhcStyle);
  }
}

function RuleEditorComponent_div_2_section_11_div_8_Template(rf, ctx) {
  if (rf & 1) {
    var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_div_8_Template_select_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r9.expressionSyntax = $event;
    })("change", function RuleEditorComponent_div_2_section_11_div_8_Template_select_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r11.onTypeChange($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Easy Path Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "FHIRPath Expression");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r6.expressionSyntax)("ngStyle", ctx_r6.lhcStyle.select);
  }
}

function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template(rf, ctx) {
  if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "lhc-syntax-converter", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("expressionChange", function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template_lhc_syntax_converter_expressionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return ctx_r14.updateFinalExpression($event);
    })("simpleChange", function RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template_lhc_syntax_converter_simpleChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15);
      var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return ctx_r16.updateSimpleExpression($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("simple", ctx_r12.simpleExpression)("variables", ctx_r12.variables)("lhcStyle", ctx_r12.lhcStyle);
  }
}

function RuleEditorComponent_div_2_section_11_div_9_input_2_Template(rf, ctx) {
  if (rf & 1) {
    var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_div_9_input_2_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return ctx_r17.finalExpression = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r13.finalExpression)("ngStyle", ctx_r13.lhcStyle.input);
  }
}

function RuleEditorComponent_div_2_section_11_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RuleEditorComponent_div_2_section_11_div_9_lhc_syntax_converter_1_Template, 1, 3, "lhc-syntax-converter", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RuleEditorComponent_div_2_section_11_div_9_input_2_Template, 1, 2, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitch", ctx_r7.expressionSyntax);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "simple");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "fhirpath");
  }
}

function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template(rf, ctx) {
  if (rf & 1) {
    var _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "lhc-case-statements", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("expressionChange", function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template_lhc_case_statements_expressionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r19.updateFinalExpression($event);
    })("simpleChange", function RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template_lhc_case_statements_simpleChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20);
      var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return ctx_r21.updateSimpleExpression($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("syntax", ctx_r8.expressionSyntax)("simpleExpression", ctx_r8.simpleExpression)("expression", ctx_r8.finalExpression)("lhcStyle", ctx_r8.lhcStyle);
  }
}

function RuleEditorComponent_div_2_section_11_Template(rf, ctx) {
  if (rf & 1) {
    var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_section_11_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r23);
      var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return ctx_r22.caseStatements = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Use case statements");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, RuleEditorComponent_div_2_section_11_div_8_Template, 6, 2, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, RuleEditorComponent_div_2_section_11_div_9_Template, 3, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, RuleEditorComponent_div_2_section_11_lhc_case_statements_10_Template, 1, 4, "lhc-case-statements", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r5.lhcStyle.h2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r5.expressionLabel);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r5.caseStatements);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r5.caseStatements);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.caseStatements);
  }
}

function RuleEditorComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    var _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleEditorComponent_div_2_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25);
      var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r24.advancedInterface = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Advanced interface");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "section", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "lhc-uneditable-variables");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "section", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "lhc-variables", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, RuleEditorComponent_div_2_section_11_Template, 11, 7, "section", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleEditorComponent_div_2_Template_button_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r25);
      var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r26.export();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMap"](ctx_r2.lhcStyle.h1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.titleName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r2.disableInterfaceToggle)("ngModel", ctx_r2.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("lhcStyle", ctx_r2.lhcStyle)("advancedInterface", ctx_r2.advancedInterface);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.expressionUri);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", ctx_r2.lhcStyle.buttonPrimary);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.submitButtonName);
  }
}

var RuleEditorComponent = /*#__PURE__*/function () {
  function RuleEditorComponent(variableService, liveAnnouncer) {
    Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, RuleEditorComponent);

    this.variableService = variableService;
    this.liveAnnouncer = liveAnnouncer;
    this.advancedInterface = false;
    this.doNotAskToCalculateScore = false;
    this.fhirQuestionnaire = null;
    this.itemLinkId = null;
    this.submitButtonName = 'Submit';
    this.titleName = 'Rule Editor';
    this.expressionLabel = 'Final Expression';
    this.expressionUri = '';
    this.lhcStyle = {};
    this.save = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
    this.errorLoading = 'Could not detect a FHIR Questionnaire; please try a different file.';
    this.disableInterfaceToggle = false;
    this.loadError = false;
  }

  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(RuleEditorComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      var _this17 = this;

      this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe(function (mightBeScore) {
        _this17.calculateSum = mightBeScore;
      });
      this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe(function (finalExpression) {
        _this17.finalExpression = finalExpression;
      });
      this.variablesSubscription = this.variableService.variablesChange.subscribe(function (variables) {
        _this17.variables = variables.map(function (e) {
          return e.label;
        });
      });
      this.disableAdvancedSubscription = this.variableService.disableAdvancedChange.subscribe(function (disable) {
        _this17.disableInterfaceToggle = disable;
      });
    }
    /**
     * Angular lifecycle hook called before the component is destroyed
     */

  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      this.calculateSumSubscription.unsubscribe();
      this.finalExpressionSubscription.unsubscribe();
      this.variablesSubscription.unsubscribe();
      this.disableAdvancedSubscription.unsubscribe();
    }
    /**
     * Angular lifecycle hook called on input changes
     */

  }, {
    key: "ngOnChanges",
    value: function ngOnChanges() {
      this.reload();
    }
    /**
     * Re-import fhir and context and show the form
     */

  }, {
    key: "reload",
    value: function reload() {
      if (this.fhirQuestionnaire instanceof Object) {
        this.variableService.doNotAskToCalculateScore = this.doNotAskToCalculateScore;
        this.loadError = !this.variableService.import(this.expressionUri, this.fhirQuestionnaire, this.itemLinkId);

        if (this.loadError) {
          this.liveAnnouncer.announce(this.errorLoading);
        }

        this.disableInterfaceToggle = this.variableService.needsAdvancedInterface;
        this.advancedInterface = this.variableService.needsAdvancedInterface;
      }

      this.caseStatements = this.variableService.caseStatements;
      this.simpleExpression = this.variableService.simpleExpression;
      this.linkIdContext = this.variableService.linkIdContext;
      this.expressionSyntax = this.variableService.syntaxType;
      this.calculateSum = this.variableService.mightBeScore;
      this.finalExpressionExtension = this.variableService.finalExpressionExtension;
      this.finalExpression = this.variableService.finalExpression;
      this.variables = this.variableService.uneditableVariables.map(function (e) {
        return e.name;
      }).concat(this.variableService.variables.map(function (e) {
        return e.label;
      }));
    }
    /**
     * Export FHIR Questionnaire and download as a file
     */

  }, {
    key: "export",
    value: function _export() {
      var finalExpression = this.finalExpressionExtension;
      finalExpression.valueExpression.expression = this.finalExpression;
      this.save.emit(this.variableService.export(this.expressionUri, finalExpression));
    }
    /**
     * Create a new instance of a FHIR questionnaire file by summing all ordinal
     * values
     */

  }, {
    key: "addSumOfScores",
    value: function addSumOfScores() {
      this.save.emit(this.variableService.addSumOfScores());
    }
    /**
     * Update the final expression
     */

  }, {
    key: "updateFinalExpression",
    value: function updateFinalExpression(expression) {
      this.finalExpression = expression;
    }
    /**
     * Update the simple final expression
     */

  }, {
    key: "updateSimpleExpression",
    value: function updateSimpleExpression(simple) {
      this.simpleExpression = simple;
    }
    /**
     * Toggle the advanced interface based on the type
     */

  }, {
    key: "onTypeChange",
    value: function onTypeChange(event) {
      if (event.target.value === 'fhirpath') {
        this.variableService.checkAdvancedInterface(true);
      } else {
        // Need to check all other variables and the final expression before we
        // allow the advanced interface to be removed
        this.variableService.checkAdvancedInterface();
      }

      if (this.variableService.needsAdvancedInterface) {
        this.advancedInterface = true;
        this.disableInterfaceToggle = true;
      } else {
        this.disableInterfaceToggle = false;
      }
    }
  }]);

  return RuleEditorComponent;
}();

RuleEditorComponent.ɵfac = function RuleEditorComponent_Factory(t) {
  return new (t || RuleEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](RuleEditorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["LiveAnnouncer"]));
};

RuleEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: RuleEditorComponent,
  selectors: [["lhc-rule-editor"]],
  inputs: {
    advancedInterface: "advancedInterface",
    doNotAskToCalculateScore: "doNotAskToCalculateScore",
    fhirQuestionnaire: "fhirQuestionnaire",
    itemLinkId: "itemLinkId",
    submitButtonName: "submitButtonName",
    titleName: "titleName",
    expressionLabel: "expressionLabel",
    expressionUri: "expressionUri",
    lhcStyle: "lhcStyle"
  },
  outputs: {
    save: "save"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 3,
  vars: 3,
  consts: [["class", "error", 4, "ngIf"], [3, "lhcStyle", "export", 4, "ngIf"], [4, "ngIf"], [1, "error"], [3, "lhcStyle", "export"], ["matTooltip", "When in the advanced interface you can edit FHIRPath and x-fhir-query directly. This mode is automatically enabled for complex Questionnaires.", 1, "checkbox"], ["type", "checkbox", "id", "advanced-interface", 3, "disabled", "ngModel", "ngModelChange"], ["for", "advanced-interface"], ["id", "uneditable-variables-section", 1, "mb-3"], ["id", "variables-section", 1, "mb-3"], [3, "lhcStyle", "advancedInterface"], ["id", "final-expression-section", "class", "mb-3", 4, "ngIf"], ["id", "export", 1, "primary", 3, "ngStyle", "click"], ["id", "final-expression-section", 1, "mb-3"], [1, "checkbox"], ["type", "checkbox", "id", "case-statements", 3, "ngModel", "ngModelChange"], ["for", "case-statements"], [1, "flex-container"], ["class", "expression-type", 4, "ngIf"], ["class", "expression", 3, "ngSwitch", 4, "ngIf"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange", 4, "ngIf"], [1, "expression-type"], ["aria-label", "Expression syntax type", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange", "change"], ["value", "simple"], ["value", "fhirpath"], [1, "expression", 3, "ngSwitch"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange", 4, "ngSwitchCase"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", "class", "form-control", 3, "ngModel", "ngStyle", "ngModelChange", 4, "ngSwitchCase"], [3, "simple", "variables", "lhcStyle", "expressionChange", "simpleChange"], ["type", "text", "aria-label", "FHIRPath", "id", "final-expression", 1, "form-control", 3, "ngModel", "ngStyle", "ngModelChange"], [3, "syntax", "simpleExpression", "expression", "lhcStyle", "expressionChange", "simpleChange"]],
  template: function RuleEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, RuleEditorComponent_div_0_Template, 2, 1, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RuleEditorComponent_lhc_calculate_sum_prompt_1_Template, 1, 1, "lhc-calculate-sum-prompt", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RuleEditorComponent_div_2_Template, 14, 10, "div", 2);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.loadError);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.calculateSum && !ctx.loadError);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.calculateSum && !ctx.loadError);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], CalculateSumPromptComponent, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgModel"], UneditableVariablesComponent, VariablesComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgStyle"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgSwitchCase"], SyntaxConverterComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["DefaultValueAccessor"], CaseStatementsComponent],
  styles: [".toolbar-button[_ngcontent-%COMP%]{height:2.7rem}.file-import[_ngcontent-%COMP%]{width:4.6rem;color:transparent}.file-import[_ngcontent-%COMP%]::-webkit-file-upload-button{visibility:hidden}.file-import[_ngcontent-%COMP%]:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button[_ngcontent-%COMP%]{margin-left:1em}h1[_ngcontent-%COMP%]{margin-top:0}.flex-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.expression[_ngcontent-%COMP%], .expression-type[_ngcontent-%COMP%]{display:flex;padding:.5rem}.expression-type[_ngcontent-%COMP%]{flex:0 0 15em}.expression[_ngcontent-%COMP%]{flex:1 0 30em;min-width:0}input[type=text][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{height:2rem;font-size:1rem;width:100%;margin-bottom:.5rem;box-sizing:border-box;border:1px solid #999;background-color:#fff;border-radius:4px;padding:0 .5em}button[_ngcontent-%COMP%]{height:2.5rem;border:none;border-radius:4px;padding:0 2em;font-size:1rem}.primary[_ngcontent-%COMP%]{background-color:#00f;color:#fff}lhc-case-statements[_ngcontent-%COMP%]{flex:100%;width:100%;padding:.5rem}.checkbox[_ngcontent-%COMP%]{padding:.5rem}#export[_ngcontent-%COMP%]{margin-top:1em}@media (max-width:975px){.flex-container[_ngcontent-%COMP%]{flex-direction:column}.expression[_ngcontent-%COMP%], .expression-type[_ngcontent-%COMP%]{flex:100%}}"]
});
/*@__PURE__*/

(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](RuleEditorComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"],
    args: [{
      // tslint:disable-next-line:component-selector
      selector: 'lhc-rule-editor',
      templateUrl: 'rule-editor.component.html',
      styleUrls: ['rule-editor.component.css']
    }]
  }], function () {
    return [{
      type: RuleEditorService
    }, {
      type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_9__["LiveAnnouncer"]
    }];
  }, {
    advancedInterface: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    doNotAskToCalculateScore: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    fhirQuestionnaire: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    itemLinkId: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    submitButtonName: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    titleName: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    expressionLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    expressionUri: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    lhcStyle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"]
    }],
    save: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"]
    }]
  });
})();

var RuleEditorModule = function RuleEditorModule() {
  Object(_home_mazilumt_dev_pr_rule_editor_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, RuleEditorModule);
};

RuleEditorModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: RuleEditorModule
});
RuleEditorModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  factory: function RuleEditorModule_Factory(t) {
    return new (t || RuleEditorModule)();
  },
  imports: [[_angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_20__["BrowserAnimationsModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["DragDropModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__["MatRadioModule"], _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_15__["ClipboardModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBarModule"]]]
});

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](RuleEditorModule, {
    declarations: [RuleEditorComponent, VariablesComponent, UneditableVariablesComponent, QuestionComponent, CalculateSumPromptComponent, EasyPathExpressionsPipe, SyntaxConverterComponent, SyntaxPreviewComponent, QueryObservationComponent, CaseStatementsComponent],
    imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_20__["BrowserAnimationsModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["DragDropModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__["MatRadioModule"], _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_15__["ClipboardModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBarModule"]],
    exports: [RuleEditorComponent]
  });
})();
/*@__PURE__*/


(function () {
  _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵsetClassMetadata"](RuleEditorModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"],
    args: [{
      declarations: [RuleEditorComponent, VariablesComponent, UneditableVariablesComponent, QuestionComponent, CalculateSumPromptComponent, EasyPathExpressionsPipe, SyntaxConverterComponent, SyntaxPreviewComponent, QueryObservationComponent, CaseStatementsComponent],
      imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_20__["BrowserAnimationsModule"], _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_13__["DragDropModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_19__["MatRadioModule"], _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_15__["ClipboardModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_14__["MatSnackBarModule"]],
      exports: [RuleEditorComponent]
    }]
  }], null, null);
})();
/*
 * Public API Surface of ng-rule-editor
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map