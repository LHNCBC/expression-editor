describe('SDC template extraction demo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#questionnaire-select').select('SDC Template Extraction');
    cy.get('#useRootLevel').should('be.checked');
    cy.get('#question').type('Patient Information');
    cy.get('span#completionOptions > ul > li').contains('patient').click();
  });

  it('loads the contained Patient template and its allocated ID expression', () => {
    cy.get('#expression-entry > select').select('Template Extraction fullUrl');
    cy.get('#openExpressionEditor').click();

    cy.get('lhc-expression-editor').shadow().within(() => {
      cy.get('#uneditable-variables-section .variable-column-label').then(labels => {
        const names = [...labels].map(label => label.textContent.trim());
        expect(names).to.include('NewPatientId');
      });

      cy.get('#uneditable-variables-section h2')
        .should('contain.text', 'Allocated ID Variables');

      cy.get('#final-expression')
        .should('have.value', '%NewPatientId')
        .and('not.have.class', 'field-error');
      cy.get('#final-expression-section #expression-error > p').should('not.exist');
    });
  });

  it('saves a new bundle field inside the selected templateExtract extension', () => {
    cy.get('#expression-entry > select').select('Template Extraction resourceId');
    cy.get('#openExpressionEditor').click();

    cy.get('lhc-expression-editor').shadow().within(() => {
      cy.get('#final-expression')
        .should('have.value', '')
        .type('%NewPatientId')
        .should('not.have.class', 'field-error');
      cy.get('#export').click();
    });

    cy.get('pre#output').invoke('text').then((jsonData) => {
      const patientItem = JSON.parse(jsonData).item[0];
      expect(patientItem.linkId).to.equal('patient');
      expect(patientItem.extension).to.have.lengthOf(1);

      const templateExtract = patientItem.extension[0];
      expect(templateExtract.url).to.equal(
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-templateExtract'
      );
      expect(templateExtract.extension).to.deep.include({
        url: 'fullUrl',
        valueString: '%NewPatientId'
      });
      expect(templateExtract.extension).to.deep.include({
        url: 'resourceId',
        valueString: '%NewPatientId'
      });
    });
  });
});
