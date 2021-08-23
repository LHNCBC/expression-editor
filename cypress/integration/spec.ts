describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('Query support', () => {
      it('should display the query editor', () => {
        // Check the demo questionnaire load
        cy.get('label > select').select('Query');
        cy.contains('FHIR Query Observation');
        cy.contains('Appetite sleep chg notes DI-PAD - 65972-2');
        cy.get('.time-input > .ng-untouched').should('have.value', '7');
        cy.get('.time-select > .ng-untouched').should('have.value', 'days');
        cy.contains('Observation?code=http://loinc.org|65972-2&date=gt{{today()-7 days}}&subject={{%subject.id}}');

        // Add a new code
        cy.get('#autocomplete-2').type('weight');
        cy.contains('29463-7').click();
        cy.contains('Weight - 29463-7');
        cy.contains('Observation?code=http://loinc.org|65972-2%2Chttp://loinc.org|29463-7&date=gt{{today()-7 days}}&subject={{%subject.id}}');

        // Remove first code
        cy.get(':nth-child(1) > button > span').click();
        cy.contains('Observation?code=http://loinc.org|29463-7&date=gt{{today()-7 days}}&subject={{%subject.id}}');
      });
    });
  });
});
