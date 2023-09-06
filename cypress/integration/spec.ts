describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {
      it('should display the editor', () => {
        cy.title().should('eq', 'Rule Editor');
        // Uneditable variables section should not show up
        cy.get('#uneditable-variables-section .variable-row').should('have.length', 0);
        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);
        // Final expression
        cy.get('#final-expression-section h2').should('contain', 'Output Expression');
      });

      it('should be possible to add a variable', () => {
        cy.get('#variables-section .variable-row').should('have.length', 2);
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 3);
      });

      it('should be possible to remove a variable', () => {
        cy.get('#variables-section .variable-row').should('have.length', 2);
        cy.get('.remove-variable').last().click();
        cy.get('#variables-section .variable-row').should('have.length', 1);
      });

      it('should produce the correct FHIR Questionnaire', () => {
        cy.get('#export').click();
        cy.get('#output').contains('"expression": "%a/%b.power(2)"');
      });

      it('should be user stylable', () => {
        // User styled input fields have a light yellow background. Declared via an attribute
        cy.get('lhc-rule-editor input:not([type="checkbox"])').first()
          .should('have.attr', 'style', 'background-color: rgb(255, 255, 238);');
      });

      it('should be able to select autocomplete question', () => {
        cy.get('#question-1').clear().type('bmi');
        cy.contains('39156-5').click();
        cy.get('#question-1').parent().next('.unit-select').children('select').should('not.exist');
        cy.get('#question-1').clear().type('height');
        cy.contains('8302-2').click();
        cy.get('#question-1').parent().next('.unit-select').children('select').should('exist'); 
      });
    });

    describe('PHQ9 score calculation', () => {
      beforeEach(() => {
        cy.get('#questionnaire-select').select('PHQ9 (no FHIRPath)');
      });

      it('should display the editor', () => {
        // Only the prompt for score calculation should show up
        cy.get('.rule-editor').contains('Would you like to calculate the sum of scores?');
      });

      it('should produce the calculation', () => {
        cy.get('#export-score').click();
        cy.get('#output').contains('"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) + iif(%b.exists(), %b, 0) + ' +
          'iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) + iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + ' +
          'iif(%g.exists(), %g, 0) + iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
        );
      });

      it('should be able to access uneditable variable and no duplicate', () => {
        cy.get('#questionnaire-select').select('PHQ9 (no FHIRPath)');
        cy.get('.rule-editor').contains('Would you like to calculate the sum of scores?');
        // Click no
        cy.get('#skip-export-score').click();

        // Variables section should be empty.
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 0);

        // Add a variable and select FHIR Query (Observation) variable type
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 1);
        cy.get('#variable-type-0').select('FHIR Query (Observation)');
        cy.get('#autocomplete-0').type('weight');
        cy.contains('29463-7').click();
        cy.contains('Weight - 29463-7');

        // Uneditable variables section should be empty
        cy.get('#uneditable-variables-section .variable-row').should('have.length', 0);

        // Click Save
        cy.get('#export').click();

        // Uneditable variables section should now have one item
        cy.get('#uneditable-variables-section .variable-row').should('have.length', 1);

        // Click Save again
        cy.get('#export').click();

        // Uneditable variables section should still only have one item
        cy.get('#uneditable-variables-section .variable-row').should('have.length', 1);

        // Enter the uneditable variable 'patient' to the Output Expression,
        // it should be valid.
        cy.get('input.simple-expression').clear().type('patient');
        cy.get('lhc-syntax-preview>div>div>pre').contains('%patient');
      });

    });

    describe('Query support', () => {
      it('should display the query editor', () => {
        // Check the demo questionnaire load
        cy.get('select#questionnaire-select').select('Query');
        cy.contains('FHIR Query (Observation)');
        cy.contains('Appetite sleep chg notes DI-PAD - 65972-2');
        cy.get('.time-input > .ng-untouched').should('have.value', '7');
        cy.get('.time-select > .ng-untouched').should('have.value', 'days');
        cy.contains('Observation?code=test%2Chttp://loinc.org|65972-2&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

        // Add a new code
        cy.get('#autocomplete-2').type('weight');
        cy.contains('29463-7').click();
        cy.contains('Weight - 29463-7');
        cy.contains('Observation?code=test%2Chttp://loinc.org|65972-2%2Chttp://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

        // Remove first code
        cy.get(':nth-child(1) > button > span').click();
        cy.contains('Observation?code=http://loinc.org|65972-2%2Chttp://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');
      });
    });

    describe('Case statements', () => {
      it('should display the Easy Path case editor when importing questionnaire with Easy Path in final expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression with cases)');
        cy.get('#advanced-interface').should('not.be.checked');

        // Should have the case statement checkbox toggled
        cy.get('#case-statements').should('be.checked');
        cy.get('#output-expressions').should('not.be.checked');
        cy.get('#case-condition-0').should('have.value', 'bmi<18.5');
        cy.get('#case-output-0').should('have.value', 'underweight');
        cy.get('#case-condition-1').should('have.value', 'bmi<25');
        cy.get('#case-output-1').should('have.value', 'normal');
        cy.get('#case-condition-2').should('have.value', 'bmi<30');
        cy.get('#case-output-2').should('have.value', 'overweight');
        cy.get('.default').should('have.value', 'obese');

        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });

      it('should display the FHIRPath case editor when importing questionnaire with FHIRPath in final expression', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (with cases)');
        cy.get('#advanced-interface').should('be.checked');

        // Should have the case statement checkbox toggled
        cy.get('#case-statements').should('be.checked');
        cy.get('#output-expressions').should('be.checked');
        cy.get('#case-condition-0').should('have.value', '%bmi<18.5');
        cy.get('#case-output-0').should('have.value', `'underweight'`);
        cy.get('#case-condition-1').should('have.value', '%bmi<25');
        cy.get('#case-output-1').should('have.value', `'normal'`);
        cy.get('#case-condition-2').should('have.value', '%bmi<30');
        cy.get('#case-output-2').should('have.value', `'overweight'`);
        cy.get('.default').should('have.value', `'obese'`);

        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });

      it('should be able to add cases to a questionnaire that does not have them', () => {
        cy.get('select#questionnaire-select').select('BMI Calculation (Easy Path expression)');

        cy.get('#add-variable').click();
        cy.get('#variable-label-2').type('{backspace}bmi');
        cy.get('#variable-type-2').select('Easy Path Expression');
        cy.get('#variable-expression-2>input').type('a/b^2');

        cy.get('#case-statements').should('not.be.checked');
        cy.get('#case-statements').check();
        cy.get('#output-expressions').should('be.checked');
        cy.get('#output-expressions').uncheck();

        // Preview should not show up initially
        cy.get('lhc-case-statements > lhc-syntax-preview').should('not.exist');

        // Add a conditions and outputs
        cy.get('#case-condition-0').type('bmi<18.5');
        cy.get('#case-output-0').type('underweight');
        cy.get('#add-case').click();
        cy.get('#case-condition-1').type('bmi<25');
        cy.get('#case-output-1').type('normal');
        cy.get('#add-case').click();
        cy.get('#case-condition-2').type('bmi<30');
        cy.get('#case-output-2').type('overweight');
        cy.get('.default').type('obese');
        // Add a default value

        // Check the output expression
        cy.get('lhc-case-statements > lhc-syntax-preview').contains(
          `iif(%bmi<18.5,'underweight',iif(%bmi<25,'normal',iif(%bmi<30,'overweight','obese')))`);
      });
    });
  });
});
