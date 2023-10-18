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
        cy.get('#output').should('contain.text', '"expression": "%a/%b.power(2)"');
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

      it('should display the calculate sum prompt', () => {
        // Only the prompt for score calculation should show up
        cy.get('.rule-editor').should('contain.text', 'Would you like to calculate the sum of scores?');
      });

      it('should hide the calculate sum prompt if click no', () => {
        // Only the prompt for score calculation should show up
        cy.get('.rule-editor').should('contain.text', 'Would you like to calculate the sum of scores?');
        cy.get('#skip-score-items-selection').click();
        cy.get('.rule-editor').should('not.contain.text', 'Would you like to calculate the sum of scores?');
      });

      it('should display the scoring items selection', () => {
        // Only the prompt for score calculation should show up
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('#selectAll').should('exist');
            cy.get('.item-filter').should('exist');
            cy.get('div.items-tree').should('exist');
            cy.get('div.items-tree tree-node').should('have.length', 9);

            // Expand All checkbox should not be displayed.
            cy.get('input#expandAll').should('not.exist');
          });
      });

      it('should be able to select/unselect all items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);

            // Check the Select All checkbox
            cy.get('#selectAll').should('exist').check();
            cy.get('tree-node-checkbox > [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });

            // Uncheck the Select All checkbox
            cy.get('#selectAll').should('be.checked').uncheck();
            cy.get('tree-node-checkbox > [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('not.be.checked');
            });
          });
      });

      it('should be able to filter/unfilter items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('input#filter').type('Poor appetite');
            cy.get('div.items-tree tree-node').should('have.length', 1);
            cy.get('div.item-filter > button').click();
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('input#filter').type('Feeling');
            cy.get('div.items-tree tree-node').should('have.length', 3);
          });
      });

      it('should be able to select/unselect individual item', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('tree-node-checkbox > [type="checkbox"]').as('checkboxes');
            
            // Select 3rd and 5th items
            cy.get('@checkboxes').eq(2).check();
            cy.get('@checkboxes').eq(4).check();
            
            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 2 || index === 4)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
            
            // Unselect 3rd and 5th items
            cy.get('@checkboxes').eq(2).uncheck();
            cy.get('@checkboxes').eq(4).uncheck();

            // Validate that none were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              cy.wrap($checkbox).should('not.be.checked');
            });
          });
      });

      it('should hide the scoring items selection if click Cancel', () => {
        cy.get('.rule-editor').should('contain.text', 'Would you like to calculate the sum of scores?');
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('#selectAll').should('exist');
            cy.get('.item-filter').should('exist');
            cy.get('div.items-tree').should('exist');
            cy.get('div.items-tree tree-node').should('have.length', 9);
          });

        // Click Cancel
        cy.get('#skip-export-score').click()
        cy.get('.rule-editor').should('not.have.text', ' Select items to include in the score calculation: ');
      });

      it('should be able to export score with selected individual items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('tree-node-checkbox > [type="checkbox"]').as('checkboxes');
            
            // Select 3rd and 5th items
            cy.get('@checkboxes').eq(2).check();
            cy.get('@checkboxes').eq(4).check();
            
            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 2 || index === 4)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
          });  
          cy.get('#export-score').click();
          cy.get('#output')
          .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
            '+ iif(%b.exists(), %b, 0), {})"');
      });

      it('should be able to export score with all items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            
            // Check the Select All checkbox
            cy.get('#selectAll').should('exist').check();
            cy.get('tree-node-checkbox > [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });
          });  
          cy.get('#export-score').click();
          cy.get('#output')
            .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
              '+ iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) ' +
              '+ iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) ' +
              '+ iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"'
          );
      });
    });

    describe('PHQ9 Group score calculation', () => {
      beforeEach(() => {
        cy.get('#questionnaire-select').select('PHQ9 Group (no FHIRPath)');
      });

      it('should display the calculate sum prompt', () => {
        // Only the prompt for score calculation should show up
        cy.get('.rule-editor').should('contain.text', 'Would you like to calculate the sum of scores?');
      });

      it('should hide the calculate sum prompt if click no', () => {
        // Only the prompt for score calculation should show up
        cy.get('.rule-editor').should('contain.text', 'Would you like to calculate the sum of scores?');
        cy.get('#skip-score-items-selection').click();
        cy.get('.rule-editor').should('not.contain.text', 'Would you like to calculate the sum of scores?');
      });

      it('should display the scoring items selection', () => {
        // Only the prompt for score calculation should show up
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('#selectAll').should('exist');
            cy.get('.item-filter').should('exist');
            cy.get('div.items-tree').should('exist');
            cy.get('div.items-tree tree-node').should('have.length', 10);
          });
      });

      it('should be able to collap/expand group', () => {
        // Only the prompt for score calculation should show up
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            // Expand All checkbox should be visible and checked by default
            cy.get('input#expandAll').should('exist').should('be.visible').should('be.checked');
            cy.get('div.items-tree tree-node').should('have.length', 10);

            cy.get('input#expandAll').uncheck();
            cy.get('div.items-tree tree-node').should('have.length', 6);
          });
      });

      it('should be able to select/unselect group items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 10);
            cy.get('tree-node-checkbox > [type="checkbox"]').as('checkboxes');
            
            // Select the group
            cy.get('@checkboxes').eq(0).check();
            // Validate to make sure that all items within the group are checked
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index < 5)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });

            // Check individual item outside of the group
            cy.get('@checkboxes').eq(5).check(); 

            // Unselect the group
            cy.get('@checkboxes').eq(0).uncheck();
            // Validate to make sure that all items within the group are unchecked
            // item 6 should remain checked
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 5)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
          });
      });

      it('should be able to export score with all items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 10);
            
            // Check the Select All checkbox
            cy.get('#selectAll').should('exist').check();
            cy.get('tree-node-checkbox > [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });
          });  
          cy.get('#export-score').click();

          // One noticable difference between items not in a group and items in a group is the generated
          // expression. In the case of items in a group, the expression starts from the top node item and
          // works its way down the tree to the destination node.

          // Item in a group
          cy.get('#output')
            .should('contain.text', 
              "%questionnaire.item.where(linkId ='/45900-0').item.where(linkId ='/45900-0/44250-9').answerOption");
          
          // Item not in a group
          cy.get('#output')
            .should('contain.text', "%questionnaire.item.where(linkId ='44251-7').answerOption");

          // While 10 checkboxes exist, there should be only 9 variables created. The group itself should 
          // not be included.
          cy.get('#output')
            .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
              '+ iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) ' +
              '+ iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) ' +
              '+ iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0), {})"');          
      });

      it('should be able to export score with selected individual items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 10);
            cy.get('tree-node-checkbox > [type="checkbox"]').as('checkboxes');
            
            // Select one item in a group
            cy.get('@checkboxes').eq(2).check();
            // Select one item not in a group
            cy.get('@checkboxes').eq(6).check();
            
            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 2 || index === 6)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
          });  
          cy.get('#export-score').click();

          // Item in a group
          cy.get('#output')
            .should('contain.text', 
              "%questionnaire.item.where(linkId ='/45900-0').item.where(linkId ='/45900-0/44255-8').answerOption");

          // Item not in a group
          cy.get('#output')
            .should('contain.text',
              "%questionnaire.item.where(linkId ='44258-2').answerOption");

          // The total calculation should only include the two selected items.
          cy.get('#output')
          .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
            '+ iif(%b.exists(), %b, 0), {})"');
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
