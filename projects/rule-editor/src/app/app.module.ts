import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { RuleEditorComponent, RuleEditorModule } from 'ng-rule-editor';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RuleEditorModule
  ],
  providers: [],
  bootstrap: [
    RuleEditorComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const RuleEditor = createCustomElement(RuleEditorComponent, {injector});
    customElements.define('lhc-rule-editor', RuleEditor);
  }
}
