describe('Rule Editor Web Component', () => {
  beforeEach(() => {
    cy.visit('/web-component.html');
  });

  describe('score calculation', () => {
    it('should ask the user if they want to calculate the sum of scores.', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to calculate the sum of scores?');
    });

    it('should show the Rule Editor interface if the user clicks no.', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to calculate the sum of scores?');
      cy.get('#skip-score-items-selection').click();

      cy.get('h1').should('contain.text', 'Test Rule Editor');
      cy.get('#export').should('contain.text', 'Test Submit');
    });

    it('should produce the calculation', () => {
      cy.get('.score-modal').should('contain.text', 'Would you like to calculate the sum of scores?');
      cy.get('#score-items-selection').click();

      cy.get('lhc-select-scoring-items > lhc-base-dialog').should('exist').should('be.visible');
      cy.get('#selectAll').should('exist').click();
      cy.get('#export-score').click();

      // Show the Rule Editor 
      cy.get('lhc-rule-editor > lhc-base-dialog').should('exist')
      // Variables section
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 10);

      // Click Save
      cy.get('#export').click();

      cy.get('#output').should('contain.text', 
        '"expression": "iif(%any_questions_answered,iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
        'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
        'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0),{})"');
    });
  });
});
