# The LHC Rule Editor

A widget to add FHIRPath expressions to a given FHIR Questionnaire.

## Usage

The Lister Hill Center (LHC) Rule Editor can be used both as an Angular
Component or a Web Component.

### Attributes available <a name="attributes-available"></a>

Note: To use the attributes for Web Components change the camel case below to
kebab case (with a dash). This does not apply to the keys of the `lhcStyle`
object.

* `fhirQuestionnaire` - The FHIR Questionnaire the user will edit using the
  widget.
* `itemLinkId` - The linkID on which the FHIRPath expression will be stored.
  If the FHIRPath expression is to be stored at the Questionnaire root level
  rather than at the item levels, then an empty 'itemLinkId' should be passed in.
* `save` - Callback called after the user clicks `save` inside the widget.
  The callback passes in the new version of the FHIR Questionnaire the user
  entered as a parameter.
* `expressionUri` - By default the widget modifies the calculatedExpression.
  You can specify a different expression URL here. Only valueExpression
  extensions are currently supported. If the FHIRPath expression is to be 
  stored at the Questionnaire root level, the Output Expression section is
  omitted; and as a result, the 'expressionUri' is not needed. 
* `expressionLabel` - Heading name to use to show user when entering the
  expression.
* `titleName` - Main widget heading shown to the user.
* `advancedInterface` - Show options to edit FHIRPath and x-fhir-query directly
  in dropdowns. This mode is automatically enabled for complex Questionnaires.
  This attribute sets the default which can be overridden by the user.
* `doNotAskToCalculateScore` - Do not ask the user if they would like to
  calculate a score.
* `userExpressionChoices` - Choices of expression type to output. Array of
  objects with `name` and `uri` values of choices to present to the user in a
  dropdown. If no value is provided the dropdown will not be present.
* `lhcStyle` (object) - Specify custom CSS to be used by the widget for:
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
2. Make sure your application has `@angular/animations`, `@angular/cdk`,
   `@angular/common`, `@angular/core` and `@angular/material` as dependencies
   since they are needed as peer dependencies by the Rule Editor.
3. Add the `lhc-rule-editor` and required tags similar to the example below:

#### Angular Component Example

Note that the attribute names need to be surrounded by square brackets.
The only required attributes are `[fhirQuestionnaire]` and `[itemLinkId]`.

If the FHIRPath expression is to be stored at the Questionnaire root level,
only the `[fhirQuestionnaire]` is the requied attribute. An empty `[itemLinkId]`
can be passed in or omitted altogether in that case. 

To retrieve data use the `(save)` attribute.

    <lhc-rule-editor
      [fhirQuestionnaire]="fhir[questionnaire]"
      [itemLinkId]="linkId"

      (save)="onSave(fhirResult)"
  
      [submitButtonName]="'Save'"
      [titleName]="'My Rule Editor'"
      [expressionLabel]="'My Expression'"
      [expressionUri]="'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression'"
      [lhcStyle]="{
        buttonPrimary: { backgroundColor: 'blue' },
        buttonSecondary: { backgroundColor: 'blue', color: 'white' },
        input: { backgroundColor: 'lightblue' },
        select: { backgroundColor: 'lightblue' }
      }">
    </lhc-rule-editor>

### Use as a Web Component

1. Install in your project using `npm install --save-prod rule-editor`
2. Import jQuery.
4. Import the JavaScript file `rule-editor.js` on the page or integrate it as
  part of your build process (webpack, etc.)
5. Add the <lhc-rule-editor> tag along with necessary [attributes](#attributes-available) to the HTML.
6. Add event handlers for the `save` event.

#### Web Component Example

To retrieve data add an event listener for `save`.

    <lhc-rule-editor
      id="editor"
      title-name="Test Rule Editor"
      submit-button-name="Test Submit">
    </lhc-rule-editor>
    
    <pre id="output"></pre>
    
    <script src="/rule-editor/rule-editor.js"></script>
    
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

Run `npm run build` to build the project. The build artifacts will be stored
in the `dist/` directory. Use the `--prod` flag for a production build.

## Demo project

Run `npm start` after building to see the two ways to use the widget:

* The Angular Library can be used at [http://localhost:4202](http://localhost:4202).
* The Web Component can be used at [http://localhost:4202/web-component.html](http://localhost:4202/web-component.html).

## Running tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io)
and the end-to-end tests via [Protractor](http://www.protractortest.org/).
