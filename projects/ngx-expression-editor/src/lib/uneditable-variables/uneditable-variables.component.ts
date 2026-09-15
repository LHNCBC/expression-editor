import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpressionEditorService, SimpleStyle } from '../expression-editor.service';
import { UneditableVariable } from '../variable';

@Component({
  selector: 'lhc-uneditable-variables',
  templateUrl: './uneditable-variables.component.html',
  styleUrls: ['./uneditable-variables.component.css', '../styles/section.css']
})
export class UneditableVariablesComponent implements OnInit, OnDestroy {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() isSectionExpanded = true;
  @Input() isExtractionExpression = false;
  @Input() hasItemContext = false;

  uneditableVariables: UneditableVariable[];
  uneditableVariablesSubscription;

  private variableService = inject(ExpressionEditorService);
  private sectionExpansionState = new Map<string, boolean>();

  private readonly extractionContextVariables: UneditableVariable[] = [
    {
      name: 'resource',
      type: 'QuestionnaireResponse',
      description: 'Root of the QuestionnaireResponse'
    },
    {
      name: 'context',
      type: 'QuestionnaireResponse context',
      description: 'Current QuestionnaireResponse item, or the QuestionnaireResponse at the root level'
    },
    {
      name: 'questionnaire',
      type: 'Questionnaire',
      description: 'Questionnaire being processed'
    },
    {
      name: 'qitem',
      type: 'Questionnaire item',
      description: 'Current item in the Questionnaire'
    }
  ];

  /**
   * Split extraction variables into read-only sections without mixing ordinary
   * Questionnaire variables with IDs allocated by the extraction process.
   */
  get variableSections(): Array<{title: string; variables: UneditableVariable[]}> {
    const variables = this.uneditableVariables ?? [];

    if (!this.isExtractionExpression) {
      return variables.length ? [{
        title: 'Variables in Scope for This Item',
        variables
      }] : [];
    }

    return [
      {
        title: 'Extraction Context Variables',
        variables: this.extractionContextVariables.filter(variable =>
          variable.name !== 'qitem' || this.hasItemContext)
      },
      {
        title: 'Allocated ID Variables',
        variables: variables.filter(variable => variable.type === 'Allocated ID')
      }
    ].filter(section => section.variables.length > 0);
  }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.uneditableVariables = this.variableService.uneditableVariables;
    this.uneditableVariablesSubscription =
        this.variableService.uneditableVariablesChange.subscribe((variables) => {
      this.uneditableVariables = variables;
    });
  }

  /**
   * Angular lifecycle hook called before the component is destroyed
   */
  ngOnDestroy(): void {
    this.uneditableVariablesSubscription.unsubscribe();
  }

  /**
   * Toggles the expanded state of the component.
   */
  isExpanded(sectionTitle: string): boolean {
    return this.sectionExpansionState.get(sectionTitle) ??
      (sectionTitle === 'Extraction Context Variables' ? false : this.isSectionExpanded);
  }

  toggle(sectionTitle: string) {
    this.sectionExpansionState.set(sectionTitle, !this.isExpanded(sectionTitle));
  }
}
