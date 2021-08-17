describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {
      it('should display the editor', () => {
        cy.get('lhc-rule-editor h1').should('have.text', 'Test Rule Editor');
        cy.get('#uneditable-variables-section .variable-row').should('have.length', 0)
        cy.get('#variables-section h2').should('have.text', 'Variables');
      });
    });
  });
});
