import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RuleEditorModule } from 'ng-rule-editor';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RuleEditorModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
