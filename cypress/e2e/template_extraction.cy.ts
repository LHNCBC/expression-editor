describe('SDC template extraction demo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#questionnaire-select').select('SDC Template Extraction');
    cy.get('#useRootLevel').should('be.checked');
    cy.get('#question').type('Patient Information');
    cy.get('span#completionOptions > ul > li').contains('patient').click();
    cy.get('#expression-entry > select').select('Template Extraction fullUrl');
    cy.get('#openExpressionEditor').click();
  });

  it('loads the contained Patient template and its allocated ID expression', () => {
    cy.get('lhc-expression-editor').shadow().within(() => {
      cy.get('#uneditable-variables-section .variable-column-label').then(labels => {
        const names = [...labels].map(label => label.textContent.trim());
        expect(names).to.include('NewPatientId');
      });

      cy.get('#uneditable-variables-section h2')
        .should('contain.text', 'Allocated ID Variables');

      cy.get('#final-expression')
        .should('have.value', '%NewPatientId')
        .and('not.have.class', 'field-error');
      cy.get('#final-expression-section #expression-error > p').should('not.exist');
    });
  });
});
