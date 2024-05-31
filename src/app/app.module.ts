import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ExpressionEditorModule } from 'ngx-expression-editor';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ExpressionEditorModule,
    HttpClientModule,
    A11yModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
