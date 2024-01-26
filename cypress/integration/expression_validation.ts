describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('Upload', () => {
      it('should the "Save" button be disabled if the output expression is empty', () => {
        cy.get('select#questionnaire-select').select('Upload your own questionnaire');
  
        cy.get('#file-upload').attachFile('bmi.json');

        // Updating the linkId should update the Rule Editor instantly
        cy.get('#question').type('bmi');
        cy.get('span#completionOptions > ul > li').contains('39156-5').click();

        // The 'Output Expression' should be default to 'Calculated Expression' 
        cy.get('#expression-entry > select').should('have.value', '1');       

        // Check the 'Advanced Interface' checkbox
        cy.get('#advanced-interface').should('be.checked');

        // The 'Output Expression' section should be visible
        cy.get('#final-expression-section').should('exist').should('be.visible');

        // By default, the Output Expression Type is set to 'FHIRPath Expression' and the expression has value
        cy.get('#variable-type-final').find('option:selected').should('have.text', 'FHIRPath Expression');
        cy.get('#final-expression').should('have.value', '(%a/(%b.power(2))).round(1)');

        // The 'Save' button should now be enabled
        cy.get('#export').should('not.have.class', 'disabled');

        // Set the expression to blank
        cy.get('#final-expression').clear();

        // The Output Expression should be highlighted in red and th error is displayed
        cy.get('#final-expression').should('have.class', 'field-error');
        cy.get('#final-expression-section #expression-error > p')
          .should('contain.text', 'Expression is required.')     
        // The 'Save' button should be disabled
        cy.get('#export').should('have.class', 'disabled');

        // Change the output expression type to 'Easy Path Expression'
        cy.get('#variable-type-final').select('simple');
        // The Output Expression should still be highlighted in red and contain an error
        cy.get('#simple-expression-final').should('have.class', 'field-error');
        cy.get('#final-expression-section lhc-syntax-preview > div > div > pre')
          .should('contain.text', 'Expression is required.')

        // Type in the expression
        cy.get('#simple-expression-final').type('1');
        // The error should disappear
        cy.get('#simple-expression-final').should('not.have.class', 'field-error');
        cy.get('#final-expression-section lhc-syntax-preview > div > div > pre')
          .should('contain.text', '1')
        // The 'Save' button should be enabled
        cy.get('#export').should('not.have.class', 'disabled');
      });

      it('should the "Save" button be disabled if the case condition, output or default is empty or contains error', () => {
        cy.get('select#questionnaire-select').select('Upload your own questionnaire');
  
        cy.get('#file-upload').attachFile('bmi.json');

        // Updating the linkId should update the Rule Editor instantly
        cy.get('#question').type('bmi');
        cy.get('span#completionOptions > ul > li').contains('39156-5').click();

        // The 'Output Expression' should be default to 'Calculated Expression' 
        cy.get('#expression-entry > select').should('have.value', '1');

        // The 'Output Expression' section should be visible
        cy.get('#final-expression-section').should('exist').should('be.visible');

        // The 'Save' button should be enabled since the Output Expression is populate
        cy.get('#export').should('not.have.class', 'disabled');

        // Check the "Case Statements Helper" checkbox
        cy.get('#case-statements').check();

        // The case condition, case output, and default case should be highlighted in red
        // as they are now required fields.
        cy.get('#case-condition-0').should('have.class', 'field-error');
        cy.get('#case-output-0').should('have.class', 'field-error');
        cy.get('.default').should('have.class', 'field-error');
        // the 'Save' button should be disabled
        cy.get('#export').should('have.class', 'disabled');

        // Add 2 more case statements
        cy.get('#add-case').click();
        cy.get('#add-case').click();
        // The two new case statements should also contains "required" errors
        cy.get('#case-condition-1').should('have.class', 'field-error');
        cy.get('#case-output-1').should('have.class', 'field-error');
        cy.get('#case-condition-2').should('have.class', 'field-error');
        cy.get('#case-output-2').should('have.class', 'field-error');

        // Enter condition and output to the first case statement
        cy.get('#case-condition-0').type('bmi<18.5');
        cy.get('#case-output-0').type('underweight');
        // The errror for the first case statement should no longer be there
        cy.get('#case-condition-0').should('not.have.class', 'field-error');
        cy.get('#case-output-0').should('not.have.class', 'field-error');
        // The 'Save' button should still be disabled as there are still errors
        cy.get('#export').should('have.class', 'disabled');

        // Enter conditions and outputs for the second and third case statements
        cy.get('#case-condition-1').type('bmi<25');
        cy.get('#case-output-1').type('normal');
        cy.get('#case-condition-2').type('bmi<30');
        cy.get('#case-output-2').type('overweight');
        // The errror for the second and third case statements should no longer be there
        cy.get('#case-condition-1').should('not.have.class', 'field-error');
        cy.get('#case-output-1').should('not.have.class', 'field-error');
        cy.get('#case-condition-2').should('not.have.class', 'field-error');
        cy.get('#case-output-2').should('not.have.class', 'field-error');
        // However, the 'Save' button should still be disabled as there is still error in the default case
        cy.get('#export').should('have.class', 'disabled');

        // Add a default value
        cy.get('.default').type('obese');
        // The error in the default case should no longer be there
        cy.get('.default').should('not.have.class', 'field-error');

        // The output expression is displayed
        cy.get('lhc-case-statements lhc-syntax-preview > div > div > pre').should('contain.text', 
          `iif(bmi<18.5,underweight,iif(bmi<25,normal,iif(bmi<30,overweight,obese)))`);
          
        // The 'Save' button should be enabled
        cy.get('#export').should('not.have.class', 'disabled');
      });

    });
  });
});