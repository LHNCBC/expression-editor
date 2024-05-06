describe('Rule editor', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Angular Library', () => {
    describe('BMI calculation', () => {
      
      it('should the FHIRPath expression gets updated correctly when the unit changes', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');

        // If the Root level is unchecked, it will revert to the default linkId (question)
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // The 'Open Rule Editor' should not be disabled
        cy.get('#openRuleEditor')
          .should('exist')
          .should('not.have.class', 'disabled')
          .click();

        // The Rule Editor dialog should now appear
        cy.get('#rule-editor-dialog').should('exist');

        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-1').within(() => {
          cy.get('#variable-type-1').should('have.value', 'question');
          cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
          // The unit should be 'm'
          cy.get('div.unit-select > select').should('have.value', 'm');

          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value*0.0254");

          // Change the unit to 'Keep form units ([in_i])'
          cy.get('div.unit-select > select').select([]);
          // The FHIRPath expression should get updated
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value");
        });

        cy.get('div#row-0').within(() => {
            cy.get('#variable-type-0').should('have.value', 'question');
            cy.get('#question-0').should('have.value', "Weight (/29463-7)" );
            // The unit should be 'kg'
            cy.get('div.unit-select > select').should('have.value', '');
            cy.get('div.fhirpath > pre')
              .should('contain.text',
                "%resource.item.where(linkId='/29463-7').answer.value");
              
            // Change the unit to 'Convert to lbs.'
            cy.get('div.unit-select > select').select('lbs');
            // The FHIRPath expression should get updated
            cy.get('div.fhirpath > pre')
              .should('contain.text',
                "%resource.item.where(linkId='/29463-7').answer.value*2.20462");

            // Clear the unit which default to kg
            cy.get('div.unit-select > select').select([]);
            // The FHIRPath expression should get updated
            cy.get('div.fhirpath > pre')
              .should('contain.text',
                "%resource.item.where(linkId='/29463-7').answer.value");            
        });
      });

      it('should the FHIRPath expression gets updated correctly when the question changes 1', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');

        // If the Root level is unchecked, it will revert to the default linkId (question)
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // The 'Open Rule Editor' should not be disabled
        cy.get('#openRuleEditor')
          .should('exist')
          .should('not.have.class', 'disabled')
          .click();

        // The Rule Editor dialog should now appear
        cy.get('#rule-editor-dialog').should('exist');

        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-1').within(() => {
          cy.get('#variable-type-1').should('have.value', 'question');
          cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
          // The unit should be 'm'
          cy.get('div.unit-select > select').should('have.value', 'm');

          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value*0.0254");

          // Select question 'Clothing worn during measure'
          cy.get('#question-1').clear().type('Clothing worn during measure');
        });
        cy.get('span#completionOptions > ul > li').contains('8352-7').click();

        cy.get('div#row-1').within(() => {
          cy.get('#question-1').should('have.value', "Clothing worn during measure (/8352-7)" );
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8352-7').answer.value");
        });
      });

      it('should the FHIRPath expression gets updated correctly when the question changes 2', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');

        // If the Root level is unchecked, it will revert to the default linkId (question)
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // The 'Open Rule Editor' should not be disabled
        cy.get('#openRuleEditor')
          .should('exist')
          .should('not.have.class', 'disabled')
          .click();

        // The Rule Editor dialog should now appear
        cy.get('#rule-editor-dialog').should('exist');

        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-1').within(() => {
          cy.get('#variable-type-1').should('have.value', 'question');
          cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
          // The unit should be 'm'
          cy.get('div.unit-select > select').should('have.value', 'm');

          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value*0.0254");

          // Select question 'Clothing worn during measure'
          cy.get('#question-1').clear().type('Weight');
        });
        cy.get('span#completionOptions > ul > li').contains('29463-7').click();

        cy.get('div#row-1').within(() => {
          cy.get('#question-1').should('have.value', "Weight (/29463-7)" );
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/29463-7').answer.value");
        });
      });

      it('should the FHIRPath expression gets updated correctly when the question changes 3', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');

        // If the Root level is unchecked, it will revert to the default linkId (question)
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // The 'Open Rule Editor' should not be disabled
        cy.get('#openRuleEditor')
          .should('exist')
          .should('not.have.class', 'disabled')
          .click();

        // The Rule Editor dialog should now appear
        cy.get('#rule-editor-dialog').should('exist');

        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-1').within(() => {
          cy.get('#variable-type-1').should('have.value', 'question');
          cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
          // The unit should be 'm'
          cy.get('div.unit-select > select').should('have.value', 'm');

          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value*0.0254");

          // Select question 'Clothing worn during measure'
          cy.get('#question-1').clear().type('BMI');
        });
        cy.get('span#completionOptions > ul > li').contains('39156-5').click();

        cy.get('div#row-1').within(() => {
          cy.get('#question-1').should('have.value', "BMI (/39156-5)" );
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/39156-5').answer.value");
        });
      });

      it('should the FHIRPath expression gets updated correctly when the question changes 4', () => {
        // The demo has 'BMI (/39156-5) selected by default
        cy.get('#question').should('have.value', 'BMI (/39156-5)');

        // If the Root level is unchecked, it will revert to the default linkId (question)
        cy.get('#question').should('have.value', 'BMI (/39156-5)');
        // The 'Open Rule Editor' should not be disabled
        cy.get('#openRuleEditor')
          .should('exist')
          .should('not.have.class', 'disabled')
          .click();

        // The Rule Editor dialog should now appear
        cy.get('#rule-editor-dialog').should('exist');

        cy.title().should('eq', 'Rule Editor');

        // Variables section
        cy.get('lhc-variables > h2').should('contain', 'Item Variables');
        cy.get('#variables-section .variable-row').should('have.length', 2);

        cy.get('div#row-1').within(() => {
          cy.get('#variable-type-1').should('have.value', 'question');
          cy.get('#question-1').should('have.value', "Body height (/8302-2)" );
          // The unit should be 'm'
          cy.get('div.unit-select > select').should('have.value', 'm');

          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/8302-2').answer.value*0.0254");

          // Select question 'Clothing worn during measure'
          cy.get('#question-1').clear().type('Weight');
        });
        cy.get('span#completionOptions > ul > li').contains('29463-7').click();

        cy.get('div#row-1').within(() => {
          cy.get('#question-1').should('have.value', "Weight (/29463-7)" );

          // Change the unit to 'Convert to lbs.'
          cy.get('div.unit-select > select').select('lbs');
          // The FHIRPath expression should get updated
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/29463-7').answer.value*2.20462");

          // Select question 'Clothing worn during measure'
          cy.get('#question-1').clear().type('BMI');
        });
        cy.get('span#completionOptions > ul > li').contains('39156-5').click();

        cy.get('div#row-1').within(() => {
          cy.get('#question-1').should('have.value', "BMI (/39156-5)" );
          cy.get('div.fhirpath > pre')
            .should('contain.text',
              "%resource.item.where(linkId='/39156-5').answer.value");
        });
      });

    });
  });
});