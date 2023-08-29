describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Easy Path Expressions Help Modal Dialog', () => {
    describe('Easy Path Expressions Help from the Item Variables section', () => {
      it('should be able to select the Easy Path Expressions Help if the Easy Path Expression Var Type is selected', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.get('#add-variable').click();
        cy.get('#variable-type-2').select('Easy Path Expression');
        cy.get('#easy-path-exp-help')
          .should('exist')
          .should('have.length', 1);
        cy.get('#easy-path-exp-help').click();
        cy.get('.modal-content').should('exist');
      });

      it('should be able to browse through the Variables section', () => {
	cy.get('#easy-path-exp-help').click();
        cy.get('#variables>strong>a').click();
        cy.get('#variables>ul>li')
          .should('exist')
          .should('have.length', 2);
        cy.get('#variables>ul>li').eq(0).should('contain', 'a');
        cy.get('#variables>ul>li').eq(1).should('contain', 'b');
      });

      it('should be able to browse through the Usable Operators section', () => {
        cy.get('#easy-path-exp-help').click();
        cy.get('#usableOperators>strong>a').click();
        cy.get('#usableOperators>ul>li')
          .should('exist')
          .should('have.length', 17);

        // Accessing the first operator in the list.
        cy.get('#usableOperators>ul>li')
          .eq(0)
          .within(() => {
            cy.get('a').should('contain', '+');
            cy.get('a').click();
            cy.get('div#operator-detail>p').should('have.length', 3);
            cy.get('div#operator-detail>p').eq(0).find('strong').should('contain', 'Description:');
            cy.get('div#operator-detail>p').eq(0).find('span').should('include.text', 'The Addition operator denoted by a plus symbol.');
            cy.get('div#operator-detail>p').eq(1).find('strong').should('contain', 'Usage:');
            cy.get('div#operator-detail>p').eq(1).find('span').should('contain', 'operand1 + operand2');
            cy.get('div#operator-detail>p').eq(2).find('strong').should('contain', 'Output:');
            cy.get('div#operator-detail>p').eq(2).find('span').should('contain', 'integer, number or string');
            cy.get('div#operator-detail>div>pre').should('have.length', 1);
            cy.get('div#operator-detail>div>strong').should('contain', 'Example:');
            cy.get('div#operator-detail>div>pre.help_example').eq(0).should('contain', '2 + 2 returns 4');
          });

        // Accessing the last operator in the list.
        cy.get('#usableOperators>ul>li')
          .eq(16)
          .within(() => {
            cy.get('a').should('contain', 'implies');
            cy.get('a').click();
            cy.get('p').should('have.length', 3);
            cy.get('p').eq(0).find('strong').should('contain', 'Description:');
            cy.get('p').eq(0).find('span').should('include.text', 'The implies boolean operator');
            cy.get('p').eq(1).find('strong').should('contain', 'Usage:');
            cy.get('p').eq(1).find('span').should('contain', 'operand1 implies operand2');
            cy.get('p').eq(2).find('strong').should('contain', 'Output:');
            cy.get('p').eq(2).find('span').should('contain', 'boolean');
            cy.get('div>pre').should('have.length', 1);
            cy.get('div>strong').should('contain', 'Example:');
            cy.get('div>pre.help_example').eq(0).should('contain', 'a implies b');
          });
      });

      it('should be able to browse through the Usable Functions section', () => {
        cy.get('#easy-path-exp-help').click();
        cy.get('#usableFunctions>strong>a').click();
        cy.get('#usableFunctions>ul>li')
          .should('exist')
          .should('have.length', 10);

        // Accessing the first function in the list
        cy.get('#usableFunctions>ul>li')
          .eq(0)
          .within(() => {
            cy.get('a.help_item').should('contain', 'CEILING()');
            cy.get('a.help_item').click();
            cy.get('p').should('have.length', 3);
            cy.get('p').eq(0).find('strong').should('contain', 'Description:');
            cy.get('p').eq(0).find('span').should('include.text', 'The CEILING function rounds up');
            cy.get('p').eq(1).find('strong').should('contain', 'Usage:');
            cy.get('p').eq(1).find('span').should('contain', 'CEILING([expression]) where expression can be numbers, variable names, mathematical operators, and various functions');
            cy.get('p').eq(2).find('strong').should('contain', 'Output:');
            cy.get('p').eq(2).find('span').should('contain', 'integer');
            cy.get('div>pre').should('have.length', 4);
            cy.get('div>strong').should('contain', 'Example:');
            cy.get('div>pre.help_example').eq(0).should('contain', 'CEILING(0.95) returns 1');
          });

        // Accessing the last function in the list
        cy.get('#usableFunctions>ul>li')
          .eq(9)
          .within(() => {
            // Accessing the last function
            cy.get('a.help_item').should('contain', 'LENGTH()');
            cy.get('a.help_item').click();
            cy.get('p').should('have.length', 3);
            cy.get('p').eq(0).find('strong').should('contain', 'Description:');
            cy.get('p').eq(0).find('span').should('include.text', 'The LENGTH function returns the length of the input string.');
            cy.get('p').eq(1).find('strong').should('contain', 'Usage:');
            cy.get('p').eq(1).find('span').should('contain', 'LENGTH([expression])');
            cy.get('p').eq(2).find('strong').should('contain', 'Output:');
            cy.get('p').eq(2).find('span').should('contain', 'integer');
            cy.get('div>pre').should('have.length', 1);
            cy.get('div>strong').should('contain', 'Example:');
            cy.get('div>pre.help_example').eq(0).should('contain', 'LENGTH(\'abc\') returns 3');
          });
      });

      it('should be able to close the modal dialog', () => {
        cy.get('#easy-path-exp-help').click();
        cy.get('.close').click();
      });

      it('should be able to close the modal dialog from the overlay', () => {
        cy.get('#easy-path-exp-help').click();
        cy.get('#easy-path-exp-help-overlay').click();
      });
    });

    describe('Easy Path Expressions Help from the Output Expression section', () => {
      it('should be able to select the Easy Path Expressions Help from the Output Expression section', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');
        cy.get('#easy-path-exp-help')
          .should('exist')
          .should('have.length', 1);
        cy.get('#easy-path-exp-help').click();
        cy.get('.modal-content').should('exist');
      });

      it('should be able to close the modal dialog', () => {
        cy.get('#easy-path-exp-help').click();
        cy.get('.close').click();
      });
    });

  });
});

