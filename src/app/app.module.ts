import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RuleEditorModule } from 'ng-rule-editor';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuleEditorModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
