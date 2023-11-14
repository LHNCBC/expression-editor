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
      
        // Once canceled, it should show the Rule Editor screen with 0 variables
        cy.get('div.rule-editor').should('exist').within( ()=> {
          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 0);
        
          cy.get('#add-variable').should('exist').should('be.visible');
  
          cy.get('#export').should('exist').should('be.visible');
        });
      });

      it('should display the scoring items selection', () => {
        // Only the prompt for score calculation should show up
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('#selectAll').should('exist');
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

            // Select All
            cy.get('#selectAll').should('exist').click();
            cy.get('.angular-tree-component [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });

            // Unselect All
            cy.get('#unselectAll').click();
            cy.get('.angular-tree-component [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('not.be.checked');
            });
          });
      });

      it('should be able to select/unselect individual item', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');

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
            cy.get('div.items-tree').should('exist');
            cy.get('div.items-tree tree-node').should('have.length', 9);
          });

        // Click Cancel
        cy.get('#skip-export-score').click()
        cy.get('.rule-editor').should('not.have.text', ' Select items to include in the score calculation: ');

        // Once canceled, it should show the Rule Editor screen with 0 variables
        cy.get('div.rule-editor').should('exist').within( ()=> {
          // Variables section
          cy.get('lhc-variables > h2').should('contain', 'Item Variables');
          cy.get('#variables-section .variable-row').should('have.length', 0);
        
          cy.get('#add-variable').should('exist').should('be.visible');
  
          cy.get('#export').should('exist').should('be.visible');
        });

      });

      it('should be able to export score with selected individual items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');
            
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

          // the Rule-Editor div panel should be hidden
          cy.get('div.rule-editor').should('not.exist');
          
          cy.get('#output')
          .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
            '+ iif(%b.exists(), %b, 0), {})"');
      });

      it('should be able to export score with all items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 9);
            
            // Check the Select All button
            cy.get('#selectAll').should('exist').click();
            cy.get('.angular-tree-component [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });
          });  
          cy.get('#export-score').click();

          // the Rule-Editor div panel should be hidden
          cy.get('div.rule-editor').should('not.exist');

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
            //cy.get('.item-filter').should('exist');
            cy.get('div.items-tree').should('exist');
            cy.get('div.items-tree tree-node').should('have.length', 20);
          });
      });

      it('should be able to collap/expand group', () => {
        // Only the prompt for score calculation should show up
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-title').should('have.text', ' Select items to include in the score calculation: ');
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            // Expand All button should be visible and the tree should be expanded by default  
            cy.get('#expandAll').should('exist').should('be.visible');
            cy.get('div.items-tree tree-node').should('have.length', 20);

            cy.get('#collapseAll').click();
            cy.get('div.items-tree tree-node').should('have.length', 7);
          });
      });

      it('should be able to export score with all items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 20);
            
            // Check the Select All button
            cy.get('#selectAll').should('exist').click();
            cy.get('.angular-tree-component [type="checkbox"]').each(($checkbox) => {
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
              "%questionnaire.item.where(linkId = '/45900-0').item.where(linkId = '/45900-0/44250-9').answerOption");
          
          // Item not in a group
          cy.get('#output')
            .should('contain.text', "%questionnaire.item.where(linkId = '/44251-7').answerOption");

          cy.get('#output')
            .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
              '+ iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) ' +
              '+ iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0) + iif(%g.exists(), %g, 0) ' +
              '+ iif(%h.exists(), %h, 0) + iif(%i.exists(), %i, 0) + iif(%j.exists(), %j, 0) ' +
              '+ iif(%k.exists(), %k, 0) + iif(%l.exists(), %l, 0) + iif(%m.exists(), %m, 0) ' +
              '+ iif(%n.exists(), %n, 0) + iif(%o.exists(), %o, 0) + iif(%p.exists(), %p, 0) ' +
              '+ iif(%q.exists(), %q, 0), {})"');          
      });

      it('should be able to export score with selected individual items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 20);
            cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');
            
            // Select an item from "Group 1"
            cy.get('@checkboxes').eq(1).check();

            // Select an item that has no sub group/item
            cy.get('@checkboxes').eq(4).check();

            // Select a scoring parent item
            cy.get('@checkboxes').eq(8).check();

            // Select a child item of the parent scoring item
            cy.get('@checkboxes').eq(9).check();

            // Select a parent item that has a child of type 'group'
            cy.get('@checkboxes').eq(12).check();
            
            // Select a child item under the child of type 'group'
            cy.get('@checkboxes').eq(14).check();

            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 1 || index === 4 || index === 8 || index === 9 ||
                  index === 12 || index === 14)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
          });  
        cy.get('#export-score').click();

        // The total calculation should only include the two selected items.
        cy.get('#output')
          .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
            '+ iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0) ' +
            '+ iif(%e.exists(), %e, 0) + iif(%f.exists(), %f, 0), {})"');

        cy.get('pre#output').invoke('text').then((jsonData) => {
          // Parse the JSON data
          const parsedData = JSON.parse(jsonData);

          expect(parsedData.item).to.exist;
          expect(parsedData.item).to.have.lengthOf(10);
          
          // the 9th item should be the total calculation
          expect(parsedData.item[8].linkId).to.exist;
          expect(parsedData.item[8].linkId).to.eq('/39156-5');
          expect(parsedData.item[8].text).to.eq('Patient health questionnaire 15 item total score');
          // should contain extension
          expect(parsedData.item[8].extension).to.exist;
          expect(parsedData.item[8].extension).to.have.lengthOf(12);

          // variable a
          expect(parsedData.item[8].extension[4].valueExpression).to.exist;
          expect(parsedData.item[8].extension[4].valueExpression.name).to.eq('a');
          expect(parsedData.item[8].extension[4].valueExpression.expression)
            .to.have.string("%questionnaire.item.where(linkId = '/45900-0').item.where(linkId = '/45900-0/44255-8').answerOption");

          // variable b
          expect(parsedData.item[8].extension[5].valueExpression).to.exist;
          expect(parsedData.item[8].extension[5].valueExpression.name).to.eq('b');
          expect(parsedData.item[8].extension[5].valueExpression.expression)
            .to.have.string("%questionnaire.item.where(linkId = '/44251-7').answerOption");

          // variable c
          expect(parsedData.item[8].extension[6].valueExpression).to.exist;
          expect(parsedData.item[8].extension[6].valueExpression.name).to.eq('c');
          expect(parsedData.item[8].extension[6].valueExpression.expression)
            .to.have.string("%questionnaire.item.where(linkId = '/44252-5').answerOption");

          // variable d
          expect(parsedData.item[8].extension[7].valueExpression).to.exist;
          expect(parsedData.item[8].extension[7].valueExpression.name).to.eq('d');
          expect(parsedData.item[8].extension[7].valueExpression.expression)
            .to.have.string("%questionnaire.item.where(linkId = '/44252-5').item.where(linkId = '/44252-5/44250-9').answerOption");

          // variable e
          expect(parsedData.item[8].extension[8].valueExpression).to.exist;
          expect(parsedData.item[8].extension[8].valueExpression.name).to.eq('e');
          expect(parsedData.item[8].extension[8].valueExpression.expression)
            .to.have.string("%questionnaire.item.where(linkId = '/44260-8').answerOption");

          // variable f
          const variable9Exp = "%questionnaire.item.where(linkId = '/44260-8')\
.item.where(linkId = '/44260-8/45907-0').item.where(linkId = '/44260-8/45907-0/44255-8').answerOption";
          expect(parsedData.item[8].extension[9].valueExpression).to.exist;
          expect(parsedData.item[8].extension[9].valueExpression.name).to.eq('f');
          expect(parsedData.item[8].extension[9].valueExpression.expression).to.have.string(variable9Exp);         
        });
      });

      it('should include non-scoring items/groups in the export', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 20);
            
            // Check the Select All button
            cy.get('#selectAll').should('exist').click();
            cy.get('.angular-tree-component [type="checkbox"]').each(($checkbox) => {
              cy.wrap($checkbox).should('be.checked');
            });
          });  
          cy.get('#export-score').click();

          cy.get('pre#output').invoke('text').then((jsonData) => {
            // Parse the JSON data
            const parsedData = JSON.parse(jsonData);
  
            expect(parsedData.item).to.exist;
            expect(parsedData.item).to.have.lengthOf(10);

            // Non-scoring item under Group 1
            expect(parsedData.item[0].type).to.eq('group');
            expect(parsedData.item[0].item).to.exist;
            expect(parsedData.item[0].item).to.have.lengthOf(5);
            expect(parsedData.item[0].item[4].linkId).to.eq('/45900-0/46613-6');
            expect(parsedData.item[0].item[4].text).to.eq('Non-scoring item - child of group 1');

            // Non-scoring item at parent level
            expect(parsedData.item[2].type).to.eq('choice');
            expect(parsedData.item[2].linkId).to.eq('/44453-5');
            expect(parsedData.item[2].text).to.eq('Non-scoring item');
            
            // Non-scoring item at parent level with child scoring items
            expect(parsedData.item[4].type).to.eq('choice');
            expect(parsedData.item[4].item).to.exist;
            expect(parsedData.item[4].item).to.have.lengthOf(3);
            expect(parsedData.item[4].linkId).to.eq('/44253-5');
            expect(parsedData.item[4].text).to.eq('Non-scoring item and its child scoring items');            

            // Non-scoring item at child level of non-scoring parent item
            expect(parsedData.item[4].type).to.eq('choice');
            expect(parsedData.item[4].item).to.exist;
            expect(parsedData.item[4].item).to.have.lengthOf(3);
            expect(parsedData.item[4].item[0].linkId).to.eq('/44253-5/46613-6');
            expect(parsedData.item[4].item[0].text).to.eq('Non-scoring item - child of non-scoring item');            

            // Non-scoring item at child level of scoring parent item
            expect(parsedData.item[5].type).to.eq('choice');
            expect(parsedData.item[5].item).to.exist;
            expect(parsedData.item[5].item).to.have.lengthOf(3);
            expect(parsedData.item[5].item[0].linkId).to.eq('/44252-5/46613-6');
            expect(parsedData.item[5].item[0].text).to.eq('Non-scoring item - child of scoring item');            


            // Non-scoring item at 3rd level of parent group and scoring item grand parent
            expect(parsedData.item[7].type).to.eq('choice');
            expect(parsedData.item[7].item).to.exist;
            expect(parsedData.item[7].item).to.have.lengthOf(1);
            expect(parsedData.item[7].item[0].type).to.eq('group');
            expect(parsedData.item[7].item[0].item).to.exist;
            expect(parsedData.item[7].item[0].item).to.have.lengthOf(5);
            expect(parsedData.item[7].item[0].item[3].linkId).to.eq('/44260-8/45907-0/46613-6');
            expect(parsedData.item[7].item[0].item[3].text).to.eq('Non-scoring item - child of Sub group 1');            

          });
         
      });
    });

    describe('PHQ9 Pre-selected score calculation', () => {
      beforeEach(() => {
        cy.get('#questionnaire-select').select('PHQ9 Pre-selected (no FHIRPath)');
      });

      it('should load up with pre-selected items', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 17);
            cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');

            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 1 || index === 4 || index === 6 || index === 8 ||
                  index === 10 || index === 13)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });
          });
      });

      it('should be able to deselect, select items and export correctly', () => {
        cy.get('#score-items-selection').click();
        cy.get('div.scoring-items-selection-body')
          .within(() => {
            cy.get('div.items-tree tree-node').should('have.length', 17);
            cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');

            cy.get('@checkboxes').eq(1).uncheck();
            cy.get('@checkboxes').eq(4).uncheck();
            cy.get('@checkboxes').eq(6).uncheck();
            cy.get('@checkboxes').eq(8).uncheck();
            cy.get('@checkboxes').eq(10).uncheck();
            cy.get('@checkboxes').eq(13).uncheck();

            cy.get('@checkboxes').eq(2).check();
            cy.get('@checkboxes').eq(5).check();
            cy.get('@checkboxes').eq(7).check();
            cy.get('@checkboxes').eq(14).check();

            // Validate to make sure that only those two items were selected
            cy.get('@checkboxes').each(($checkbox, index) => {
              if (index === 2 || index === 5 || index === 7 || index === 14)
                cy.wrap($checkbox).should('be.checked');
              else
                cy.wrap($checkbox).should('not.be.checked');
            });            
          });
          cy.get('#export-score').click();

          // The total calculation should only include the two selected items.
          cy.get('#output')
            .should('contain.text', '"expression": "iif(%any_questions_answered, iif(%a.exists(), %a, 0) ' +
              '+ iif(%b.exists(), %b, 0) + iif(%c.exists(), %c, 0) + iif(%d.exists(), %d, 0), {})"');

          cy.get('pre#output').invoke('text').then((jsonData) => {
            // Parse the JSON data
            const parsedData = JSON.parse(jsonData);

            expect(parsedData.item).to.exist;
            expect(parsedData.item).to.have.lengthOf(8);
            
            // the 7th item should be the total calculation
            expect(parsedData.item[6].linkId).to.exist;
            expect(parsedData.item[6].linkId).to.eq('/39156-5');
            expect(parsedData.item[6].text).to.eq('Patient health questionnaire 15 item total score');
            // should contain extension
            expect(parsedData.item[6].extension).to.exist;
            expect(parsedData.item[6].extension).to.have.lengthOf(10);

            // variable a
            expect(parsedData.item[6].extension[4].valueExpression).to.exist;
            expect(parsedData.item[6].extension[4].valueExpression.name).to.eq('a');
            expect(parsedData.item[6].extension[4].valueExpression.expression)
              .to.have.string("%questionnaire.item.where(linkId = '/45900-0').item.where(linkId = '/45900-0/44259-0').answerOption");

            // variable b
            expect(parsedData.item[6].extension[5].valueExpression).to.exist;
            expect(parsedData.item[6].extension[5].valueExpression.name).to.eq('b');
            expect(parsedData.item[6].extension[5].valueExpression.expression)
              .to.have.string("%questionnaire.item.where(linkId = '/44258-2').answerOption");

            // variable c
            expect(parsedData.item[6].extension[6].valueExpression).to.exist;
            expect(parsedData.item[6].extension[6].valueExpression.name).to.eq('c');
            expect(parsedData.item[6].extension[6].valueExpression.expression)
              .to.have.string("%questionnaire.item.where(linkId = '/44252-5').item.where(linkId = '/44252-5/44250-9').answerOption");

            // variable d
            const variable9Exp = "%questionnaire.item.where(linkId = '/44260-8')\
.item.where(linkId = '/44260-8/45907-0').item.where(linkId = '/44260-8/45907-0/44254-1').answerOption";
            expect(parsedData.item[6].extension[7].valueExpression).to.exist;
            expect(parsedData.item[6].extension[7].valueExpression.name).to.eq('d');
            expect(parsedData.item[6].extension[7].valueExpression.expression).to.have.string(variable9Exp);
          });
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
