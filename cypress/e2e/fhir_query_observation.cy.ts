describe('Expression Editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI Variable Type', () => {
      it('should be able to display fhir query observation correctly with params in any order ', () => {
        cy.intercept('/bmivariabletype.json').as('bmivariable');
        cy.get('select#questionnaire-select').select('BMI Variable Type');
        cy.wait('@bmivariable');

        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // Click the button to edit the expression
        cy.get('button#openExpressionEditor').should('exist').click();
        // The Expression Editor dialog should now appear
        cy.get('lhc-expression-editor #expression-editor-base-dialog').should('exist');

        cy.title().should('eq', 'Expression Editor');

        // standard order
        cy.get('div#row-11').within(() => {
          cy.get('#variable-label-11').should('have.value', 'fhir_query_obs_2_weeks');
          cy.get('#variable-type-11').should('have.value', 'queryObservation');
          cy.get('div.time-input>input').should('contain.value', '2');
          cy.get('div.time-select>select').should('contain.value', 'weeks');
          cy.get('div.syntax-preview > pre')
            .should('contain.text',
                    'Observation?code=http://loinc.org|2922-3&date=gt{{today()-2 weeks}}&patient={{%patient.id}}&_sort=-date&_count=1');
        });

        // various orders 1
        cy.get('div#row-27').within(() => {
          cy.get('#variable-label-27').should('have.value', 'fhir_query_obs_params_order_1');
          cy.get('#variable-type-27').should('have.value', 'queryObservation');
          cy.get('div.time-input>input').should('contain.value', '2');
          cy.get('div.time-select>select').should('contain.value', 'weeks');
          cy.get('div.syntax-preview > pre')
            .should('contain.text',
                    'Observation?date=gt{{today()-2 weeks}}&patient={{%patient.id}}&_sort=-date&_count=1&code=http://loinc.org|2922-3');
        });

        // various orders 2
        cy.get('div#row-28').within(() => {
          cy.get('#variable-label-28').should('have.value', 'fhir_query_obs_params_order_2');
          cy.get('#variable-type-28').should('have.value', 'queryObservation');
          cy.get('div.time-input>input').should('contain.value', '2');
          cy.get('div.time-select>select').should('contain.value', 'weeks');
          cy.get('div.syntax-preview > pre')
            .should('contain.text',
                    'Observation?patient={{%patient.id}}&_sort=-date&_count=1&code=http://loinc.org|2922-3&date=gt{{today()-2 weeks}}');
        });
   
        // various orders 3
        cy.get('div#row-29').within(() => {
          cy.get('#variable-label-29').should('have.value', 'fhir_query_obs_params_order_3');
          cy.get('#variable-type-29').should('have.value', 'queryObservation');
          cy.get('div.time-input>input').should('contain.value', '2');
          cy.get('div.time-select>select').should('contain.value', 'weeks');
          cy.get('div.syntax-preview > pre')
            .should('contain.text',
                    'Observation?_sort=-date&_count=1&code=http://loinc.org|2922-3&date=gt{{today()-2 weeks}}&patient={{%patient.id}}');
        });

        // various orders 4
        cy.get('div#row-30').within(() => {
          cy.get('#variable-label-30').should('have.value', 'fhir_query_obs_params_order_4');
          cy.get('#variable-type-30').should('have.value', 'queryObservation');
          cy.get('div.time-input>input').should('contain.value', '2');
          cy.get('div.time-select>select').should('contain.value', 'weeks');
          cy.get('div.syntax-preview > pre')
            .should('contain.text',
                    'Observation?_count=1&code=http://loinc.org|2922-3&date=gt{{today()-2 weeks}}&patient={{%patient.id}}&_sort=-date');

        });

      });
    });
  });
});