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


      it('should URL encoded the output for the x-fhir-output', () => {
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression)');
        
        // Add a variable
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 3);
        
        // Select FHIR Query (Observation) as Variable Type
        cy.get('#variable-type-2').select('FHIR Query (Observation)');
        
        // Select Code 1
        cy.get('#autocomplete-2').type('Vit A Bld-mCnc');
        cy.contains('2922-3').click();

        // Confirm that the selection is displayed
        cy.get('div#row-2')
          .find('div.query-select > span.autocomp_selected > ul > li')
          .should('have.text', '×Vit A Bld-mCnc - 2922-3');

        // Select Code 2
        cy.get('#autocomplete-2').type('CV B blend Ab Ser-Imp');
        cy.contains('20996-5').click();

        // Confirm that the selection is displayed
        cy.get('div#row-2')
          .find('div.query-select > span.autocomp_selected > ul > li')
          .should('contain.text', '×CV B blend Ab Ser-Imp - 20996-5');

        // Check the x-fhir-output
        cy.get('lhc-query-observation>div.syntax-preview>pre.d-inline')
          .should('contain', 'Observation?code=http://loinc.org|2922-3,http://loinc.org|20996-5&date=gt{{today()-1 months}}&patient={{%patient.id}}&_sort=-date&_count=1');

        // Click Save
        cy.get('#export').click();

        // Export output should contain the URL Encoded of the x-fhir-output
        cy.get('pre#output')
          .should('contain', 'Observation?code=http%3A%2F%2Floinc.org%7C2922-3%2Chttp%3A%2F%2Floinc.org%7C20996-5&date=gt{{today()-1 months}}&patient={{%patient.id}}&_sort=-date&_count=1');
      });


      it('should be able to retain settings when check the Advance Interface checkbox', () => {
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression)');
     
        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0').should('have.value', 'question');
            cy.get('#question-0').should('have.value', "Weight (/29463-7)" );
            cy.get('div.unit-select>select').select('lbs');
          });

        cy.get('div#row-1')
          .within(() => {
            cy.get('#variable-type-1').should('have.value', 'question');
            cy.get('#question-1').should('have.value', "Body height (/8302-2)" );    
            cy.get('div.unit-select>select').select('cm');
          });

        // Add a variable
        cy.get('#add-variable').should('exist').should('be.visible').click();
        cy.get('#variables-section .variable-row').should('have.length', 3);
                
        cy.get('div#row-2')
          .within(() => {
            cy.get('#variable-type-2').select('FHIR Query (Observation)');
            cy.get('#autocomplete-2').type('Vit A Bld-mCnc');
          });

        cy.contains('2922-3').click();
        cy.get('div#row-2')
          .within(() => {
            cy.get('div.time-input').should('exist');
            cy.get('div.time-input > input').clear().type('3');
            cy.get('div.time-input > input').should('have.value', '3');

            cy.get('div.time-select > select').should('exist');
            cy.get('div.time-select > select > option').should('have.length', 4);
            cy.get('div.time-select > select').select('years');
          });

        // Check the Advanced Interface checkbox
        cy.get('input#advanced-interface').check();

        // Validate variables settings didn't get reset
        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0').should('have.value', 'question');
            cy.get('#question-0').should('have.value', "Weight (/29463-7)" );
            cy.get('div.unit-select>select').should('have.value', 'lbs');
          });

        cy.get('div#row-1')
          .within(() => {
            cy.get('#variable-type-1').should('have.value', 'question');
            cy.get('#question-1').should('have.value', "Body height (/8302-2)" );    
            cy.get('div.unit-select>select').should('have.value', 'cm');
          });

          cy.get('div#row-2')
          .within(() => {
            cy.get('select#variable-type-2').should('have.value', 'queryObservation');
            
            cy.get('div.time-input').should('exist');
            cy.get('div.time-input > input').should('have.value', '3');

            cy.get('div.time-select > select').should('exist');
            cy.get('div.time-select > select').should('have.value', 'years');
          });
      });

      it('should be able to retain setting when swapping questions and check the Advance Interface checkbox', () => {
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression)');
    
        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0').should('have.value', 'question');
            cy.get('#question-0').should('have.value', "Weight (/29463-7)" );
            //cy.get('#question-0').clear().type("Body height");
            cy.get('#question-0').clear().type('height');
          });
        cy.get('span#completionOptions > ul > li').contains('8302-2').click();

        cy.get('div#row-0')
          .within(() => {
            cy.get('#question-0').should('have.value', "Body height (/8302-2)" );
            cy.get('div.unit-select > select > option').should('have.length', 3);
            cy.get('div.unit-select > select').select('cm');
          });

        cy.get('div#row-1')
          .within(() => {
            cy.get('#variable-type-1').should('have.value', 'question');
            cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
            cy.get('#question-1').clear().type("Weight");
          });
        cy.get('span#completionOptions > ul > li').contains('29463-7').click();
        cy.get('div#row-1')
          .within(() => {
            cy.get('#question-1').should('have.value', "Weight (/29463-7)" );
            cy.get('div.unit-select > select > option').should('have.length', 2);
            cy.get('div.unit-select>select').select('lbs');
          });

        // Check the Advanced Interface checkbox
        cy.get('input#advanced-interface').check();

        // Validate variables settings didn't get reset
        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0').should('have.value', 'question');
            cy.get('#question-0').should('have.value', "Body height (/8302-2)" );
            cy.get('div.unit-select>select').should('have.value', 'cm');
          });

        cy.get('div#row-1')
          .within(() => {
            cy.get('#variable-type-1').should('have.value', 'question');
            cy.get('#question-1').should('have.value', "Weight (/29463-7)" );
            cy.get('div.unit-select>select').should('have.value', 'lbs');
          });
      });

      
      it('should be able to save FHIR Query resource other than Observation', () => {
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression)');
    
        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        // Check the Advanced Interface checkbox
        cy.get('input#advanced-interface').check();

        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0')
              .should('have.value', 'question')
              .select('queryObservation');
            //cy.get('#variable-type-0').select('FHIR Query (Observation)');
            cy.get('#autocomplete-0').type('Vit A Bld-mCnc');
          });

        cy.contains('2922-3').click();

        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0')
              .should('have.value', 'queryObservation')
              .select('query');
            cy.get('#variable-expression-0')
              .should('exist')
              .should('contain.value', 
                'Observation?code=http://loinc.org|2922-3&date=gt{{today()-1 months}}');

            // Replace Observation resource with Patient resource
            cy.get('#variable-expression-0')
              .invoke('val')
              .then((currentValue: string) => {
                const modifiedValue = currentValue.replace('Observation', 'Patient');
                cy.get('#variable-expression-0')
                  .clear()
                  .type(`${modifiedValue}`, {parseSpecialCharSequences: false});
              });
          });

          // Export
          cy.get('button#export').should('exist').click();

          // Validate that the expression was updated correctly
          cy.get('pre#output')
            .should('contain', 'Patient?code=http%3A%2F%2Floinc.org%7C2922-3&date=gt{{today()-1 months}}');
      });

      it('should be able to parse and save FHIR Query', () => {
        cy.get('#questionnaire-select').select('BMI Calculation (Easy Path expression)');
    
        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        // Check the Advanced Interface checkbox
        cy.get('input#advanced-interface').check();

        cy.get('div#row-0')
          .within(() => {
            cy.get('#variable-type-0')
              .should('have.value', 'question')
              .select('query');
            cy.get('#variable-expression-0')
              .should('exist')
              .clear()
              .type('Observation');
          });

        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', '"expression": "Observation"');

        // Update FHIR Query with question mark but no parameters
        cy.get('#variable-expression-0')
        .clear()
        .type('Observation?');
        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', '"expression": "Observation"');

        // Update FHIR Query with missing code value
        cy.get('#variable-expression-0')
        .clear()
        .type('Observation?code=');
        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', '"expression": "Observation"');        

        // Update FHIR Query with code
        cy.get('#variable-expression-0')
        .clear()
        .type('Observation?code=http://loinc.org|2922-3');
        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', '"expression": "Observation?code=http%3A%2F%2Floinc.org%7C2922-3"');  

        // Update FHIR Query with missing }} in parameter string.
        cy.get('#variable-expression-0')
        .clear()
        .type('Observation?code=http://loinc.org|2922-3&date=gt{{today()-1 months');
        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', 
          '"expression": "Observation?code=http%3A%2F%2Floinc.org%7C2922-3&date=gt{{today()-1 months"');  

        // Update FHIR Query with multiple {{}} in parameter string.  URL encoded on string outside of {{}}
        cy.get('#variable-expression-0')
        .clear()
        .type('Observation?code=http://loinc.org|2922-3&date=gt{{today()-1 months}} and {{today()}}',
          {parseSpecialCharSequences: false});
        // Export
        cy.get('button#export').should('exist').click();
        // Validate that the expression was updated correctly
        cy.get('pre#output')
        .should('contain.text', 
          '"expression": "Observation?code=http%3A%2F%2Floinc.org%7C2922-3&date=gt{{today()-1 months}}%20and%20{{today()}}"');  

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
    });

    describe('Query support', () => {
      it('should display the query editor', () => {
        // Check the demo questionnaire load
        cy.get('select#questionnaire-select').select('Query');
        cy.get('#variable-type-2').contains('FHIR Query (Observation)');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 3);

        cy.get('#variable-type-2').should('contain.text', 'FHIR Query (Observation)');
        cy.get('lhc-query-observation').should('exist').should('be.visible');

        // Confirm that the selection is displayed
        cy.get('div#row-2')
          .within(() => {
            cy.get('div.query-select > span.autocomp_selected > ul > li').should('have.length', 2);
            cy.get('div.query-select > span.autocomp_selected > ul > li')
              .eq(0)
              .should('have.text', '×test');

            cy.get('div.query-select > span.autocomp_selected > ul > li')
              .eq(1)
              .should('have.text', '×Appetite sleep chg notes DI-PAD - 65972-2');

            cy.get('.time-input > .ng-untouched').should('have.value', '7');
            cy.get('.time-select > .ng-untouched').should('have.value', 'days');

            cy.get('lhc-query-observation>div.syntax-preview>pre.d-inline')
              .should('contain', 'Observation?code=test,http://loinc.org|65972-2&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

            // Add a new code
            cy.get('#autocomplete-2').type('weight');
          });

        cy.get('#completionOptions').contains('29463-7').click();

        cy.get('div#row-2')
          .within(() => {
            cy.contains('Weight - 29463-7');
            cy.contains('Observation?code=test,http://loinc.org|65972-2,http://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');

            // Remove first code
            cy.get(':nth-child(1) > button > span').click();
            cy.contains('Observation?code=http://loinc.org|65972-2,http://loinc.org|29463-7&date=gt{{today()-7 days}}&patient={{%patient.id}}&_sort=-date&_count=1');    
          });
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
