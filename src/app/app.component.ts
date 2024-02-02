import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Def from 'autocomplete-lhc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('autoComplete', {static: false}) autoCompleteElement: ElementRef;
  autoComplete;

  formAppearedAnnouncement = "The Rule Editor questionnaire has been loaded";
  formReloadAnnouncement = "The Rule Editor questionnaire has been reloaded";
  calculatedExpression = 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
  originalLinkId = '/39156-5';
  expressionTypes = [
    {
      name: 'Answer Expression',
      uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-answerExpression'
    },
    {
      name: 'Calculated Expression',
      uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      selected: true
    },
    {
      name: 'Calculated/Initial Expression (user editable)',
      uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
      userExpressionChoices: [
        { name: 'Computed continuously', uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression' },
        { name: 'Only computed when the form loads', uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression' }
      ]
    },
    {
      name: 'Enable When Expression',
      uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression',
    },
    {
      name: 'Initial Expression',
      uri: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression'
    }
  ];

  fhirPreview: string;
  linkId = '';
  linkIds;
  expressionUri = this.calculatedExpression;
  userExpressionChoices = null;
  customExpressionUri = false;
  fhir = null;
  questionnaire = 'bmisimple';
  file = '';
  error = '';
  doNotAskToCalculateScore = false;

  constructor(private http: HttpClient, private liveAnnouncer: LiveAnnouncer, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onChange(false);
  }

  /**
   * Used when changing the questionnaire dropdown
   * @param reload - reload the questionnaire
   */
  onChange(reload=false): void {
    // Clear out preview when changing forms
    this.fhirPreview = '';
    this.error = '';
    this.doNotAskToCalculateScore = false;

    if (this.questionnaire === '' || this.questionnaire === 'upload') {
      this.liveAnnouncer.announce('Additional settings must be entered below to load the rule editor.');
      this.fhir = null;
      this.file = '';
      this.linkId = '';
    } else {
      this.linkId = this.originalLinkId;
      this.expressionUri = this.calculatedExpression;

      this.http.get(`./${this.questionnaire}.json`)
        .subscribe(data => {
          this.fhir = data;
          this.liveAnnouncer.announce((reload) ? this.formReloadAnnouncement : this.formAppearedAnnouncement);
        });
    }
  }

  /**
   * Show a preview of the output questionnaire under the rule editor
   * @param fhirResult - questionnaire JSON structure
   */
  onSave(fhirResult): void {
    this.fhirPreview = JSON.stringify(fhirResult, null, 2);
  }

  /**
   * Cancel changes made to the Rule Editor.
   */
  onCancel(): void {
    // Reset it back to the 'bmisimple' questionnaire
    this.questionnaire = 'bmisimple';
    this.onChange(true);
  }


  /**
   * Import a questionnaire from a file using the linkId and expression URI
   * @param fileInput - input file change event
   */
  prepareForImport(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        if (typeof e.target.result === 'string') {
          this.doNotAskToCalculateScore = false;
          this.linkId = '';
          try {
            this.fhir = JSON.parse(e.target.result);
            this.error = '';
            if (this.fhir && this.fhir.item instanceof Array) {
              this.linkIds = this.getQuestionnaireLinkIds(this.fhir.item);

              this.composeAutocomplete();
            }
            this.liveAnnouncer.announce(this.formAppearedAnnouncement);
          } catch (e) {
            this.fhir = '';
            this.error = `Could not parse file: ${e}`;
            this.liveAnnouncer.announce(this.error);
          }
        } else {
          this.fhir = '';
          this.error = 'Could not read file';
          this.liveAnnouncer.announce(this.error);
        }
      };

      fileReader.readAsText(fileInput.target.files[0]);
    }
  }

  /**
   * Generate the autocomplete list 
   */
  composeAutocomplete(): void {
    const keys = this.linkIds.map(e => e.text);
    const vals = this.linkIds.map(v => v.linkId);

    let opts = {
      tableFormat: false,
      codes: vals
    }

    this.changeDetectorRef.detectChanges();

    this.autoComplete = new Def.Autocompleter.Prefetch(
      this.autoCompleteElement.nativeElement, keys, opts);

    Def.Autocompleter.Event.observeListSelections('question', (res) => {
      if (res.val_typed_in !== res.final_val && res.item_code) {
        this.linkId = res.item_code;
      }
    });

  }


  /**
   * Get the list of item link IDs in the questionnaire
   * @param items - FHIR questionnaire item array
   * @param level - Depth of item nesting, starting at 0
   * @return Array of link IDs.
   */
  getQuestionnaireLinkIds(items, level = 0): Array<string> {
    let linkIds = [];

    items.forEach((item) => {
      if (item.linkId) {
        if (item.text) {
          const indent = `${'—'.repeat(level)} `;
          linkIds.push({
            linkId: item.linkId,
            text: `${indent} ${item.text} (${item.linkId})`
          });
        } else {
          linkIds.push({
            linkId: item.linkId,
            text: item.linkId
          });
        }
      }

      if (item.item instanceof Array) {
        linkIds = linkIds.concat(this.getQuestionnaireLinkIds(item.item, level + 1));
      }
    });

    return linkIds;
  }

  /**
   * Trigger a file download of the provided data.
   * @param data - Content of the file which will be downloaded
   * @param name - Name the user sees for the file
   */
  downloadJson(data: string, name?: string): void {
    const datePipe = new DatePipe('en-US');
    const blob = new Blob([data]);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = datePipe.transform(Date.now(), 'yyyyMMdd-hhmmss');

    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = name ? `${name}.json` : `fhirpath-${date}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Called when the expression type changes
   * @param $event - Event
   */
  expressionChange($event): void {
    const newValue = $event.target.value;

    if (newValue === '') {
      this.customExpressionUri = false;
      this.expressionUri = newValue;
    } else if (newValue === 'custom') {
      this.userExpressionChoices = null;
      this.customExpressionUri = true;
      this.expressionUri = '';
    } else {
      const currentExpression = this.expressionTypes[newValue];
      this.userExpressionChoices = currentExpression.userExpressionChoices;
      this.customExpressionUri = false;
      this.expressionUri = currentExpression.uri;
    }
  }

  /**
   * Angular lifecycle hook
   */
  ngOnDestroy(): void {
    if (this.autoComplete !== undefined) {
      this.autoComplete.destroy();
    }
  }

}
