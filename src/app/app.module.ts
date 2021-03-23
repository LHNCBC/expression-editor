import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VariablesComponent } from './variables/variables.component';
import { UneditableVariablesComponent } from './uneditable-variables/uneditable-variables.component';
import { QuestionComponent } from './question/question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalculateSumPromptComponent } from './calculate-sum-prompt/calculate-sum-prompt.component';
import { MatRadioModule } from '@angular/material/radio';
import { JsToFhirPathPipe } from './js-to-fhir-path.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VariablesComponent,
    UneditableVariablesComponent,
    QuestionComponent,
    CalculateSumPromptComponent,
    JsToFhirPathPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
