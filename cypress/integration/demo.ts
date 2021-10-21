describe('Rule editor demo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('upload', () => {
    it('should accept a file upload', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('lhc-rule-editor').should('not.exist');
    });

    it('should successfully upload a JSON file', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('bmi.json');

      cy.get('lhc-rule-editor h1').contains('Rule Editor');
      cy.get('#final-expression').should('have.value', '(%a/(%b.power(2))).round(1)');

      // Updating the linkId should update the Rule Editor instantly
      cy.get('#link-id').type('a');
      cy.get('#final-expression').should('not.exist');
    });
  });
});
