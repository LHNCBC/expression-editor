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
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

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

      // The "Root Level" checkbox should be checked by default
      cy.get('#root-level').should('exist').should('be.checked');

      // Select a question
      cy.get('#question').clear().type('BMI');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      //The "Root Level" checkbox should be unchecked
      cy.get('#root-level').should('exist').should('not.be.checked');

      // By default, the Output Expression is set to 'Calculated Expression'
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

      // The prompt to calculate the total scoring item should not 
      // exists until a question is selected
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // The "Root Level" checkbox should be checked by default
      cy.get('#root-level').should('exist').should('be.checked');

      // Select a question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      //The "Root Level" checkbox should be unchecked
      cy.get('#root-level').should('exist').should('not.be.checked');

      // By default, the Output Expression is set to 'Calculated Expression'
      cy.get('div#expression-entry > select').should('have.value', '1');

      // The prompt to calculate the total scoring item should displayed.
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');

      // The prompt should come with a Yes and No buttons
      cy.get('#score-items-selection').should('exist');
      cy.get('#skip-score-items-selection').should('exist');

      // Select No
      cy.get('#skip-score-items-selection').click();

      // By selecting No, the prompt should be gone.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // The list of scoring items should not be displayed
      cy.get('lhc-select-scoring-items').should('not.exist');
    });

    it('should not display the calculate sum prompt when select the first question', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // The prompt to calculate the total scoring item should not 
      // exists until a question is selected
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select the first question. The scoring items have to come from prior questions.
      // So if this is the first question, then there won't be any scoring items. 
      cy.get('#question').clear().type('Little interest or pleasure');
      cy.get('span#completionOptions > ul > li').contains('44250-9').click();
      // The prompt should not be displayed.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select the second question and the prompt should be displayed.
      cy.get('#question').clear().type('Feeling down, depressed');
      cy.get('span#completionOptions > ul > li').contains('44255-8').click();
      // The prompt should be displayed.
      cy.get('lhc-calculate-sum-prompt').should('exist');

    });

    it('should not get calculate sum prompt when the output expression is not Calculate Expression', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      // Select a question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // By default, the Output Expression is set to 'Calculated Expression'
      cy.get('div#expression-entry > select').should('have.value', '1');

      // The prompt to calculate the total scoring item should displayed.
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');

      // Select No
      cy.get('#skip-score-items-selection').click();

      // The prompt should disappeared
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select 'Answer Expression' for the 'Output Expression'
      cy.get('div#expression-entry > select').select('Answer Expression').should('have.value', '0');
      // The prompt should not be displayed
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select 'Enable When Expression' for the 'Output Expression'
      cy.get('div#expression-entry > select').select('Enable When Expression').should('have.value', '3');
      // The prompt should not be displayed
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select 'Initial Expression' for the 'Output Expression'
      cy.get('div#expression-entry > select').select('Initial Expression').should('have.value', '4');
      // The prompt should not be displayed
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Select 'Calculated/Initial Expression (user editable)' for the 'Output Expression'
      cy.get('div#expression-entry > select').select('Calculated/Initial Expression (user editable)')
        .should('have.value', '2');
      // The prompt should be displayed
      cy.get('lhc-calculate-sum-prompt').should('exist');
      // Select No
      cy.get('#skip-score-items-selection').click();

      // Select 'Calculated/Initial Expression (user editable)' for the 'Output Expression'
      cy.get('div#expression-entry > select').select('Other...').should('have.value', 'custom');
      // The prompt should not be displayed
      cy.get('lhc-calculate-sum-prompt').should('not.exist');
      // Enter the expression uri that is not the Calculated Expression
      cy.get('input#expression-uri').clear()
        .type('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression');
      // The prompt should not be displayed
      cy.get('lhc-calculate-sum-prompt').should('not.exist');
      // Enter the expression uri that is not the Calculated Expression
      cy.get('input#expression-uri').clear()
        .type('http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression');
      // The prompt should be displayed
      cy.get('lhc-calculate-sum-prompt').should('exist');
    });

    it('should not display the calculate sum prompt if contain pre-selected scoring without new scoring extension', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('../test/data/phq9_preselected_without_scoring_ext.json');

      cy.get('lhc-rule-editor h1').should('contain.text', 'Rule Editor');

      // The prompt to calculate the total scoring item should not 
      // exists until a question is selected
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // The item total score question already had predefined scoring items
      // but without the new scoring extensions.  So in this case, the Rule
      // Editor should not prompt for scoring calculation.
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('44261-6').click();
      // The prompt should not be displayed.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');

      // Selecting a different question that does not have predefined scoring
      // items should still get prompt
      cy.get('#question').clear().type('Feeling bad about yourself');
      cy.get('span#completionOptions > ul > li').contains('44258-2').click();
      // The prompt should be displayed.
      cy.get('lhc-calculate-sum-prompt').should('exist');

    });

    it('should display the scoring items selection', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');

      cy.get('#file-upload').attachFile('phq9.json');

      cy.get('lhc-select-scoring-items').should('not.exist');

      // Enter the question to select
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // By default, the Output Expression is set to 'Calculated Expression'
      cy.get('div#expression-entry > select').should('have.value', '1');

      // A prompt to calculate the total scoring
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');

      // The prompt should come with a Yes and No buttons
      cy.get('#score-items-selection').should('exist');
      cy.get('#skip-score-items-selection').should('exist');

      // Select Yes
      cy.get('#score-items-selection').click();

      // The prompt to caculate the total scoring should be hidden.
      cy.get('lhc-calculate-sum-prompt').should('not.exist');
      
      // The list of scoring items for selection should be displayed.
      cy.get('lhc-select-scoring-items').should('exist');
    });

    it('should be able to display pre-selected scoring items questionnaire and update it', () => {
      cy.get('select#questionnaire-select').select('Upload your own questionnaire');
      cy.get('#file-upload').attachFile('phq9_preselected.json');

      // Select total score question
      cy.get('#question').clear().type('item total score');
      cy.get('span#completionOptions > ul > li').contains('39156-5').click();

      // By default, the Output Expression is set to 'Calculated Expression'
      cy.get('div#expression-entry > select').should('have.value', '1');

      // Calculating sum of score dialog should display, select Yes 
      cy.get('lhc-calculate-sum-prompt > div > div.score-modal').should('exist');
      cy.get('#score-items-selection').click();

      // The Scoring Item panel should now display
      cy.get('lhc-select-scoring-items').should('exist');
      cy.get('div.scoring-items-selection-body')
      .within(() => {
        cy.get('div.items-tree tree-node').should('have.length', 17);
        cy.get('.angular-tree-component  [type="checkbox"]').as('checkboxes');

        // Validate to make sure that only those six items were selected
        cy.get('@checkboxes').each(($checkbox, index) => {
          if (index === 1 || index === 4 || index === 6 || index === 8 ||
              index === 10 || index === 13)
            cy.wrap($checkbox).should('be.checked');
          else
            cy.wrap($checkbox).should('not.be.checked');
        });

        // Select 4 more items
        cy.get('@checkboxes').eq(0).check();
        cy.get('@checkboxes').eq(2).check();
        cy.get('@checkboxes').eq(3).check();
        cy.get('@checkboxes').eq(5).check();
      });

      // export 
      cy.get('#export-score').click();

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
        expect(parsedData.item[6].extension).to.have.lengthOf(16);

        // Validate to make sure that the calculatedExpression only occurs once.
        // As in, the update should not result in duplicate expression.
        let counter = 0;
        parsedData.item[6].extension.forEach((extension) => {
          if (extension.url &&
              extension.url === "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression") {
            counter++;
          }
        });
        expect(counter).to.eq(1);
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
