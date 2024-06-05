describe('Rule Editor Web Component', () => {

  describe('score calculation', () => {
    beforeEach(() => {
      cy.visit('/web-component.html');
    });

    it('should ask the user if they want to calculate the sum of scores.', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to select items for the sum of scores?');
    });

    it('should show the Rule Editor interface if the user clicks no.', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to select items for the sum of scores?');
      cy.get('#skip-score-items-selection').click();

      cy.get('h1').should('contain.text', 'Test Rule Editor');
      cy.get('#export').should('contain.text', 'Test Submit');
    });

    it('should produce the calculation', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to select items for the sum of scores?');
      cy.get('#score-items-selection').click();

      cy.get('lhc-select-scoring-items > lhc-base-dialog').should('exist').should('be.visible');
      cy.get('#selectAll').should('exist').click();
      cy.get('#export-score').click();

      cy.get('#output').should('contain.text', 
        '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
        'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
        'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"');
    });
  });

  describe('Rule Editor sections', () => {
    it('should display all sections', () => {
      cy.intercept('/web-component-sections.html').as('query1');
      cy.visit('/web-component-sections.html');
      cy.wait('@query1');

      // The Rule Editor dialog should now appear
      cy.get('lhc-rule-editor #rule-editor-base-dialog').should('exist');

      cy.get('#title-section').should('exist');
      cy.get('#uneditable-variables-section').should('exist');
      cy.get('#variables-section').should('exist');
      cy.get('#final-expression-section').should('exist');

    });

    it('should hide the title section', () => {
      cy.intercept('/web-component-sections.html?hide=titleSection').as('query1');
      cy.visit('/web-component-sections.html?hide=titleSection');
      cy.wait('@query1');

      // The Rule Editor dialog should now appear
      cy.get('lhc-rule-editor #rule-editor-base-dialog').should('exist');

      cy.get('#title-section').should('not.exist');
      cy.get('#uneditable-variables-section').should('exist');
      cy.get('#variables-section').should('exist');
      cy.get('#final-expression-section').should('exist');

    });

    it('should hide the Uneditable Variables and Item Variables sections', () => {
      cy.intercept('/web-component-sections.html?hide=uneditableVariablesSection,itemVariablesSection').as('query1');
      cy.visit('/web-component-sections.html?hide=uneditableVariablesSection,itemVariablesSection');
      cy.wait('@query1');

      // The Rule Editor dialog should now appear
      cy.get('lhc-rule-editor #rule-editor-base-dialog').should('exist');

      cy.get('#title-section').should('exist');
      cy.get('#uneditable-variables-section').should('not.exist');
      cy.get('#variables-section').should('not.exist');
      cy.get('#final-expression-section').should('exist');

    });

    it('should hide the Output Expression section', () => {
      cy.intercept('/web-component-sections.html?hide=outputExpressionSection').as('query1');
      cy.visit('/web-component-sections.html?hide=outputExpressionSection');
      cy.wait('@query1');

      // The Rule Editor dialog should now appear
      cy.get('lhc-rule-editor #rule-editor-base-dialog').should('exist');

      cy.get('#title-section').should('exist');
      cy.get('#uneditable-variables-section').should('exist');
      cy.get('#variables-section').should('exist');
      cy.get('#final-expression-section').should('not.exist');

    });
  });
});
