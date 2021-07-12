(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/drag-drop'), require('@angular/platform-browser/animations'), require('@angular/material/radio'), require('math-to-fhirpath')) :
    typeof define === 'function' && define.amd ? define('ng-rule-editor', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/forms', '@angular/cdk/drag-drop', '@angular/platform-browser/animations', '@angular/material/radio', 'math-to-fhirpath'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng-rule-editor'] = {}, global.ng.core, global.rxjs, global.ng.common, global.ng.forms, global.ng.cdk.dragDrop, global.ng.platformBrowser.animations, global.ng.material.radio, global.mathToFhirpath));
}(this, (function (exports, i0, rxjs, common, forms, dragDrop, animations, radio, mathToFhirpath) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var mathToFhirpath__namespace = /*#__PURE__*/_interopNamespace(mathToFhirpath);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // Supported unit conversions. Key is the "from" and value is the "to" array
    var UNIT_CONVERSION = {
        kg: [{ unit: 'lbs', factor: 2.20462 }],
        lbs: [{ unit: 'kg', factor: 0.453592 }],
        '[in_i]': [{ unit: 'cm', factor: 2.54 }, { unit: 'm', factor: 0.0254 }]
    };

    var RuleEditorService = /** @class */ (function () {
        function RuleEditorService() {
            this.syntaxType = 'simple';
            this.uneditableVariablesChange = new rxjs.Subject();
            this.variablesChange = new rxjs.Subject();
            this.questionsChange = new rxjs.Subject();
            this.mightBeScoreChange = new rxjs.Subject();
            this.finalExpressionChange = new rxjs.Subject();
            this.LANGUAGE_FHIRPATH = 'text/fhirpath';
            this.QUESTION_REGEX = /^%resource\.item\.where\(linkId='(.*)'\)\.answer\.value(?:\*(\d*\.?\d*))?$/;
            this.VARIABLE_EXTENSION = 'http://hl7.org/fhir/StructureDefinition/variable';
            this.CALCULATED_EXPRESSION = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
            this.linkIdToQuestion = {};
            this.mightBeScore = false;
            this.variables = [];
            this.uneditableVariables = [];
        }
        /**
         * Create a new variable
         */
        RuleEditorService.prototype.addVariable = function () {
            // Get all the existing variable names
            var existingNames = this.variables.map(function (e) { return e.label; })
                .concat(this.uneditableVariables.map(function (e) { return e.name; }));
            this.variables.push({
                label: this.getNewLabelName(existingNames),
                type: 'question',
                expression: ''
            });
            this.variablesChange.next(this.variables);
        };
        /**
         * Remove a variable
         * @param i - index of variable to remove
         */
        RuleEditorService.prototype.remove = function (i) {
            this.variables.splice(i, 1);
        };
        /**
         * Get the list of uneditable variables based on the FHIR Questionnaire
         * @param fhir - FHIR Questionnaire
         */
        RuleEditorService.prototype.getUneditableVariables = function (fhir) {
            var launchContextExtensionUrl = 'http://hl7.org/fhir/StructureDefinition/questionnaire-launchContext';
            if (Array.isArray(fhir.extension)) {
                return fhir.extension.reduce(function (accumulator, extension) {
                    var _a, _b;
                    if (extension.url === launchContextExtensionUrl && extension.extension) {
                        var uneditableVariable = {
                            name: extension.extension.find(function (e) { return e.url === 'name'; }).valueId,
                            type: (_a = extension.extension.filter(function (e) { return e.url === 'type'; })) === null || _a === void 0 ? void 0 : _a.map(function (e) { return e.valueCode; }).join('|'),
                            description: (_b = extension.extension.find(function (e) { return e.url === 'description'; })) === null || _b === void 0 ? void 0 : _b.valueString
                        };
                        accumulator.push(uneditableVariable);
                    }
                    return accumulator;
                }, []);
            }
            return [];
        };
        /**
         * Get and remove the variables from the FHIR object
         * @param fhir
         */
        RuleEditorService.prototype.extractVariables = function (fhir) {
            var _this = this;
            // Look at the top level fhirpath related extensions to populate the editable variables
            // TODO look at the focus item variables
            if (fhir.extension) {
                var variables_1 = [];
                var nonVariableExtensions_1 = [];
                fhir.extension.forEach(function (extension) {
                    if (extension.url === _this.VARIABLE_EXTENSION &&
                        extension.valueExpression && extension.valueExpression.language === _this.LANGUAGE_FHIRPATH) {
                        variables_1.push(_this.processVariable(extension.valueExpression.name, extension.valueExpression.expression));
                    }
                    else {
                        nonVariableExtensions_1.push(extension);
                    }
                });
                // Remove the variables so they can be re-added on export
                fhir.extension = nonVariableExtensions_1;
                return variables_1;
            }
            return [];
        };
        /**
         * Check if the current item has an ordinalValue extension on the answer
         * @param item - Question item or linkId
         */
        RuleEditorService.prototype.itemHasScore = function (item) {
            if (typeof item === 'string') {
                item = this.linkIdToQuestion[item];
            }
            return (item.answerOption || []).some(function (answerOption) {
                return (answerOption.extension || []).some(function (extension) {
                    return extension.url === 'http://hl7.org/fhir/StructureDefinition/ordinalValue';
                });
            });
        };
        // TODO check if this is already a score calculation
        /**
         * Look at the ordinalValue on the answers of all the questions and if over the threshold
         * percentage of the items have it return true
         * @param fhir - FHIR Questionnaire
         * @param linkIdContext - linkId to exclude from calculation
         */
        RuleEditorService.prototype.isProbablyScore = function (fhir, linkIdContext) {
            var _this = this;
            var THRESHOLD = 0.6; // Percent of questions (minus the one we're editing)
            // which need to be scores to determine we want to sum them up
            var totalQuestions = fhir.item.length;
            var scoreQuestions = 0;
            fhir.item.forEach(function (item) {
                if (item.linkId === linkIdContext) {
                    totalQuestions--;
                }
                else if (_this.itemHasScore(item)) {
                    scoreQuestions++;
                }
            });
            return scoreQuestions / totalQuestions >= THRESHOLD;
        };
        /**
         * Import a FHIR Questionnaire to populate questions
         * @param fhir - FHIR Questionnaire
         * @param linkIdContext - Context to use for final expression
         */
        RuleEditorService.prototype.import = function (fhir, linkIdContext) {
            this.linkIdContext = linkIdContext; // TODO change notification for linkId?
            this.fhir = fhir;
            if (fhir.resourceType === 'Questionnaire' && fhir.item && fhir.item.length) {
                this.mightBeScore = this.isProbablyScore(fhir, linkIdContext);
                this.mightBeScoreChange.next(this.mightBeScore);
                this.uneditableVariables = this.getUneditableVariables(fhir);
                this.uneditableVariablesChange.next(this.uneditableVariables);
                this.linkIdToQuestion = {};
                var linkIdToQuestion = this.linkIdToQuestion;
                this.processItem(fhir.item);
                this.variables = this.extractVariables(fhir);
                this.variablesChange.next(this.variables);
                this.questions = [];
                // tslint:disable-next-line:forin
                for (var key in linkIdToQuestion) {
                    if (!linkIdToQuestion.hasOwnProperty(key)) {
                        return;
                    }
                    var e = linkIdToQuestion[key];
                    // TODO decimal vs choice
                    var MAX_Q_LEN = 60; // Maximum question length before truncating.
                    var text = e.text;
                    this.questions.push({
                        linkId: e.linkId,
                        text: text.length > MAX_Q_LEN ? text.substring(0, MAX_Q_LEN) + '...' : text,
                        unit: this.getQuestionUnits(e.linkId)
                    });
                }
                this.questionsChange.next(this.questions);
                this.finalExpression = this.extractFinalExpression(fhir.item, linkIdContext);
                this.finalExpressionChange.next(this.finalExpression);
            }
        };
        /**
         * Process nested FHIR Questionnaire items
         * @param items - Current level of item nesting
         * @private
         */
        RuleEditorService.prototype.processItem = function (items) {
            var _this = this;
            items.forEach(function (e) {
                _this.linkIdToQuestion[e.linkId] = e;
                if (e.item) {
                    _this.processItem(e.item);
                }
            });
        };
        /**
         * Get and remove the final expression
         * @param items
         * @param linkId
         */
        RuleEditorService.prototype.extractFinalExpression = function (items, linkId) {
            var e_1, _c;
            var _this = this;
            try {
                for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    if (item.extension) {
                        var extensionIndex = item.extension.findIndex(function (e) {
                            return e.url === _this.CALCULATED_EXPRESSION && e.valueExpression.language === _this.LANGUAGE_FHIRPATH &&
                                e.valueExpression.expression;
                        });
                        if (extensionIndex !== -1) {
                            var finalExpression = item.extension[extensionIndex].valueExpression.expression;
                            item.extension.splice(extensionIndex, 1);
                            return finalExpression;
                        }
                    }
                    else if (item.item) {
                        return this.extractFinalExpression(item.item, linkId);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_c = items_1.return)) _c.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return '';
        };
        /**
         * Process the an expression into a possible question
         * @param name - Name to assign variable
         * @param expression - Expression to process
         * @private
         */
        RuleEditorService.prototype.processVariable = function (name, expression) {
            var matches = expression.match(this.QUESTION_REGEX);
            if (matches !== null) {
                var linkId = matches[1];
                var factor_1 = matches[2];
                var variable = {
                    label: name,
                    type: 'question',
                    linkId: linkId,
                    expression: expression
                };
                if (factor_1) {
                    // We might be able to do unit conversion
                    var sourceUnits = this.getQuestionUnits(linkId);
                    if (UNIT_CONVERSION.hasOwnProperty(sourceUnits)) {
                        var conversions = UNIT_CONVERSION[sourceUnits];
                        var conversion = conversions.find(function (e) {
                            return e.factor.toString() === factor_1;
                        });
                        variable.unit = conversion.unit;
                    }
                }
                return variable;
            }
            else {
                return {
                    label: name,
                    type: 'expression',
                    expression: expression
                };
            }
        };
        // TODO check behavior of repeating linkId
        /**
         * Get question units for the question
         * @param linkId - Question linkId
         * @private
         */
        RuleEditorService.prototype.getQuestionUnits = function (linkId) {
            var QUESTIONNAIRE_UNIT = 'http://hl7.org/fhir/StructureDefinition/questionnaire-unit';
            var question = this.linkIdToQuestion[linkId];
            if (question.extension) {
                var extension = question.extension.find(function (e) {
                    return e.url === QUESTIONNAIRE_UNIT &&
                        e.valueCoding.system && e.valueCoding.system === 'http://unitsofmeasure.org';
                });
                if (extension && extension.valueCoding.code) {
                    return extension.valueCoding.code;
                }
            }
            return null;
        };
        /**
         * Generate a label name like A, B, C, ... AA, AB which is not already used
         * @param existingNames {string[]} - Array of names already used by existing variables
         * @private
         */
        RuleEditorService.prototype.getNewLabelName = function (existingNames) {
            var e_2, _c, e_3, _d;
            // All letters which can be used for a simple variable name
            var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
            // First pass is with a single character variable name. Other passes are with two
            var firstLetterAlphabet = [''].concat(alphabet);
            try {
                for (var firstLetterAlphabet_1 = __values(firstLetterAlphabet), firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next(); !firstLetterAlphabet_1_1.done; firstLetterAlphabet_1_1 = firstLetterAlphabet_1.next()) {
                    var firstLetter = firstLetterAlphabet_1_1.value;
                    var _loop_1 = function (secondLetter) {
                        var potentialName = firstLetter + secondLetter;
                        var count = existingNames.filter(function (e) { return e === potentialName; });
                        if (count.length === 0) {
                            return { value: potentialName };
                        }
                    };
                    try {
                        for (var alphabet_1 = (e_3 = void 0, __values(alphabet)), alphabet_1_1 = alphabet_1.next(); !alphabet_1_1.done; alphabet_1_1 = alphabet_1.next()) {
                            var secondLetter = alphabet_1_1.value;
                            var state_1 = _loop_1(secondLetter);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (alphabet_1_1 && !alphabet_1_1.done && (_d = alphabet_1.return)) _d.call(alphabet_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (firstLetterAlphabet_1_1 && !firstLetterAlphabet_1_1.done && (_c = firstLetterAlphabet_1.return)) _c.call(firstLetterAlphabet_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            // Don't return a suggested name if we exhausted all combinations
            return '';
        };
        /**
         * Toggle the mightBeScore
         */
        RuleEditorService.prototype.toggleMightBeScore = function () {
            this.mightBeScore = !this.mightBeScore;
            this.mightBeScoreChange.next(this.mightBeScore);
        };
        /**
         * Add variables and finalExpression and return the new FHIR Questionnaire
         * @param finalExpression
         */
        RuleEditorService.prototype.export = function (finalExpression) {
            var _this = this;
            // TODO support for different variable scopes
            // Copy the fhir object so we can export more than once
            // (if we add our data the second export will have duplicates)
            var fhir = JSON.parse(JSON.stringify(this.fhir));
            var variablesToAdd = this.variables.map(function (e) {
                return {
                    url: _this.VARIABLE_EXTENSION,
                    valueExpression: {
                        name: e.label,
                        language: _this.LANGUAGE_FHIRPATH,
                        expression: e.expression
                    }
                };
            });
            if (fhir.extension) {
                fhir.extension = fhir.extension.concat(variablesToAdd);
            }
            else {
                fhir.extension = variablesToAdd;
            }
            var finalExpressionExtension = {
                url: this.CALCULATED_EXPRESSION,
                valueExpression: {
                    language: this.LANGUAGE_FHIRPATH,
                    expression: finalExpression
                }
            };
            this.insertExtensions(fhir.item, this.linkIdContext, [finalExpressionExtension]);
            return fhir;
        };
        /**
         * Takes FHIR questionnaire definition and a linkId and returns a new FHIR
         * Questionnaire with a calculated expression at the given linkId which sums up
         * all the ordinal values in the questionnaire
         */
        RuleEditorService.prototype.addTotalScoreRule = function (fhir, linkId) {
            this.fhir = fhir;
            this.linkIdContext = linkId;
            return this.exportSumOfScores();
        };
        /**
         * Given the current FHIR questionnaire definition and a linkId return a new FHIR
         * Questionnaire with a calculated expression at the given linkId which sums up
         * all the ordinal values in the questionnaire
         */
        RuleEditorService.prototype.exportSumOfScores = function () {
            var _this = this;
            var fhir = this.fhir;
            var linkIdContext = this.linkIdContext;
            var variableNames = [];
            var scoreQuestionLinkIds = [];
            // Get an array of linkIds for score questions
            fhir.item.forEach(function (item) {
                if (item.linkId !== linkIdContext && _this.itemHasScore(item)) {
                    scoreQuestionLinkIds.push(item.linkId);
                }
            });
            // Get as many short suggested variable names as we have score questions
            scoreQuestionLinkIds.forEach(function () {
                variableNames.push(_this.getNewLabelName(variableNames));
            });
            var scoreQuestions = scoreQuestionLinkIds.map(function (e, i) {
                return {
                    url: _this.VARIABLE_EXTENSION,
                    valueExpression: {
                        name: variableNames[i],
                        language: _this.LANGUAGE_FHIRPATH,
                        expression: "%questionnaire.item.where(linkId = '" + e + "').answerOption" +
                            (".where(valueCoding.code=%resource.item.where(linkId = '" + e + "').answer.valueCoding.code).extension") +
                            ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value"
                    }
                };
            });
            var anyQuestionAnswered = {
                url: this.VARIABLE_EXTENSION,
                valueExpression: {
                    name: 'any_questions_answered',
                    language: this.LANGUAGE_FHIRPATH,
                    expression: variableNames.map(function (e) { return "%" + e + ".exists()"; }).join(' or ')
                }
            };
            var sumString = variableNames.map(function (e) { return "iif(%" + e + ".exists(), %" + e + ", 0)"; }).join(' + ');
            var totalCalculation = {
                url: this.CALCULATED_EXPRESSION,
                valueExpression: {
                    description: 'Total score calculation',
                    language: this.LANGUAGE_FHIRPATH,
                    expression: "iif(%any_questions_answered, " + sumString + ", {})"
                }
            };
            scoreQuestions.push(anyQuestionAnswered);
            // @ts-ignore
            scoreQuestions.push(totalCalculation);
            this.insertExtensions(fhir.item, linkIdContext, scoreQuestions);
            return fhir;
        };
        RuleEditorService.prototype.insertExtensions = function (items, linkId, extensions) {
            var e_4, _c;
            try {
                for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                    var item = items_2_1.value;
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
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (items_2_1 && !items_2_1.done && (_c = items_2.return)) _c.call(items_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        /**
         * Get the expression for a question
         * @param linkId - Question linkId
         * @param itemHasScore - Answer has an ordinalValue extension
         * @param convertible - Units can be converted
         * @param unit - Base units
         * @param toUnit - Destination units
         */
        RuleEditorService.prototype.valueOrScoreExpression = function (linkId, itemHasScore, convertible, unit, toUnit) {
            if (itemHasScore) {
                return "%questionnaire.item.where(linkId = '" + linkId + "').answerOption" +
                    (".where(valueCoding.code=%resource.item.where(linkId = '" + linkId + "').answer.valueCoding.code).extension") +
                    ".where(url='http://hl7.org/fhir/StructureDefinition/ordinalValue').value";
            }
            else if (convertible && unit && toUnit) {
                var factor = UNIT_CONVERSION[unit].find(function (e) { return e.unit === toUnit; }).factor;
                return "%resource.item.where(linkId='" + linkId + "').answer.value*" + factor;
            }
            else {
                return "%resource.item.where(linkId='" + linkId + "').answer.value";
            }
        };
        return RuleEditorService;
    }());
    RuleEditorService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function RuleEditorService_Factory() { return new RuleEditorService(); }, token: RuleEditorService, providedIn: "root" });
    RuleEditorService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    RuleEditorService.ctorParameters = function () { return []; };

    var RuleEditorComponent = /** @class */ (function () {
        function RuleEditorComponent(variableService) {
            this.variableService = variableService;
            this.fhirQuestionnaire = null;
            this.itemLinkId = null;
            this.submitButtonName = 'Submit';
            this.save = new i0.EventEmitter();
            this.advancedInterface = true;
            this.datePipe = new common.DatePipe('en-US');
            this.suggestions = [];
        }
        /**
         * Angular lifecycle hook called before the component is destroyed
         */
        RuleEditorComponent.prototype.ngDestroy = function () {
            this.calculateSumSubscription.unsubscribe();
            this.finalExpressionSubscription.unsubscribe();
            this.variablesSubscription.unsubscribe();
        };
        /**
         * Angular lifecycle hook called on input changes
         */
        RuleEditorComponent.prototype.ngOnChanges = function () {
            this.reload();
        };
        /**
         * Re-import fhir and context and show the form
         */
        RuleEditorComponent.prototype.reload = function () {
            var _this = this;
            if (this.fhirQuestionnaire !== null && this.itemLinkId !== null) {
                this.variableService.import(this.fhirQuestionnaire, this.itemLinkId);
            }
            this.linkIdContext = this.variableService.linkIdContext;
            this.expressionSyntax = this.variableService.syntaxType;
            this.calculateSum = this.variableService.mightBeScore;
            this.calculateSumSubscription = this.variableService.mightBeScoreChange.subscribe(function (mightBeScore) {
                _this.calculateSum = mightBeScore;
            });
            this.finalExpression = this.variableService.finalExpression;
            this.finalExpressionSubscription = this.variableService.finalExpressionChange.subscribe(function (finalExpression) {
                _this.finalExpression = finalExpression;
            });
            this.variables = this.variableService.variables.map(function (e) { return e.label; });
            this.variablesSubscription = this.variableService.variablesChange.subscribe(function (variables) {
                _this.variables = variables.map(function (e) { return e.label; });
            });
        };
        /**
         * Import uploaded data as a FHIR Questionnaire
         * @param fileInput - Form file upload
         */
        RuleEditorComponent.prototype.import = function (fileInput) {
            var _this = this;
            if (fileInput.target.files && fileInput.target.files[0]) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    if (typeof e.target.result === 'string') {
                        try {
                            var input = JSON.parse(e.target.result);
                            _this.variableService.import(input, _this.linkIdContext);
                        }
                        catch (e) {
                            console.error('Could not parse file', e);
                        }
                    }
                    else {
                        console.error('Could not read file');
                    }
                };
                fileReader.readAsText(fileInput.target.files[0]);
            }
            fileInput.target.value = '';
        };
        /**
         * Export FHIR Questionnaire and download as a file
         */
        RuleEditorComponent.prototype.export = function () {
            this.save.emit(this.variableService.export(this.finalExpression));
        };
        /**
         * Export FHIR questionnaire file by summing all ordinal values
         */
        RuleEditorComponent.prototype.exportSumOfScores = function () {
            this.save.emit(this.variableService.exportSumOfScores());
        };
        /**
         * Download data as a file
         * @param data - Object which will this function will call JSON.stringify on
         * @param fileName - File name to download as
         * @private
         */
        RuleEditorComponent.prototype.downloadAsFile = function (data, fileName) {
            var blob = new Blob([
                JSON.stringify(data, null, 2)
            ]);
            var date = this.datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');
            fileName = fileName ? fileName : "fhirpath-" + date + ".json";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            }
            else {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.setAttribute('style', 'display: none');
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            }
        };
        /**
         * Called when the syntax type is changed to clean up expressions if the data cannot be converted
         * @param $event - event from from the caller
         */
        RuleEditorComponent.prototype.onSyntaxChange = function ($event) {
            var newSyntax = $event.value;
            // Clear the existing expression if switching away from fhirpath
            if (newSyntax === 'simple') {
                this.finalExpression = '';
            }
            this.variableService.syntaxType = newSyntax;
        };
        /**
         * Update the final expression
         * @param expression
         */
        RuleEditorComponent.prototype.updateFinalExpression = function (expression) {
            this.finalExpression = expression;
        };
        return RuleEditorComponent;
    }());
    RuleEditorComponent.decorators = [
        { type: i0.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: 'lhc-rule-editor',
                    template: "<lhc-calculate-sum-prompt *ngIf=\"calculateSum\" (export)=\"exportSumOfScores()\"></lhc-calculate-sum-prompt>\n<div *ngIf=\"!calculateSum\">\n  <h1>{{titleName}}</h1>\n\n  <section id=\"uneditable-variables-section\" class=\"mb-3\">\n    <lhc-uneditable-variables></lhc-uneditable-variables>\n  </section>\n\n  <section id=\"variables-section\" class=\"mb-3\">\n    <lhc-variables [advancedInterface]=\"advancedInterface\"></lhc-variables>\n  </section>\n\n  <section id=\"final-expression-section\" class=\"mb-3\">\n    <h2>Final Expression</h2>\n\n<!--    <div *ngIf=\"advancedInterface\">-->\n<!--      <mat-radio-group [(ngModel)]=\"expressionSyntax\" (change)=\"onSyntaxChange($event)\" aria-label=\"Select an option\">-->\n<!--        <mat-radio-button value=\"simple\">Simple Expression Syntax</mat-radio-button>-->\n<!--        <mat-radio-button value=\"fhirpath\">FHIRPath Expression Syntax</mat-radio-button>-->\n<!--      </mat-radio-group>-->\n<!--    </div>-->\n\n    <div class=\"container\">\n      <div class=\"row form-group\">\n        <div class=\"col-md-3\">\n          <div class=\"form-inline\">\n            <select class=\"form-control\" [(ngModel)]=\"expressionSyntax\" aria-label=\"Expression syntax type\">\n              <option value=\"simple\">Simple Expression</option>\n              <option value=\"fhirpath\">FHIRPath Expression</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col-md-9\" [ngSwitch]=\"expressionSyntax\">\n          <lhc-syntax-converter [variables]=\"variables\" *ngSwitchCase=\"'simple'\" (expressionChange)=\"updateFinalExpression($event)\" class=\"form-inline\"></lhc-syntax-converter>\n          <input aria-label=\"FHIRPath\" *ngSwitchCase=\"'fhirpath'\" id=\"final-expression\" class=\"form-control\" [(ngModel)]=\"finalExpression\">\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"suggestions.length\">{{suggestions|json}}</div>\n  </section>\n\n  <button class=\"btn btn-primary py-2 px-5\" (click)=\"export()\" id=\"export\">{{submitButtonName}}</button>\n</div>\n",
                    styles: [".toolbar-button{height:2.7rem}.file-import{width:4.6rem;color:transparent}.file-import::-webkit-file-upload-button{visibility:hidden}.file-import:before{content:\"Import\";display:inline-block;cursor:pointer;color:#fff}mat-radio-button{margin-left:1em}"]
                },] }
    ];
    RuleEditorComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    RuleEditorComponent.propDecorators = {
        fhirQuestionnaire: [{ type: i0.Input }],
        itemLinkId: [{ type: i0.Input }],
        submitButtonName: [{ type: i0.Input }],
        titleName: [{ type: i0.Input }],
        save: [{ type: i0.Output }]
    };

    var VariableType;
    (function (VariableType) {
        VariableType["question"] = "Question";
        VariableType["expression"] = "FHIRPath Expression";
        VariableType["simple"] = "Simple Expression";
    })(VariableType || (VariableType = {}));

    var VariablesComponent = /** @class */ (function () {
        function VariablesComponent(ruleEditorService) {
            this.ruleEditorService = ruleEditorService;
            this.variableType = VariableType;
            this.levels = [{
                    level: 0,
                    name: 'Top Level Scope'
                }
            ];
        }
        /**
         * Angular lifecycle hook called when the component is initialized
         */
        VariablesComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.variables = this.ruleEditorService.variables;
            this.variableSubscription = this.ruleEditorService.variablesChange.subscribe(function (variables) {
                _this.variables = variables;
            });
        };
        /**
         * Angular lifecycle hook called before the component is destroyed
         */
        VariablesComponent.prototype.ngDestroy = function () {
            this.variableSubscription.unsubscribe();
        };
        /**
         * Called when adding a new variable
         */
        VariablesComponent.prototype.onAdd = function () {
            this.ruleEditorService.addVariable();
        };
        /**
         * Remove a variable at an index
         * @param i - index to remove
         */
        VariablesComponent.prototype.onRemove = function (i) {
            this.ruleEditorService.remove(i);
        };
        /**
         * Drag and drop rearrange of variable order
         * @param event - drag and drop event
         */
        VariablesComponent.prototype.drop = function (event) {
            dragDrop.moveItemInArray(this.variables, event.previousIndex, event.currentIndex);
        };
        /**
         * Get the labels of available variables at the current index
         * @param index - Index of variable we're editing
         */
        VariablesComponent.prototype.getAvailableVariables = function (index) {
            var uneditableVariables = this.ruleEditorService.uneditableVariables.map(function (e) { return e.name; });
            // Only return variables up to but not including index
            var editableVariables = this.variables.map(function (e) { return e.label; }).slice(0, index);
            return uneditableVariables.concat(editableVariables);
        };
        return VariablesComponent;
    }());
    VariablesComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-variables',
                    template: "<h2>Variables</h2>\n\n<div class=\"container\">\n  <div class=\"row font-weight-bold mb-2\" aria-hidden=\"true\">\n    <div class=\"col-md-2\">Label</div>\n    <div class=\"col-md-3\">Type</div>\n    <div class=\"col-md-7\">Question/FHIRPath Expression</div>\n  </div>\n  <div cdkDropList (cdkDropListDropped)=\"drop($event)\">\n    <div class=\"variable-row drag-variable row py-2\" *ngFor=\"let variable of variables; index as i\" [id]=\"'row-' + i\" cdkDrag>\n      <div class=\"col-md-2 form-inline\">\n        <!-- Inline SVG for the row drag and drop handle -->\n        <svg cdkDragHandle xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-grip-vertical mr-2 handle\" viewBox=\"0 0 16 16\">\n          <path d=\"M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n        </svg>\n        <input [id]=\"'variable-label-' + i\" [(ngModel)]=\"variable.label\" class=\"form-control w-75\" aria-label=\"Variable label\" />\n      </div>\n      <div class=\"col-md-3\">\n        <div class=\"form-inline\">\n          <select [id]=\"'variable-type-' + i\" class=\"form-control\" [(ngModel)]=\"variable.type\" aria-label=\"Variable type\">\n            <option value=\"\" disabled hidden>Select...</option>\n            <option *ngFor=\"let type of variableType | keyvalue\" value=\"{{type.key}}\">{{type.value}}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"col-md-6\" [ngSwitch]=\"variable.type\">\n        <lhc-question [variable]=\"variable\" [advancedInterface]=\"advancedInterface\" *ngSwitchCase=\"'question'\"></lhc-question>\n        <div class=\"form-inline\" *ngSwitchCase=\"'simple'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.simple\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"Simple Expression\" />\n          <lhc-syntax-preview [syntax]=\"variable.simple | mathToFhirpath:getAvailableVariables(i)\"></lhc-syntax-preview>\n        </div>\n        <div class=\"form-inline\" *ngSwitchCase=\"'expression'\">\n          <input [id]=\"'variable-expression-' + i\" [(ngModel)]=\"variable.expression\" class=\"form-control mr-2 w-100\"\n                 aria-label=\"FHIRPath Expression\" />\n        </div>\n      </div>\n      <div class=\"col-md-1\">\n        <button class=\"btn btn-danger remove-variable\" aria-label=\"Remove Line\" (click)=\"onRemove(i)\">x</button>\n      </div>\n    </div>\n    <div *ngIf=\"!variables.length\" class=\"py-2\">No variables, please <a href=\"#\" (click)=\"onAdd()\">add one</a>.</div>\n  </div>\n</div>\n\n<button id=\"add-variable\" class=\"btn btn-secondary mt-2\" (click)=\"onAdd()\">Add variable</button>\n",
                    styles: [".example-list{width:500px;max-width:100%;border:1px solid #ccc;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}.drag-variable{padding:20px 10px;border-top:1px solid rgba(0,0,0,.1);color:rgba(0,0,0,.87);display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;background:#fff}.handle{cursor:move}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box:last-child{border:none}.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    VariablesComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    VariablesComponent.propDecorators = {
        advancedInterface: [{ type: i0.Input }]
    };

    var UneditableVariablesComponent = /** @class */ (function () {
        function UneditableVariablesComponent(variableService) {
            this.variableService = variableService;
        }
        /**
         * Angular lifecycle hook called when the component is initialized
         */
        UneditableVariablesComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.uneditableVariables = this.variableService.uneditableVariables;
            this.uneditableVariablesSubscription =
                this.variableService.uneditableVariablesChange.subscribe(function (variables) {
                    _this.uneditableVariables = variables;
                });
        };
        /**
         * Angular lifecycle hook called before the component is destroyed
         */
        UneditableVariablesComponent.prototype.ngDestroy = function () {
            this.uneditableVariablesSubscription.unsubscribe();
        };
        return UneditableVariablesComponent;
    }());
    UneditableVariablesComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-uneditable-variables',
                    template: "<div *ngIf=\"uneditableVariables.length\">\n  <h2>Un-editable Variables</h2>\n\n  <div class=\"container mb-4\">\n    <div class=\"row font-weight-bold\" aria-hidden=\"true\">\n      <div class=\"col-2\">Label</div>\n      <div class=\"col-2\">Type</div>\n      <div class=\"col-8\">Description</div>\n    </div>\n    <hr>\n    <div class=\"row\" *ngFor=\"let variable of uneditableVariables\">\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.name}}</div>\n      <div class=\"col-2\"><span class=\"sr-only\">Label</span>{{variable.type}}</div>\n      <div class=\"col-8\"><span class=\"sr-only\">Description</span>{{variable.description}}</div>\n    </div>\n  </div>\n</div>\n"
                },] }
    ];
    UneditableVariablesComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };

    var QuestionComponent = /** @class */ (function () {
        function QuestionComponent(variableService) {
            this.variableService = variableService;
            this.linkId = '';
            this.itemHasScore = false;
            this.isNonConvertibleUnit = false;
        }
        /**
         * Angular lifecycle hook called when the component is initialized
         */
        QuestionComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.linkId = this.variable.linkId ? this.variable.linkId : '';
            this.toUnit = this.variable.unit ? this.variable.unit : '';
            this.questions = this.variableService.questions;
            this.onChange(false);
            this.variableService.questionsChange.subscribe(function (questions) {
                _this.questions = questions;
            });
        };
        /**
         * Get the question based on linkId
         * @param linkId - FHIR linkId
         */
        QuestionComponent.prototype.getQuestion = function (linkId) {
            return this.questions.find(function (q) {
                return q.linkId === linkId;
            });
        };
        /**
         * Get the list of units we can convert to based on the starting unit
         * @param unit - Starting unit
         */
        QuestionComponent.prototype.getConversionOptions = function (unit) {
            return UNIT_CONVERSION[unit];
        };
        /**
         * Called when the questionnaire question or unit is changed
         * @param isQuestion - The change was for a question
         */
        QuestionComponent.prototype.onChange = function (isQuestion) {
            if (isQuestion) {
                // Reset the conversion options when the question changes
                this.toUnit = '';
            }
            // If we already have a question selected (as opposed to the select... prompt)
            if (this.linkId) {
                var question = this.getQuestion(this.linkId);
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
        };
        return QuestionComponent;
    }());
    QuestionComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-question',
                    template: "<div class=\"form-inline\">\n  <select class=\"question-select form-control mr-2 w-50\" [(ngModel)]=\"linkId\" (change)=\"onChange(true)\" aria-label=\"Question\">\n    <option value=\"\" disabled hidden>Select...</option>\n    <option *ngFor=\"let question of questions\" [value]=\"question.linkId\">\n      {{question.text}}{{advancedInterface ? ' (' + question.linkId + ')' : ''}}\n    </option>\n  </select>\n\n  <select class=\"unit-select form-control\" style=\"width: 40%\" *ngIf=\"conversionOptions\" [(ngModel)]=\"toUnit\"\n          (change)=\"onChange(false)\" aria-label=\"Unit conversion\">\n    <option value=\"\">Keep form units ({{unit}})</option>\n    <option *ngFor=\"let u of conversionOptions\" value=\"{{u.unit}}\">Convert to {{u.unit}}</option>\n  </select>\n  <span *ngIf=\"isNonConvertibleUnit\">{{unit}}</span>\n  <span *ngIf=\"itemHasScore\">Score</span>\n\n  <lhc-syntax-preview [syntax]=\"variable.expression\"></lhc-syntax-preview>\n</div>\n"
                },] }
    ];
    QuestionComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    QuestionComponent.propDecorators = {
        variable: [{ type: i0.Input }],
        advancedInterface: [{ type: i0.Input }]
    };

    var CalculateSumPromptComponent = /** @class */ (function () {
        function CalculateSumPromptComponent(ruleEditorService) {
            this.ruleEditorService = ruleEditorService;
            this.export = new i0.EventEmitter();
        }
        /**
         * Angular lifecycle hook called when the component is initialized
         */
        CalculateSumPromptComponent.prototype.ngOnInit = function () { };
        /**
         * Close the dialog by specifying this should not be a score calculation
         */
        CalculateSumPromptComponent.prototype.onCloseClick = function () {
            this.ruleEditorService.toggleMightBeScore();
        };
        /**
         * Export the sum of scores as a FHIR Questionnaire
         */
        CalculateSumPromptComponent.prototype.onExportClick = function () {
            this.export.emit();
        };
        return CalculateSumPromptComponent;
    }());
    CalculateSumPromptComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-calculate-sum-prompt',
                    template: "<div class=\"score-modal\">\n  <p>It looks like this might be a score calculation.</p>\n\n  <p>Would you like to calculate the sum of scores?</p>\n\n  <button class=\"btn btn-primary py-2 px-5 mx-2\" (click)=\"onExportClick()\" id=\"export-score\">Yes</button>\n  <button class=\"btn btn-secondary py-2 px-5 mx-2\" (click)=\"onCloseClick()\" id=\"skip-export-score\">No</button>\n</div>\n",
                    styles: [".score-modal{text-align:center}"]
                },] }
    ];
    CalculateSumPromptComponent.ctorParameters = function () { return [
        { type: RuleEditorService }
    ]; };
    CalculateSumPromptComponent.propDecorators = {
        export: [{ type: i0.Output }]
    };

    var MathToFhirpathPipe = /** @class */ (function () {
        function MathToFhirpathPipe() {
        }
        MathToFhirpathPipe.prototype.transform = function (value, variables) {
            if (value !== undefined) {
                var fhirPath = mathToFhirpath__namespace.fhirconvert(value, variables);
                if (fhirPath !== null) {
                    return fhirPath;
                }
            }
            return 'Not valid';
        };
        return MathToFhirpathPipe;
    }());
    MathToFhirpathPipe.decorators = [
        { type: i0.Pipe, args: [{
                    name: 'mathToFhirpath'
                },] }
    ];

    var SyntaxConverterComponent = /** @class */ (function () {
        function SyntaxConverterComponent() {
            this.expressionChange = new i0.EventEmitter();
            this.jsToFhirPathPipe = new MathToFhirpathPipe();
        }
        SyntaxConverterComponent.prototype.ngOnInit = function () { };
        SyntaxConverterComponent.prototype.onExpressionChange = function (value) {
            var fhirPath = this.jsToFhirPathPipe.transform(value, this.variables);
            this.fhirPathExpression = fhirPath;
            this.expressionChange.emit(fhirPath);
        };
        return SyntaxConverterComponent;
    }());
    SyntaxConverterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-syntax-converter',
                    template: "<input [(ngModel)]=\"expression\" (ngModelChange)=\"onExpressionChange($event)\"\n       class=\"form-control mr-2 w-100\" id=\"simple-expression\" aria-label=\"Simple Expression\" />\n<lhc-syntax-preview [syntax]=\"fhirPathExpression\" [showWhenEmpty]=\"true\"></lhc-syntax-preview>\n",
                    styles: [":host{width:100%}"]
                },] }
    ];
    SyntaxConverterComponent.ctorParameters = function () { return []; };
    SyntaxConverterComponent.propDecorators = {
        value: [{ type: i0.Input }],
        variables: [{ type: i0.Input }],
        expressionChange: [{ type: i0.Output }]
    };

    var SyntaxPreviewComponent = /** @class */ (function () {
        function SyntaxPreviewComponent() {
            this.showWhenEmpty = false;
        }
        SyntaxPreviewComponent.prototype.ngOnInit = function () {
        };
        return SyntaxPreviewComponent;
    }());
    SyntaxPreviewComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lhc-syntax-preview',
                    template: "<div class=\"mt-2 syntax-preview text-muted\" *ngIf=\"syntax || showWhenEmpty\">\n  FHIRPath: <pre class=\"d-inline text-muted\" title=\"{{syntax}}\">{{syntax}}</pre>\n</div>\n",
                    styles: [":host{overflow:hidden}.syntax-preview{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
                },] }
    ];
    SyntaxPreviewComponent.ctorParameters = function () { return []; };
    SyntaxPreviewComponent.propDecorators = {
        syntax: [{ type: i0.Input }],
        showWhenEmpty: [{ type: i0.Input }]
    };

    var RuleEditorModule = /** @class */ (function () {
        function RuleEditorModule() {
        }
        return RuleEditorModule;
    }());
    RuleEditorModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        RuleEditorComponent,
                        VariablesComponent,
                        UneditableVariablesComponent,
                        QuestionComponent,
                        CalculateSumPromptComponent,
                        MathToFhirpathPipe,
                        SyntaxConverterComponent,
                        SyntaxPreviewComponent
                    ],
                    imports: [
                        forms.FormsModule,
                        animations.BrowserAnimationsModule,
                        dragDrop.DragDropModule,
                        radio.MatRadioModule
                    ],
                    exports: [
                        RuleEditorComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of ng-rule-editor
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.RuleEditorComponent = RuleEditorComponent;
    exports.RuleEditorModule = RuleEditorModule;
    exports.RuleEditorService = RuleEditorService;
    exports.ɵa = VariablesComponent;
    exports.ɵb = UneditableVariablesComponent;
    exports.ɵc = QuestionComponent;
    exports.ɵd = CalculateSumPromptComponent;
    exports.ɵe = MathToFhirpathPipe;
    exports.ɵf = SyntaxConverterComponent;
    exports.ɵg = SyntaxPreviewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-rule-editor.umd.js.map
