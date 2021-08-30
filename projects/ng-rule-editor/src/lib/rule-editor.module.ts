import { NgModule } from '@angular/core';
import { RuleEditorComponent } from './rule-editor.component';

import { FormsModule } from '@angular/forms';

import { VariablesComponent } from './variables/variables.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalculateSumPromptComponent } from './calculate-sum-prompt/calculate-sum-prompt.component';
import { MatRadioModule } from '@angular/material/radio';
import { MathToFhirpathPipe } from './math-to-fhirpath.pipe';
import { SyntaxConverterComponent } from './syntax-converter/syntax-converter.component';
import { SyntaxPreviewComponent } from './syntax-preview/syntax-preview.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
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
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatRadioModule,
    ClipboardModule,
    MatTooltipModule
  ],
  exports: [
    RuleEditorComponent
  ]
})
export class RuleEditorModule { }
