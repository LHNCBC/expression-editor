export function getTitle() {
  return cy.get('lhc-rule-editor h1');
}

export function getNumberOfUneditableVariables(): number {
  // return element.all(by.css('#uneditable-variables-section .variable-row')).count();
  return 0;
}

export function getNumberOfVariables(): number {
  // return element.all(by.css('#variables-section .variable-row')).count();
  return 0;
}

// export function getFinalExpressionTitle() {
//   return cy.get('#final-expression-section h2');
// }
//
// export function addVariable() {
//   return cy.get('#add-variable').click();
// }
//
// export function removeVariable(index: number) {
//   return element.all(by.css('.remove-variable')).get(index).click();
// }
//
// export function checkAddVariable(): Promise<boolean> {
//   const variablesBefore = await this.getNumberOfVariables();
//   await this.addVariable();
//   const variablesAfter = await this.getNumberOfVariables();
//
//   return Promise.resolve(variablesAfter - variablesBefore === 1);
// }
//
// export function checkRemoveLastVariable(): Promise<boolean> {
//   const variablesBefore = await this.getNumberOfVariables();
//   await this.removeVariable(variablesBefore - 1);
//   const variablesAfter = await this.getNumberOfVariables();
//
//   return Promise.resolve(variablesBefore - variablesAfter === 1);
// }
//
// export function setSimpleExpression(expression) {
//   return element(by.id('simple-expression')).sendKeys(expression);
// }
