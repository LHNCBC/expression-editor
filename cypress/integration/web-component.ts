describe('Rule Editor Web Component', () => {
  beforeEach(() => {
    cy.visit('/web-component.html');
  });

  describe('score calculation', () => {
    it('should ask the user if they want to calculate the sum of scores.', () => {
      cy.contains('Would you like to calculate the sum of scores?');
    });

    it('should show the Rule Editor interface if the user clicks no.', () => {
      cy.get('#skip-export-score').click();

      cy.get('h1').contains('Test Rule Editor');
      cy.get('#export').contains('Test Submit');
    });

    it('should produce the calculation', () => {
      cy.get('#export-score').click();
      cy.get('#output').contains(
        '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
        'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
        'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"');
    });
  });
});
