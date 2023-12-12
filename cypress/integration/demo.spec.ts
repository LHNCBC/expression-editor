describe('Rule editor demo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('upload', () => {
    it('should not show a Rule Editor before uploading a questionnaire', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('lhc-rule-editor').should('not.exist');
    });

    it('should successfully upload a JSON file', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('bmi.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      cy.get('#final-expression').should('not.exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Updating the linkId should update the Rule Editor instantly
      cy.get('#question').type('bmi');
      cy.contains('39156-5').click();

      cy.get('#final-expression').should('have.value', '(%a/(%b.power(2))).round(1)');

      cy.get('#expression-entry > select').select('2');
      cy.get('#expression-type').find(':selected').should('contain.text', 'Computed continuously');

      cy.get('#export').click();
      cy.get('#output').should('contain.text', 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression');
      cy.get('#expression-type').select('Only computed when the form loads');
      cy.get('#export').click();
      cy.get('#output').should('contain.text', 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression');
    });

    it('should not display the calculate sum prompt for non-scoring questionnaire', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('bmi.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // Variables section should have 0 item.
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 0);

      // Output Expression drop-down should not exists
      cy.get('#expression-entry').should('exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Select a question
      cy.get('#question').clear().type('BMI');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // Output Expression drop-down should exists
      cy.get('#expression-entry > select').should('exist').should('have.value', '1');

      // The questionnaire does not contain the scoring items, so it should not
      // prompt for total scoring calculation.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');
    });

    it('should display the calculate sum prompt when a question is selected', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // Variables section should have 0 item.
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 0);

      // Output Expression drop-down should not exists
      cy.get('#expression-entry').should('exist');

      // The prompt to calculate the total scoring item should not 
      // exists yet until a question is selected
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Select a question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // The prompt to calculate the total scoring item should displayed.
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');
    });

    it('should hide the calculate sum prompt', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // Variables section should have 0 item.
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 0);

      // Output Expression drop-down should not exists
      cy.get('#expression-entry').should('exist');

      // The prompt to calculate the total scoring item should not 
      // exists yet until a question is selected
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Select a question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // The prompt to calculate the total scoring item should displayed.
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');

      // Select No
      cy.get('#skip-score-items-selection').click();

      // By selecting No, the prompt should be gone.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // The list of scoring items should not be displayed
      cy.get('lhc-select-scoring-items').should('not.exist');
    });

    it('should display the scoring items selection', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // Variables section should have 0 item.
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 0);

      // Output Expression drop-down should not exists
      cy.get('#expression-entry').should('exist');

      cy.get('lhc-select-scoring-items').should('not.exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Enter the question to select
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // A prompt to calculate the total scoring
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');
      // Select Yes
      cy.get('#score-items-selection').click();

      // The prompt to caculate the total scoring should be hidden.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');
      
      // The list of scoring items for selection should be displayed.
      cy.get('lhc-select-scoring-items').should('exist');
    });

    it('should be able to display pre-selected items', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');
      cy.get('#file-upload').attachFile('phq9_preselected.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // Variables section should have 0 item.
      cy.get('lhc-variables > h2').should('contain', 'Item Variables');
      cy.get('#variables-section .variable-row').should('have.length', 0);

      cy.get('#expression-entry').should('exist');

      // Output Expression drop-down should not exists until a question is selected
      cy.get('lhc-select-scoring-items').should('not.exist');

      // Uncheck the "Root Level" checkbox
      cy.get('#root-level').should('exist').should('be.checked').uncheck();

      // Select total score question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // Calculating sum of score dialog should display, select Yes 
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');
      cy.get('#score-items-selection').click();

      // The Scoring Item panel should now display
      cy.get('lhc-select-scoring-items').should('exist');
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

    it('should not display the calculate sum prompt carried over from previous Questionnaire', () => {
      // load PHQ9 (no FHIRPath) questionnaire
      cy.get('select#questionnaire-select').select('PHQ9 (no FHIRPath)');

      // Calculating sum of score dialog should display, select Yes 
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');
      cy.get('#score-items-selection').click();

      // The Scoring Item panel should now display
      cy.get('lhc-select-scoring-items').should('exist');
      
      // Upload a new questionnaire
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');
      // Select a non-scoring questionnaire
      cy.get('#file-upload').attachFile('bmisimple.json');

      // The 'Root level' checkbox should be displayed and checked.
      cy.get('#root-level').should('exist').should('be.checked');

      // A prompt to calculate the total scoring should NOT be displayed.
      // The issue found was that the scoreCalculation flag was set to true and did 
      // not get reset when a new questionnaire was loaded.  The prompt would get 
      // displayed despite whether the new questionnaire contained scoring items or not.
      // With the fix in place, the prompt should only appear if the new questionnaire
      // contains scoring items and a question is selected. 
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('not.exist');

    });

  });
});
