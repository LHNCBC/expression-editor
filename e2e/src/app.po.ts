import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateToWebComponent(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/web-component.html');
  }

  async getTitle(): Promise<string> {
    return element(by.css('lhc-rule-editor h1')).getText();
  }

  async getVariablesTitle(): Promise<string> {
    return element(by.css('#variables-section h2')).getText();
  }

  async getUneditableVariablesTitle(): Promise<string> {
    return element(by.css('#uneditable-variables-section h2')).getText();
  }

  async getNumberOfUneditableVariables(): Promise<number> {
    return element.all(by.css('#uneditable-variables-section .variable-row')).count();
  }

  async getNumberOfVariables(): Promise<number> {
    return element.all(by.css('#variables-section .variable-row')).count();
  }

  async getFinalExpressionTitle(): Promise<string> {
    return element(by.css('#final-expression-section h2')).getText();
  }

  async addVariable(): Promise<void> {
    return element(by.css('#add-variable')).click();
  }

  async removeVariable(index: number): Promise<void> {
    return element.all(by.css('.remove-variable')).get(index).click();
  }

  async checkAddVariable(): Promise<boolean> {
    const variablesBefore = await this.getNumberOfVariables();
    await this.addVariable();
    const variablesAfter = await this.getNumberOfVariables();

    return Promise.resolve(variablesAfter - variablesBefore === 1);
  }

  async checkRemoveLastVariable(): Promise<boolean> {
    const variablesBefore = await this.getNumberOfVariables();
    await this.removeVariable(variablesBefore - 1);
    const variablesAfter = await this.getNumberOfVariables();

    return Promise.resolve(variablesBefore - variablesAfter === 1);
  }

  async setSimpleExpression(expression): Promise<void> {
    return element(by.id('simple-expression')).sendKeys(expression);
  }
}
