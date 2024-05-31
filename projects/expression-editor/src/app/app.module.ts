import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { ExpressionEditorComponent, ExpressionEditorModule } from 'projects/ngx-expression-editor/src/public-api';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ExpressionEditorModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const ExpressionEditor = createCustomElement(ExpressionEditorComponent, { injector: this.injector });
    customElements.define('lhc-expression-editor', ExpressionEditor);
  }
}
