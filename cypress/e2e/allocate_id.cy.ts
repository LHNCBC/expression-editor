describe('SDC extractAllocateId variables', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#questionnaire-select').select('SDC allocateId Scope');
    cy.get('#openExpressionEditor').click();
  });

  it('shows scoped allocated IDs and validates expressions that reference them', () => {
    cy.get('lhc-expression-editor').shadow().within(() => {
      cy.get('#uneditable-variables-section .variable-column-label').then(labels => {
        const names = [...labels].map(label => label.textContent.trim());
        expect(names).to.include.members([
          'newQuestionnaireUuid',
          'newPatientUuid',
          'newObservationUuid'
        ]);
        expect(names).not.to.include('newEncounterUuid');
      });

      cy.get('#uneditable-variables-section h2')
        .should('contain.text', 'Allocated ID Variables');

      cy.get('#final-expression')
        .should('contain.value', '%newQuestionnaireUuid')
        .and('contain.value', '%newPatientUuid')
        .and('contain.value', '%newObservationUuid')
        .and('not.have.class', 'field-error');
      cy.get('#final-expression-section #expression-error > p').should('not.exist');
    });
  });
});
