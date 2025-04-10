describe(Cypress.env("appName"), () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {

      it('should display the dialog when switching from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'FHIRPath Expression' variable type
          cy.get('#variable-type-2').select('expression');
          cy.get('#variable-expression-2')
            .should('exist')
            .should('be.visible')
            .type('%a');

          // Change to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('exist').scrollIntoView().should('be.visible');
        });
      });

      it('should not display the dialog when switching from FHIRPath Expression to Easy Path Expression and expression is blank', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'FHIRPath Expression' variable type
          cy.get('#variable-type-2').select('expression');
          cy.get('#variable-expression-2')
            .should('exist')
            .should('be.visible');

          // Change to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');
        });
      });

      it('should not display the dialog when switching from FHIRPath Expression to other variable type', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'FHIRPath Expression' variable type
          cy.get('#variable-type-2').select('expression');
          cy.get('#variable-expression-2')
            .should('exist')
            .should('be.visible')
            .type('%a');

          // Change to FHIR Query variable type
          cy.get('#variable-type-2').select('query');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Switch back to 'FHIRPath Expression'
          cy.get('#variable-type-2').select('expression');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Change to FHIR Query (Observation) variable type
          cy.get('#variable-type-2').select('queryObservation');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Switch back to 'FHIRPath Expression'
          cy.get('#variable-type-2').select('expression');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Change to FHIR Query (Observation) variable type
          cy.get('#variable-type-2').select('queryObservation');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Switch back to 'FHIRPath Expression'
          cy.get('#variable-type-2').select('expression');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // Change to Question variable type
          cy.get('#variable-type-2').select('question');

          // Dialog should not be displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');
        });
      });

      it('should be able to cancel switching from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'FHIRPath Expression' variable type
          cy.get('#variable-type-2').select('expression');
          cy.get('#variable-expression-2')
            .should('exist')
            .should('be.visible')
            .type('%a');

          // Change to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'No' to not convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#no-button').should('exist').click();
            });
  
          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // B/c the change in variable type is cancelled.  The variable type should
          // revert back to 'expression'.  And the expression should be %a
          cy.get('#variable-type-2').should('have.value', 'expression');
          cy.get('#variable-expression-2').should('have.value', '%a');
        });
      });

      it('should be able to switch from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'FHIRPath Expression' variable type
          cy.get('#variable-type-2').select('expression');
          cy.get('#variable-expression-2')
            .should('exist')
            .should('be.visible')
            .type('%a');

          // Change to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'Yes' to convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#yes-button').should('exist').click();
            });
    
          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // B/c the change in variable type is commited.  The variable type should
          // change to 'simple'.  And the expression should be blank
          cy.get('#variable-type-2').should('have.value', 'simple');
          cy.get('#simple-expression-2').should('exist').should('be.empty');
        });
      });

      it('should not display the dialog where the Easy Path Expression is available and there is no change', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');
          cy.get('#simple-expression-2')
            .should('exist')
            .should('be.visible')
            .type('a');

          // Change to Easy Path Expression variable type
          cy.get('#variable-type-2').select('expression');
    
          // The dialog should not show
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');
          
          // B/c the change in variable type is commited.  The variable type should
          // change to 'expression'.  And the expression should get converted to
          // FHIRPath Expression
          cy.get('#variable-type-2').should('have.value', 'expression');
          cy.get('#variable-expression-2').should('exist').should('have.value', '%a');

          // Change it back to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // The dialog should not show
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // In this scenario, the Easy Path expression was available, and there was no
          // change, so the expression is showing 'a'
          cy.get('#variable-type-2').should('have.value', 'simple');
          cy.get('#simple-expression-2').should('exist').should('have.value', 'a');
        });      
      });
      
      it('should display the dialog where the Easy Path Expression is available and there is change', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');
          cy.get('#simple-expression-2')
            .should('exist')
            .should('be.visible')
            .type('a');

          // Change to Easy Path Expression variable type
          cy.get('#variable-type-2').select('expression');
  
          // The dialog should not show
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('not.exist');

          // B/c the change in variable type is commited.  The variable type should
          // change to 'expression'.  And the expression should get converted to
          // FHIRPath Expression
          cy.get('#variable-type-2').should('have.value', 'expression');
          cy.get('#variable-expression-2').should('exist').should('have.value', '%a');
 
          // Change expression to %b
          cy.get('#variable-expression-2').clear().type('%b');

          // Change it back to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'Yes' to convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#yes-button').should('exist').click();
            });

          cy.get('#variable-type-2').should('have.value', 'simple');
          cy.get('#simple-expression-2').should('exist').should('be.empty');
        }); 
      });

      it('should see errors higlight in red if "Not valid" is returned from transform', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

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

          // Add a variable
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 3);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-2').select('simple');

          // The expression textbox should be highlighed in red
          cy.get('#simple-expression-2')
          .should('exist')
          .should('be.visible')
          .should('not.have.class', 'field-error');

          // Type 'a' into the expression, there should be no error
          cy.get('#simple-expression-2').type('a')
            .should('not.have.class', 'field-error');

          // The 'Save' button should be enabled.
          cy.get('#export').should('not.have.class', 'disabled');

          // Update the expression with '+ bbbbb' which doesn't exist, the error should reappear
          cy.get('#simple-expression-2').clear().type('a + bbbbb').should('have.class', 'field-error');

          // The 'Save' button should be disabled.
          cy.get('#export').should('have.class', 'disabled');
        });
      });
    });

    describe('BMI calculation (with cases) Output Expression section', () => {
      it('should display dialog when switching from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmicase.json').as('bmicase');
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.wait('@bmicase');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to 'FHIRPath Expression'
            cy.get('#output-expression-type').should('exist').should('have.value', 'fhirpath');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");

            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple');
          });

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog')
            .should('exist').scrollIntoView().should('be.visible');
        });
      });

      it('should be able to cancel switching from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmicase.json').as('bmicase');
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.wait('@bmicase');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple');
          });

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'No' to not convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#no-button').should('exist').click();
            });

          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('not.exist');

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // B/c the change in variable type is cancelled.  The variable type should
            // revert back to 'expression'.  And the expression should be %a
            cy.get('#output-expression-type').should('have.value', 'fhirpath');
            
            // There should still be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");
          });
        });
      });

      it('should be able to switch from FHIRPath Expression to Easy Path Expression', () => {
        cy.intercept('/bmicase.json').as('bmicase');
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.wait('@bmicase');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple');
          });
          
          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog')
            .should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'Yes' to convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#yes-button').should('exist').click();
            });

          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog')
            .should('not.exist');

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // B/c the change in variable type is commited.  The variable type should
            // change to 'simple'.  And the expression should be blank
            cy.get('#output-expression-type').should('have.value', 'simple');
            
            // There should still be 3 case statements. But the cases/expressions might be blank.
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('be.empty');
            cy.get('#case-output-0').should('be.empty');
            cy.get('#case-condition-1').should('be.empty');
            cy.get('#case-output-1').should('be.empty');
            cy.get('#case-condition-2').should('be.empty');
            cy.get('#case-output-2').should('be.empty');

            // The output value textbox should be blank.
            cy.get('div.case-row > div.case-output-column > label > input').should('be.empty');
          });
        });
      });

      it('should be able view Help Dialog in the Output Expression Case', () => {
        cy.intercept('/bmicase.json').as('bmicase');
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.wait('@bmicase');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to 'FHIRPath Expression'
            cy.get('#output-expression-type').should('exist').should('have.value', 'fhirpath');

            // Select Easy Path Expression variable type
            cy.get('#output-expression-type').select('simple');
          });

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'Yes' to convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#yes-button').should('exist').click();
            });

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // Easy Path Expression help should exist
            cy.get('lhc-helps').should('exist');
          });
        });
      });
    });

    describe('BMI calculation (Easy Path expression with cases) Output Expression section', () => {
      it('should be able to switch from Easy Path Expression to FHIRPath Expression and back', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to Easy Path Expression
            cy.get('#output-expression-type').should('exist').should('have.value', 'simple');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // Select 'FHIRPath Expression' option
            cy.get('#output-expression-type').select('fhirpath', {'force': true});
            cy.get('#output-expression-type').should('have.value', 'fhirpath');

            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");

            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple', {'force': true});
            cy.get('#output-expression-type').should('have.value', 'simple');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");
          });
        });
      });

      it('should see the dialog since there is change to the expression and cancel change', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to Easy Path Expression
            cy.get('#output-expression-type').should('exist').should('have.value', 'simple');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // Select 'FHIRPath Expression' option
            cy.get('#output-expression-type').select('fhirpath', {'force': true});
            cy.get('#output-expression-type').should('have.value', 'fhirpath');
            
            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");

            // Change the expression
            cy.get('#case-output-0').clear().type("'underweight22'");

            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple', {'force': true});
          });

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'No' to not convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#no-button').should('exist').click();
            });

          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('not.exist');

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // The variable type should stayed as 'FHIRPath Expression'
            cy.get('#output-expression-type').should('have.value', 'fhirpath', {'force': true});

            // There should be 3 case statements
            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight22'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");
          });
        });
      });

      it('should see the dialog since there is change to the expression and proceeds with change', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to Easy Path Expression
            cy.get('#output-expression-type').should('exist').should('have.value', 'simple');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // Select 'FHIRPath Expression' option
            cy.get('#output-expression-type').select('fhirpath', {'force': true});
            cy.get('#output-expression-type').should('have.value', 'fhirpath');
            
            //cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
            cy.get('#case-output-0').should('have.value', "'underweight'");
            cy.get('#case-condition-1').should('have.value', '%bmi<25');
            cy.get('#case-output-1').should('have.value', "'normal'");
            cy.get('#case-condition-2').should('have.value', '%bmi<30');
            cy.get('#case-output-2').should('have.value', "'overweight'");

            // The output value textbox should be 'obese'.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "'obese'");

            // Change the expression
            cy.get('#case-output-0').clear().type("'underweight22'");

            // Select 'Easy Path Expression' option
            cy.get('#output-expression-type').select('simple', {'force': true});
          });

          // Dialog should get displayed
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('exist')
            .scrollIntoView()
            .should('be.visible')
            .within( ()=> {
              // Select 'Yes' to convert from 'FHIRPath Expression' to 'Easy Path Expression'
              cy.get('#yes-button').should('exist').click();
            });

          // The dialog should now disappeared
          cy.get('lhc-fhirpath-easypath-conversion-confirmation-dialog #expression-conversion-base-dialog').should('not.exist');

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // The variable type should stayed as Easy Path Expression
            cy.get('#output-expression-type').should('have.value', 'simple');

            // There should still be 3 case statements. But the cases/expressions might be blank.
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('be.empty');
            cy.get('#case-output-0').should('be.empty');
            cy.get('#case-condition-1').should('be.empty');
            cy.get('#case-output-1').should('be.empty');
            cy.get('#case-condition-2').should('be.empty');
            cy.get('#case-output-2').should('be.empty');

            // The output value textbox should be blank.
            cy.get('div.case-row > div.case-output-column > label > input').should('be.empty');
          });
        });
      });

      it('should see errors higlight in red if "Not valid" is returned from transform', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // The 'FHIRPath Expression' output
            cy.get('div.syntax-preview > div > pre').should('contain.text', 
              "iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))");

            // Case Output 0, 1 and 2 should not have css class error
            cy.get('#case-output-0').should('not.have.class', 'field-error');
            cy.get('#case-output-1').should('not.have.class', 'field-error');
            cy.get('#case-output-2').should('not.have.class', 'field-error');
            
            // The output value textbox should not have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('not.have.class', 'field-error');

            // The FHIRPath output should not have css class error
            cy.get('div.syntax-preview > div > pre').should('not.have.class', 'fhirpath-error');
          });

          // The 'Save' button should be enabled.
          cy.get('#export').should('not.have.class', 'disabled');

          // Output Expression section
          cy.get('#final-expression-section').within(() => {

            // Check the 'Use expressions' checkbox
            cy.get('#output-expressions').check();

            // Case Output 0, 1 and 2 should have css class error
            cy.get('#case-output-0').should('have.class', 'field-error');
            cy.get('#case-output-1').should('have.class', 'field-error');
            cy.get('#case-output-2').should('have.class', 'field-error');
            
            // The output value textbox should have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('have.class', 'field-error');
          });

          // The 'Save' button should be disabled.
          cy.get('#export').should('have.class', 'disabled');
        });
      });

      it('should be able to fix the "Not valid" issue by fixing highlight texts', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

        cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // The 'FHIRPath Expression' output should be 
            // iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))
            cy.get('div.syntax-preview > div > pre').should('contain.text', 
              "iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))");

            // Case Output 0, 1 and 2 should not have css class error
            cy.get('#case-output-0').should('not.have.class', 'field-error');
            cy.get('#case-output-1').should('not.have.class', 'field-error');
            cy.get('#case-output-2').should('not.have.class', 'field-error');
            
            // The output value textbox should not have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('not.have.class', 'field-error');

            // The FHIRPath output should not have css class error
            cy.get('div.syntax-preview > div > pre').should('not.have.class', 'fhirpath-error');

            // Check the 'Use expressions' checkbox
            cy.get('#output-expressions').check();

            // Case Output 0, 1 and 2 should have css class error
            cy.get('#case-output-0').should('have.class', 'field-error');
            cy.get('#case-output-1').should('have.class', 'field-error');
            cy.get('#case-output-2').should('have.class', 'field-error');
            
            // The output value textbox should have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('have.class', 'field-error');

            // Fix the issue by wrapping the Case Outputs and the Output variable with single quotes.
            cy.get('#case-output-0').clear().type("'underweight'");
            cy.get('#case-output-1').clear().type("'normal'");
            cy.get('#case-output-2').clear().type("'overweight'");
            
            // The output value textbox should have css class error
            cy.get('div.case-row > div.case-output-column > label > input').clear().type("'obese'");

            // Case Output 0, 1 and 2 should now not have css class error
            cy.get('#case-output-0').should('not.have.class', 'field-error');
            cy.get('#case-output-1').should('not.have.class', 'field-error');
            cy.get('#case-output-2').should('not.have.class', 'field-error');
          
            // The output value textbox should now not have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('not.have.class', 'field-error');

            // The FHIRPath output should now not have css class error
            cy.get('div.syntax-preview > div > pre').should('not.have.class', 'fhirpath-error');
          });
        });
      });

      it('should be able to fix the "Not valid" issue by adding variables', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // There should be 3 case statements
            cy.get('#cdk-drop-list-1 > div').should('have.length', 3);
            cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
            cy.get('#case-output-0').should('have.value', "underweight");
            cy.get('#case-condition-1').should('have.value', 'bmi<25');
            cy.get('#case-output-1').should('have.value', "normal");
            cy.get('#case-condition-2').should('have.value', 'bmi<30');
            cy.get('#case-output-2').should('have.value', "overweight");

            // The output value textbox should be obese.
            cy.get('div.case-row > div.case-output-column > label > input').should('have.value', "obese");

            // The 'FHIRPath Expression' output should be 
            // iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))
            cy.get('div.syntax-preview > div > pre').should('contain.text', 
              "iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))");

            // Case Output 0, 1 and 2 should not have css class error
            cy.get('#case-output-0').should('not.have.class', 'field-error');
            cy.get('#case-output-1').should('not.have.class', 'field-error');
            cy.get('#case-output-2').should('not.have.class', 'field-error');
            
            // The output value textbox should not have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('not.have.class', 'field-error');

            // The FHIRPath output should not have css class error
            cy.get('div.syntax-preview > div > pre').should('not.have.class', 'fhirpath-error');

            // Check the 'Use expressions' checkbox
            cy.get('#output-expressions').check();

            // Case Output 0, 1 and 2 should have css class error
            cy.get('#case-output-0').should('have.class', 'field-error');
            cy.get('#case-output-1').should('have.class', 'field-error');
            cy.get('#case-output-2').should('have.class', 'field-error');
            
            // The output value textbox should have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('have.class', 'field-error');
          });

          // Fix the issue by adding 4 variables to hold the text, this is not neccessary a 
          // better solution than solution 1, but to show that it can be done this way as well.
          // Add a variable with value text 'underweight'
          cy.get('#add-variable').should('exist').scrollIntoView().should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 4);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-3').select('simple');
          cy.get('#simple-expression-3')
            .should('exist')
            .should('be.visible')
            .type("'underweight'");

          // Add a variable with value text 'normal'
          cy.get('#add-variable').should('exist').should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 5);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-4').select('simple');
          cy.get('#simple-expression-4')
            .should('exist')
            .should('be.visible')
            .type("'normal'");

          // Add a variable with value text 'overweight'
          cy.get('#add-variable').should('exist').should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 6);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-5').select('simple');
          cy.get('#simple-expression-5')
            .should('exist')
            .should('be.visible')
            .type("'overweight'");         

          // Add a variable with value text 'obese'
          cy.get('#add-variable').should('exist').should('be.visible').click();
          cy.get('#variables-section .variable-row').should('have.length', 7);

          // Set to 'Easy Path Expression' variable type
          cy.get('#variable-type-6').select('simple');
          cy.get('#simple-expression-6')
            .should('exist')
            .should('be.visible')
            .type("'obese'");

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            // Now update the case outputs by replacing the expressions with newly created variables
            cy.get('#case-output-0').clear().type("a");
            cy.get('#case-output-1').clear().type("b");
            cy.get('#case-output-2').clear().type("c");
            
            // Now update the output value by replacing the expressions with newly created variable
            cy.get('div.case-row > div.case-output-column > label > input').clear().type("d");

            // Case Output 0, 1 and 2 should now not have css class error
            cy.get('#case-output-0').should('not.have.class', 'field-error');
            cy.get('#case-output-1').should('not.have.class', 'field-error');
            cy.get('#case-output-2').should('not.have.class', 'field-error');
            
            // The output value textbox should now not have css class error
            cy.get('div.case-row > div.case-output-column > label > input').should('not.have.class', 'field-error');

            // The FHIRPath output should now not have css class error
            cy.get('div.syntax-preview > div > pre').should('not.have.class', 'fhirpath-error');
          });
        });
      });

      it('should be able view Help Dialog in the Output Expression Case', () => {
        cy.intercept('/bmicasesimple.json').as('bmicasesimple');
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.wait('@bmicasesimple');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');

          cy.title().should('eq', Cypress.env("appName"));

          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('h2').should('contain', 'Output Expression');

            // The case statement checkbox should be checked
            cy.get('#case-statements').should('exist').should('be.checked');

            // The variable type should default to 'Easy Path Expression'
            cy.get('#output-expression-type').should('exist').should('have.value', 'simple');

            // Easy Path Expression help should exist
            cy.get('lhc-helps').should('exist');

            // Select Easy Path Expression variable type
            cy.get('#output-expression-type').select('fhirpath', {'force': true});

            // FHIRPath Expression help should exist
            cy.get('lhc-helps').should('exist');
          });
        });
      });
    });

    describe('export', () => {
      it('should the output expression contain the simple-task extension for output type Easy Path expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');
  
        // The demo has '(/39156-5) selected by default
        cy.get('#question').should('contain.value', '(/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
  
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');
  
          // Should have two variables
          cy.get('#variables-section .variable-row').should('have.length', 2);
  
          // The variable type should default to Easy Path Expression
          cy.get('#output-expression-type').should('exist').should('have.value', 'simple');
  
          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('#simple-expression-final').should('contain.value', 'a/b^2');
            cy.get('lhc-syntax-preview pre').should('contain.text', '%a/%b.power(2)');
          });
  
          // Click Save
          cy.get('#export').click();
        });
  
        // The Expression Editor dialog should be closed
        cy.get('lhc-expression-editor').should('not.exist', {timeout: 10000});

        // Checking the output, it should have the new variable created under the 
        cy.get('pre#output').should('not.be.empty').invoke('text').then((jsonData) => {
          // Parse the JSON data
          const parsedData = JSON.parse(jsonData);
  
          expect(parsedData.item).to.exist;
          expect(parsedData.item).to.have.lengthOf(5);
          expect(parsedData.item[3].linkId).to.exist;
          expect(parsedData.item[3].linkId).to.have.string('/39156-5');
          expect(parsedData.item[3].extension).to.exist;
          expect(parsedData.item[3].extension).to.have.lengthOf(4);
          expect(parsedData.item[3].extension[3].url)
                  .to.have.string('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression');
          expect(parsedData.item[3].extension[3].valueExpression).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.expression).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.expression).to.have.string('%a/%b.power(2)');
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].url).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].url)
                  .to.have.string('http://lhcforms.nlm.nih.gov/fhirExt/simple-syntax')
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.have.string('a/b^2');
        });
      });

      it('should remove the simple-task extension from the output expression when switching to output type FHIRPath expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');
  
        // The demo has '(/39156-5) selected by default
        cy.get('#question').should('contain.value', '(/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
  
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor').shadow().within(() => {
          cy.get('#expression-editor-base-dialog').should('exist');
  
          // Should have two variables
          cy.get('#variables-section .variable-row').should('have.length', 2);
  
          // The variable type should default to Easy Path Expression
          cy.get('#output-expression-type').should('exist').should('have.value', 'simple');
  
          // Output Expression section
          cy.get('#final-expression-section').within(() => {
            cy.get('#simple-expression-final').should('contain.value', 'a/b^2');
            cy.get('lhc-syntax-preview pre').should('contain.text', '%a/%b.power(2)');
          });
  
          // Select FHIRPath Expression variable type
          cy.get('#output-expression-type').select('fhirpath');
          cy.get('#final-expression').should('have.value', '%a/%b.power(2)');

          // Click Save
          cy.get('#export').click();
        });
    
        // The Expression Editor dialog should be closed
        cy.get('lhc-expression-editor').should('not.exist', {timeout: 10000});

        // Checking the output, it should have the new variable created under the 
        cy.get('pre#output').should('not.be.empty').invoke('text').then((jsonData) => {
          // Parse the JSON data
          const parsedData = JSON.parse(jsonData);
  
          expect(parsedData.item).to.exist;
          expect(parsedData.item).to.have.lengthOf(5);
          expect(parsedData.item[3].linkId).to.exist;
          expect(parsedData.item[3].linkId).to.have.string('/39156-5');
          expect(parsedData.item[3].extension).to.exist;
          expect(parsedData.item[3].extension).to.have.lengthOf(4);
          expect(parsedData.item[3].extension[3].url)
                  .to.have.string('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression');
          expect(parsedData.item[3].extension[3].valueExpression).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.expression).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.expression).to.have.string('%a/%b.power(2)');
          expect(parsedData.item[3].extension[3].valueExpression.extension).not.to.exist;     
        });
      });      
    });
  });
});