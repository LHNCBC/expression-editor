import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { RuleEditorComponent, RuleEditorModule } from 'projects/ng-rule-editor/src/public-api';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RuleEditorModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const RuleEditor = createCustomElement(RuleEditorComponent, { injector: this.injector });
    customElements.define('lhc-rule-editor', RuleEditor);
  }
}
