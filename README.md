# The LHC Rule Editor

A widget to make it easier to create FHIRPath given a FHIR Questionnaire.

## Usage

The Lister Hill Center (LHC) Rule Editor can be used both as an Angular Component or a Web Component.

### Use as an Angular Component

1. Install in your project using `npm install --save-prod ng-rule-editor`
2. Make sure your application has `@angular/animations`, `@angular/cdk` `@angular/common`, `@angular/core`, and `@angular/material` as dependencies since they are needed as peer dependencies by the Rule Editor.
3. Add the `lhc-rule-editor` and required tags similar to the example below:

#### Angular Component Example

The only required attributes are `[fhirQuestionnaire]` and `[itemLinkId]`. To retrieve data use the `(save)` attribute:

* `[fhirQuestionnaire]` - The FHIR Questionnaire the user will edit using the widget.
* `[itemLinkId]` - The linkID to use as a context when evaluating the FHIR Questionnaire.
* `(save)` - Called after the user clicks `save` inside the widget and passes in the new version of the FHIR Questionnaire the user entered.
* `[expressionUrl]` - By default the widget modifies the calculatedExpression.


    <lhc-rule-editor
      [fhirQuestionnaire]="fhir[questionnaire]"
      [itemLinkId]="linkId"

      (save)="onSave(fhirResult)"
  
      [submitButtonName]="'Save'"
      [titleName]="'My Rule Editor'"
      [expressionLabel]="'My Expression'"
      [expressionUrl]="'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression'"
      [style]="{
        buttonPrimary: { backgroundColor: 'blue' },
        buttonSecondary: { backgroundColor: 'blue', color: 'white' },
        input: { backgroundColor: 'lightblue' },
        select: { backgroundColor: 'lightblue' }
      }">
    </lhc-rule-editor>

## Build

Run `ng build ng-rule-editor` and `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
