describe('Rule editor demo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('upload', () => {
    it('should not show a Rule Editor before uploading a questionnaire', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('lhc-rule-editor').should('not.exist');
    });

    it('should successfully upload a JSON file', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('bmi.json');

      cy.get('lhc-rule-editor h1').contains('Rule Editor');

      cy.get('#final-expression').should('not.exist');

      // Updating the linkId should update the Rule Editor instantly
      cy.get('#question').type('bmi');
      cy.contains('39156-5').click();

      cy.get('#final-expression').should('have.value', '(%a/(%b.power(2))).round(1)');

      cy.get('#expression-entry > select').select('2');
      cy.get('#expression-type').find(':selected').contains('Computed continuously');

      cy.get('#export').click();
      cy.get('#output').contains('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression');
      cy.get('#expression-type').select('Only computed when the form loads');
      cy.get('#export').click();
      cy.get('#output').contains('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression');
    });
  });
});
