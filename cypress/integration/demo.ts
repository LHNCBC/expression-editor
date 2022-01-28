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
      cy.get('select#link-id').select('/39156-5');
      cy.get('#final-expression').should('have.value', '(%a/(%b.power(2))).round(1)');
    });
  });
});
