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
import { HelpsComponent } from './helps/helps.component';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { ExpressionValidatorDirective } from '../directives/expression/expression-validator.directive';
import { BaseDialogComponent } from './dialogs/base-dialog/base-dialog.component';
import { CancelChangesConfirmationDialogComponent } from './dialogs/cancel-changes-confirmation-dialog/cancel-changes-confirmation-dialog.component';
import { FhirpathEasypathConversionConfirmationDialogComponent } from './dialogs/fhirpath-easypath-conversion-confirmation-dialog/fhirpath-easypath-conversion-confirmation-dialog.component';
import { FhirpathExpressionHelpDialogComponent } from './dialogs/fhirpath-expression-help-dialog/fhirpath-expression-help-dialog.component';
import { EasyPathExpressionHelpDialogComponent } from './dialogs/easy-path-expression-help-dialog/easy-path-expression-help-dialog.component';

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
    HelpsComponent,
    YesNoDialogComponent,
    ExpressionValidatorDirective,
    BaseDialogComponent,
    CancelChangesConfirmationDialogComponent,
    FhirpathEasypathConversionConfirmationDialogComponent,
    FhirpathExpressionHelpDialogComponent,
    EasyPathExpressionHelpDialogComponent
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
