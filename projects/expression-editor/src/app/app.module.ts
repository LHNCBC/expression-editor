import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { ExpressionEditorComponent, ExpressionEditorModule, ENVIRONMENT_TOKEN } from 'projects/ngx-expression-editor/src/public-api';
import { createCustomElement } from '@angular/elements';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    ExpressionEditorModule
  ],
  providers: [
    { provide: ENVIRONMENT_TOKEN, useValue: environment }
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const ExpressionEditor = createCustomElement(ExpressionEditorComponent, { injector: this.injector });
    customElements.define('lhc-expression-editor', ExpressionEditor);
  }
}
