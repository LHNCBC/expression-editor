# The LHC Rule Editor

A widget to make it easier to create FHIRPath given a FHIR Questionnaire.

## Usage

The Lister Hill Center (LHC) Rule Editor can be used both as an Angular Component or a Web Component.

### Attributes available

Note: To use the attributes for Web Components change the camel case below to kebab case (with a dash). This does not apply to the keys of the `style` object.

* `fhirQuestionnaire` - The FHIR Questionnaire the user will edit using the widget.
* `itemLinkId` - The linkID to use as a context when evaluating the FHIR Questionnaire.
* `save` - Called after the user clicks `save` inside the widget and passes in the new version of the FHIR Questionnaire the user entered.
* `expressionUrl` - By default the widget modifies the calculatedExpression. You can specify a different expression URL here.
* `expressionLabel` - Heading name to use to show user when entering the expression.
* `titleName` - Main widget heading shown to the user.
* `style` - Specify custom CSS to be used by the widget for:
  * h1 - Main heading
  * h2 - Secondary headings
  * previewArea - FHIRPath preview area
  * variableHeader - Variable section table header
  * variableRow - Variable section table row
  * buttonPrimary - Button style for primary action
  * buttonSecondary - Button style for secondary actions
  * buttonDanger - Button style for delete, etc
  * input - Input forms
  * select - Input forms
  * description - Instructions presented to the user

### Use as an Angular Component

1. Install in your project using `npm install --save-prod ng-rule-editor`
2. Make sure your application has `@angular/animations`, `@angular/cdk` `@angular/common`, `@angular/core`, and `@angular/material` as dependencies since they are needed as peer dependencies by the Rule Editor.
3. Add the `lhc-rule-editor` and required tags similar to the example below:

#### Angular Component Example

Note that the attribute names need to be surrounded by square brackets.
The only required attributes are `[fhirQuestionnaire]` and `[itemLinkId]`. To retrieve data use the `(save)` attribute.

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

### Use as a Web Component

1. Install in your project using `npm install --save-prod rule-editor`
2. (Optional) Integrate the web component files with your module bundler of choice.
3. Import the JavaScript files on the page.
4. Add the <lhc-rule-editor> tag along with necessary attributes to the HTML.
5. Add event handlers for the `save` event.

#### Web Component Example

To retrieve data add an event listener for `save`.

    <lhc-rule-editor
      id="editor"
      title-name="Test Rule Editor"
      submit-button-name="Test Submit">
    </lhc-rule-editor>
    
    <pre id="output"></pre>
    
    <script src="/rule-editor/runtime.js"></script>
    <script src="/rule-editor/polyfills.js"></script>
    <script src="/rule-editor/main.js"></script>
    
    <script src="mock-data.js"></script>
    
    <script>
      const editor = document.getElementById('editor');
      const output = document.getElementById('output');
    
      editor.fhirQuestionnaire = fhir.phq9;
      editor.itemLinkId = '/39156-5';
      editor.titlename = 'test';
    
      editor.addEventListener('save', (data) => {
        output.innerText = JSON.stringify(data.detail, null, 2);
      });
    </script>

## Build

Run `ng build ng-rule-editor` and `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
