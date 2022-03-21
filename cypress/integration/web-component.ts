describe('Rule Editor Web Component', () => {
  beforeEach(() => {
    cy.visit('/web-component.html');
  });

  describe('score calculation', () => {
    it('should ask the user if they want to calculate the sum of scores.', () => {
      cy.contains('Would you like to calculate the sum of scores?');
    });

    it('should show the Rule Editor interface if the user clicks no.', () => {
      cy.get('#skip-export-score').click();

      cy.get('h1').contains('Test Rule Editor');
      cy.get('#export').contains('Test Submit');
    });
  });
});
