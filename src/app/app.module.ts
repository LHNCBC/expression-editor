import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QuestionnaireRuleEditorModule } from 'questionnaire-rule-editor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QuestionnaireRuleEditorModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
