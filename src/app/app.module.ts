import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RuleEditorModule } from 'ng-rule-editor';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuleEditorModule,
    HttpClientModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
