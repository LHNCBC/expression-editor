describe(Cypress.env("appName"), () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Easy Path Expressions Help Modal Dialog', () => {
    describe('Easy Path Expressions Help from the Item Variables section', () => {
      it('should be able to select the Easy Path Expressions Help if the Easy Path Expression Var Type is selected', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('simple').should('have.value', 'simple');
          cy.get('#exp-help-button-1').should('exist').click();
          //cy.get('.modal-content').should('exist');
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').should('exist');
        });
      });

      it('should be able to browse through the Usable Operators section', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('simple').should('have.value', 'simple');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('#usableOperators>strong>a').should('exist').click();
          cy.get('#usableOperators>ul>li').should('exist').should('have.length', 17);

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
      });

      it('should be able to browse through the Usable Functions section', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('simple').should('have.value', 'simple');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('#usableFunctions>strong>a').should('exist').click();
          cy.get('#usableFunctions>ul>li').should('exist').should('have.length', 10);

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
              cy.get('p').eq(1).find('span')
                .should('contain', 'CEILING([expression]) where expression can be numbers, variable names, mathematical operators, and various functions');
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
      });

      it('should be able to close the modal dialog', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');
          cy.title().should('eq', Cypress.env("appName"));
          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('simple').should('have.value', 'simple');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('lhc-easy-path-expression-help-dialog .btn-close').should('exist').click();
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').should('not.exist');
        });
      });

      xit('should be able to close the modal dialog from the overlay', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('simple').should('have.value', 'simple');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').click(50, 50);
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').should('not.exist');
        });
      });
    });

    describe('Easy Path Expressions Help from the Output Expression section', () => {
      it('should be able to select the Easy Path Expressions Help from the Output Expression section', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.get('#exp-help-button-final').should('exist').click();
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').should('exist');
        });
      });   
    });
  });

  describe('FHIRPath Expressions Help Modal Dialog', () => {
    describe('FHIRPath Expressions Help from the Item Variables section', () => {
      it('should be able to select the FHIRPath Expressions Help if the FHIRPath Expression Var Type is selected', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('expression').should('have.value', 'expression');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('lhc-fhirpath-expression-help-dialog #fhirpath-help-base-dialog').should('exist');
        });
      });

      it('should be able to browse through the Dialog content', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('expression').should('have.value', 'expression');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('#links > ul > li').should('have.length', 2);
          cy.get('#links > ul > li').eq(0).find('a').should('have.text', 'FHIRPath ');
          cy.get('#links > ul > li').eq(1).find('a').should('have.text', 'FHIR extensions to FHIRPath ');
        });
      });
      
      it('should be able to close the modal dialog', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

        cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('expression').should('have.value', 'expression');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('lhc-fhirpath-expression-help-dialog .btn-close').should('exist').click();
          cy.get('lhc-fhirpath-expression-help-dialog #fhirpath-help-base-dialog').should('not.exist');
        });
      });

      xit('should be able to close the modal dialog from the overlay', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 2);
          cy.get('#variable-type-1 > option').should('have.length', 5);
          cy.get('#variable-type-1').select('expression').should('have.value', 'expression');
          cy.get('#exp-help-button-1').should('exist').click();
          cy.get('lhc-fhirpath-expression-help-dialog #fhirpath-help-base-dialog').click(50, 50);
          cy.get('lhc-easy-path-expression-help-dialog #easy-path-help-base-dialog').should('not.exist');
        });
      });
    });
    describe('FHIRPath Expressions Help from the Output Expression section', () => {
      it('should be able to select the FHIRPath Expressions Help from the Output Expression section', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.get('#output-expression-type').find('option:selected').should('have.text', 'FHIRPath Expression');
          cy.get('#exp-help-button-final').should('exist').click();
          cy.get('lhc-fhirpath-expression-help-dialog #fhirpath-help-base-dialog').should('exist');
        });
      });   
    });    
  });
});

