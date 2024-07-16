
describe('Expression editor', () => {

  describe('Angular Library', () => {
    describe('Query', () => {
      
      it('should display all sections', () => {
        cy.visit('/');

        cy.get('#questionnaire-select').select('Query');

        cy.title().should('eq', 'Expression Editor');

        cy.get('#question').should('exist').should('be.visible')
          .should('have.value', 'View selected list (fetched from FHIR context) (/39156-5)');

        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();

        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor #expression-editor-base-dialog').should('exist');

        cy.get('#title-section').should('exist');
        cy.get('#uneditable-variables-section').should('exist');
        cy.get('#variables-section').should('exist');
        cy.get('#final-expression-section').should('exist');

      });

      it('should hide the title section', () => {
        cy.intercept('/?hide=titleSection').as('query1');
        cy.visit('/?hide=titleSection');
        cy.wait('@query1');

        cy.get('#questionnaire-select').select('Query');

        cy.title().should('eq', 'Expression Editor');

        cy.get('#question').should('exist').should('be.visible')
          .should('have.value', 'View selected list (fetched from FHIR context) (/39156-5)');

        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();

        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor #expression-editor-base-dialog').should('exist');

        cy.get('#title-section').should('not.exist');
        cy.get('#uneditable-variables-section').should('exist');
        cy.get('#variables-section').should('exist');
        cy.get('#final-expression-section').should('exist');
      });

      it('should hide the Uneditable Variables and Item Variables sections', () => {
        cy.intercept('/?hide=uneditableVariablesSection,itemVariablesSection').as('query1');
        cy.visit('/?hide=uneditableVariablesSection,itemVariablesSection');
        cy.wait('@query1');

        cy.get('#questionnaire-select').select('Query');
        cy.title().should('eq', 'Expression Editor');

        cy.get('#question').should('exist').should('be.visible')
          .should('have.value', 'View selected list (fetched from FHIR context) (/39156-5)');

        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();

        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor #expression-editor-base-dialog').should('exist');

        cy.get('#title-section').should('exist');
        cy.get('#uneditable-variables-section').should('not.exist');
        cy.get('#variables-section').should('not.exist');
        cy.get('#final-expression-section').should('exist');
      });

      it('should hide the Output Expression section', () => {
        cy.intercept('/?hide=outputExpressionSection').as('query1');
        cy.visit('/?hide=outputExpressionSection');
        cy.wait('@query1');

        cy.get('#questionnaire-select').select('Query');
        cy.title().should('eq', 'Expression Editor');

        cy.get('#question').should('exist').should('be.visible')
          .should('have.value', 'View selected list (fetched from FHIR context) (/39156-5)');

        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();

        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor #expression-editor-base-dialog').should('exist');

        cy.get('#title-section').should('exist');
        cy.get('#uneditable-variables-section').should('exist');
        cy.get('#variables-section').should('exist');
        cy.get('#final-expression-section').should('not.exist');
      });
    });
  });
});