import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { A11yModule } from '@angular/cdk/a11y';
import { TreeModule } from '@bugsplat/angular-tree-component';

import { RuleEditorComponent } from './rule-editor.component';
import { VariablesComponent } from './variables/variables.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { QuestionComponent } from './question/question.component';
import { CalculateSumPromptComponent } from './calculate-sum-prompt/calculate-sum-prompt.component';
import { EasyPathExpressionsPipe } from './easy-path-expressions.pipe';
import { SyntaxConverterComponent } from './syntax-converter/syntax-converter.component';
import { SyntaxPreviewComponent } from './syntax-preview/syntax-preview.component';
import { QueryObservationComponent } from './query-observation/query-observation.component';
import { CaseStatementsComponent } from './case-statements/case-statements.component';
import { SelectScoringItemsComponent } from './select-scoring-items/select-scoring-items.component';
import { EasyPathExpressionHelpComponent } from './helps/easy-path-expression-help/easy-path-expression-help.component';
import { FhirpathExpressionHelpComponent } from './helps/fhirpath-expression-help/fhirpath-expression-help.component';
import { HelpsComponent } from './helps/helps.component';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { VariableNameValidatorDirective } from '../directives/variable-name/variable-name-validator.directive';

@NgModule({
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
    CaseStatementsComponent,
    SelectScoringItemsComponent,
    EasyPathExpressionHelpComponent,
    FhirpathExpressionHelpComponent,
    HelpsComponent,
    YesNoDialogComponent,
    VariableNameValidatorDirective
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatRadioModule,
    ClipboardModule,
    MatTooltipModule,
    MatSnackBarModule,
    TreeModule,
    A11yModule
  ],
  exports: [
    RuleEditorComponent
  ]
})
export class RuleEditorModule {
}
