import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitle(): Promise<string> {
    return element(by.css('lib-rule-editor h1')).getText();
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

  async addQuestionVariable(question, unit): Promise<void> {
    await this.addVariable();
    const index = await this.getNumberOfVariables() - 1;

    // Set as question
    await element(by.id('variable-type-' + index)).click();
    await element(by.id(`row-${index}`)).element(by.cssContainingText('option', 'Question')).click();
    await element(by.css(`#row-${index} .question-select`)).click();
    await element(by.id(`row-${index}`)).element(by.cssContainingText('option', question)).click();
    await element(by.css(`#row-${index} .unit-select`)).click();
    await element(by.id(`row-${index}`)).element(by.cssContainingText('option', unit)).click();

    return Promise.resolve();
  }

  async checkAddVariable(): Promise<boolean> {
    const variablesBefore = await this.getNumberOfVariables();
    await this.addVariable();
    const variablesAfter = await this.getNumberOfVariables();

    return Promise.resolve(variablesAfter - variablesBefore === 1);
  }

  async setFinalExpression(expression): Promise<void> {
    return element(by.id('final-expression')).sendKeys(expression);
  }
}
