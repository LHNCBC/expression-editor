describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI Calculation', () => {
      it('should be able to add custom extension, variable type, to each variable during the export', () => {
        cy.intercept('/bmi.json').as('bmi');
        cy.get('select#questionnaire-select').select('BMI Calculation');
        cy.wait('@bmi');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        // Add variable of variable type "FHIRPath Expression"
        cy.get('#add-variable').should('exist').click();
        cy.get('#variables-section .variable-row').should('have.length', 3);
        cy.get('div#row-2')
          .within(() => {
            cy.get('#variable-label-2').clear().type('c_fhirpath_exp');
            cy.get('#variable-type-2').select('FHIRPath Expression');
            cy.get('#variable-expression-2').clear().type("%resource.item.where(linkId='/8302-2').answer.value");
          });   
        
        // Add variable of variable type "FHIR Query"
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 4);
        cy.get('div#row-3')
          .within(() => {
            cy.get('#variable-label-3').clear().type('d_fhir_query');
            cy.get('#variable-type-3').select('FHIR Query');
            cy.get('#variable-expression-3').clear().type("%resource.item.where(linkId='/8352-7').answer.value");
          });

        // Add variable of variable type "FHIR Query (Observation)"
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 5);
        cy.get('div#row-4')
          .within(() => {
            cy.get('#variable-label-4').clear().type('e_fhir_obs');
            cy.get('#variable-type-4').select('FHIR Query (Observation)');
            cy.get('#autocomplete-4').type('weight');
          });
        cy.get('span#completionOptions').contains('29463-7').click();

        // Add variable of variable type "Question"
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 6);
        cy.get('div#row-5')
          .within(() => {
            cy.get('#variable-label-5').clear().type('f_question');
            cy.get('#variable-type-5').should('have.value', 'question');
            cy.get('#question-5')
              .should('exist')
              .should('be.visible')
              .type('weight');
          });
        cy.get('span#completionOptions').contains('29463-7').click();

        // Add variable of variable type "Easy Path Expression"
        cy.get('#add-variable').click();
        cy.get('#variables-section .variable-row').should('have.length', 7);
        cy.get('div#row-6')
          .within(() => {
            cy.get('#variable-label-6').clear().type('g_simple');
            cy.get('#variable-type-6').select('Easy Path Expression');
            cy.get('#simple-expression-6').type('1 + 1');
          });      

        // Click Save
        cy.get('#export').click();

        // Checking the output, it should have the new variables
        cy.get('pre#output').invoke('text').then((jsonData) => {
          // Parse the JSON data
          const parsedData = JSON.parse(jsonData);

          expect(parsedData.item).to.exist;
          expect(parsedData.item).to.have.lengthOf(5);
          expect(parsedData.item[3].linkId).to.exist;
          expect(parsedData.item[3].linkId).to.have.string('/39156-5');
          expect(parsedData.item[3].extension).to.exist;
          expect(parsedData.item[3].extension).to.have.lengthOf(9);

          // validate FHIRPath Expression variable
          expect(parsedData.item[3].extension[3].valueExpression.name).to.equal('c_fhirpath_exp');
          expect(parsedData.item[3].extension[3].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.equal('expression');

          // validate FHIR Query variable
          expect(parsedData.item[3].extension[4].valueExpression.name).to.equal('d_fhir_query');
          expect(parsedData.item[3].extension[4].valueExpression.language).to.equal('application/x-fhir-query');
          expect(parsedData.item[3].extension[4].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[4].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[4].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[4].valueExpression.extension[0].valueString).to.equal('query');

          // validate FHIR Query variable
          expect(parsedData.item[3].extension[5].valueExpression.name).to.equal('e_fhir_obs');
          expect(parsedData.item[3].extension[5].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[5].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[5].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[5].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[5].valueExpression.extension[0].valueString).to.equal('queryObservation');

          // validate FHIR Query variable
          expect(parsedData.item[3].extension[6].valueExpression.name).to.equal('f_question');
          expect(parsedData.item[3].extension[6].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[6].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[6].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[6].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[6].valueExpression.extension[0].valueString).to.equal('question');

          // validate Easy Path Expression variable
          expect(parsedData.item[3].extension[7].valueExpression.name).to.equal('g_simple');
          expect(parsedData.item[3].extension[7].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[7].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[7].valueExpression.extension).to.have.lengthOf(2);
          expect(parsedData.item[3].extension[7].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[7].valueExpression.extension[0].valueString).to.equal('simple');
        });
      });
    });

    describe('BMI Variable Type', () => {
      // This test illustrates that when the variable type (valueString) is not defined, 
      // the variable may not be converted to the correct data type for display.  Specifically,
      // on the variables of type "FHIRPath Expression" and "FHIR Query (Observation)" in this 
      // test.
      it('should be able to show that variable types are not displayed correctly without the custom extension', () => {

        cy.intercept('/bmivariabletype.json').as('bmivariable');
        cy.get('select#questionnaire-select').select('BMI Variable Type');
        cy.wait('@bmivariable');

        cy.title().should('eq', 'Rule Editor');

        // Advanced Interface checkbox
        cy.get('#advanced-interface').should('be.checked');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 13);

        // Variable type "FHIRPath Expression" is displayed incorrectly as "Question"
        cy.get('div#row-8')
          .within(() => {
            cy.get('#variable-label-8').should('have.value', 'c_no_vartype_fhirpath_exp');
            cy.get('#variable-type-8').should('have.value', 'question');
          });   
        
        // Variable type "FHIR Query" is displayed correctly
        cy.get('div#row-9')
          .within(() => {
            cy.get('#variable-label-9').should('have.value', 'd_no_vartype_fhir_query');
            cy.get('#variable-type-9').should('have.value', 'query');
          });        

        // Variable type "FHIR Query (Observation)" is incorrectly displayed as "FHIRPath Expression"
        cy.get('div#row-10')
          .within(() => {
            cy.get('#variable-label-10').should('have.value', 'e_no_vartype_fhir_obs');
            cy.get('#variable-type-10').should('have.value', 'expression');
          });

        // Variable type "Question" is displayed correctly
        cy.get('div#row-11')
          .within(() => {
            cy.get('#variable-label-11').should('have.value', 'f_no_vartype_question');
            cy.get('#variable-type-11').should('have.value', 'question');
          });

        // Variable type "Easy Path Expression" is displayed correctly
        cy.get('div#row-12')
          .within(() => {
            cy.get('#variable-label-12').should('have.value', 'g_no_vartype_simple');
            cy.get('#variable-type-12').should('have.value', 'simple');
          });
      });

      it('should be able to show that variable types are displayed correctly with the custom extension', () => {

        cy.intercept('/bmivariabletype.json').as('bmivariable');
        cy.get('select#questionnaire-select').select('BMI Variable Type');
        cy.wait('@bmivariable');

        cy.title().should('eq', 'Rule Editor');

        // Advanced Interface checkbox
        cy.get('#advanced-interface').should('be.checked');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 13);

        // Add variable of variable type "FHIRPath Expression"
        cy.get('div#row-2')
          .within(() => {
            cy.get('#variable-label-2').should('have.value', 'c_fhirpath_exp');
            cy.get('#variable-type-2').should('have.value', 'expression');
          });   
        
        // Add variable of variable type "FHIR Query"
        cy.get('div#row-3')
          .within(() => {
            cy.get('#variable-label-3').should('have.value', 'd_fhir_query');
            cy.get('#variable-type-3').should('have.value', 'query');
          });        

        // Add variable of variable type "FHIR Query (Observation)"
        cy.get('div#row-4')
          .within(() => {
            cy.get('#variable-label-4').should('have.value', 'e_fhir_obs');
            cy.get('#variable-type-4').should('have.value', 'queryObservation');
          });

        // Add variable of variable type "Question"
        cy.get('div#row-5')
          .within(() => {
            cy.get('#variable-label-5').should('have.value', 'f_question');
            cy.get('#variable-type-5').should('have.value', 'question');
          });

        // Add variable of variable type "Easy Path Expression"
        cy.get('div#row-6')
          .within(() => {
            cy.get('#variable-label-6').should('have.value', 'g_simple');
            cy.get('#variable-type-6').should('have.value', 'simple');
          });
      });

      it('should display invalid factor "Question" variable as "FHIRPath Expression" instead', () => {
        cy.intercept('/bmivariabletype.json').as('bmivariable');
        cy.get('select#questionnaire-select').select('BMI Variable Type');
        cy.wait('@bmivariable');

        cy.title().should('eq', 'Rule Editor');

        // Advanced Interface checkbox
        cy.get('#advanced-interface').should('be.checked');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 13);

        // The configuration said this should be type 'Question'.  However, the factor 
        // 5.54 does not matched with any pre-defined factors and therefore, is not a valid
        // question. So the item is displayed as 'FHIRPath Expression' instead.
        cy.get('div#row-7')
          .within(() => {
            cy.get('#variable-label-7').should('have.value', 'h_question_invalid_factor');
            cy.get('#variable-type-7').should('have.value', 'expression');
          });
      });


      it('should be able to update custom extension and export correctly', () => {
        cy.intercept('/bmivariabletype.json').as('bmivariable');
        cy.get('select#questionnaire-select').select('BMI Variable Type');
        cy.wait('@bmivariable');

        cy.title().should('eq', 'Rule Editor');

        // Advanced Interface checkbox
        cy.get('#advanced-interface').should('be.checked');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 13);

        // Updated variable type to "FHIR Query"
        cy.get('div#row-2')
          .within(() => {
            cy.get('#variable-label-2').should('have.value', 'c_fhirpath_exp');
            cy.get('#variable-type-2').should('have.value', 'expression');
            cy.get('#variable-type-2').select('FHIR Query');
          });   
        
        // Updated variable type to "FHIR Query (Observation)"
        cy.get('div#row-3')
          .within(() => {
            cy.get('#variable-label-3').should('have.value', 'd_fhir_query');
            cy.get('#variable-type-3').should('have.value', 'query');
            cy.get('#variable-type-3').select('FHIR Query (Observation)');
          });        

        // Updated variable type to "Question"
        cy.get('div#row-4')
          .within(() => {
            cy.get('#variable-label-4').should('have.value', 'e_fhir_obs');
            cy.get('#variable-type-4').should('have.value', 'queryObservation');
            cy.get('#variable-type-4').select('Question');
          });

        // Updated variable type to "Easy Path Expression"
        cy.get('div#row-5')
          .within(() => {
            cy.get('#variable-label-5').should('have.value', 'f_question');
            cy.get('#variable-type-5').should('have.value', 'question');
            cy.get('#variable-type-5').select('Easy Path Expression');
          });

        // Updated variable type to "FHIRPath Expression"
        cy.get('div#row-6')
          .within(() => {
            cy.get('#variable-label-6').should('have.value', 'g_simple');
            cy.get('#variable-type-6').should('have.value', 'simple');
            cy.get('#variable-type-6').select('FHIRPath Expression');
          });

        // Click Save
        cy.get('#export').click();

        // Checking the output, it should have the new variable created under the BMI item extension
        cy.get('pre#output').invoke('text').then((jsonData) => {
          // Parse the JSON data
          const parsedData = JSON.parse(jsonData);

          expect(parsedData.item).to.exist;
          expect(parsedData.item).to.have.lengthOf(5);
          expect(parsedData.item[3].linkId).to.exist;
          expect(parsedData.item[3].linkId).to.have.string('/39156-5');
          expect(parsedData.item[3].extension).to.exist;
          expect(parsedData.item[3].extension).to.have.lengthOf(15);

          // validate that the valueString is updated to 'query'
          expect(parsedData.item[3].extension[3].valueExpression.name).to.equal('c_fhirpath_exp');
          expect(parsedData.item[3].extension[3].valueExpression.language).to.equal('application/x-fhir-query');
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[3].valueExpression.extension[0].valueString).to.equal('query');

          // validate that the valueString is updated to 'queryObservation'
          expect(parsedData.item[3].extension[4].valueExpression.name).to.equal('d_fhir_query');
          expect(parsedData.item[3].extension[4].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[4].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[4].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[4].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[4].valueExpression.extension[0].valueString).to.equal('queryObservation');

          // validate that the valueString is updated to 'question'
          expect(parsedData.item[3].extension[5].valueExpression.name).to.equal('e_fhir_obs');
          expect(parsedData.item[3].extension[5].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[5].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[5].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[5].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[5].valueExpression.extension[0].valueString).to.equal('question');

          // validate that the valueString is updated to 'simple'
          expect(parsedData.item[3].extension[6].valueExpression.name).to.equal('f_question');
          expect(parsedData.item[3].extension[6].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[6].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[6].valueExpression.extension).to.have.lengthOf(2);
          expect(parsedData.item[3].extension[6].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[6].valueExpression.extension[0].valueString).to.equal('simple');

          // validate that the valueString is updated to 'expression'
          expect(parsedData.item[3].extension[7].valueExpression.name).to.equal('g_simple');
          expect(parsedData.item[3].extension[7].valueExpression.language).to.equal('text/fhirpath');
          expect(parsedData.item[3].extension[7].valueExpression.extension).to.exist;
          expect(parsedData.item[3].extension[7].valueExpression.extension).to.have.lengthOf(1);
          expect(parsedData.item[3].extension[7].valueExpression.extension[0].valueString).to.exist;
          expect(parsedData.item[3].extension[7].valueExpression.extension[0].valueString).to.equal('expression');
        });
      });
    });
  });
});