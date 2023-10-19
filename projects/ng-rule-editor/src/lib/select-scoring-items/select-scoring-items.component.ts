import { Component, EventEmitter, Input, OnInit, AfterViewInit, Output, ViewChild } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import {ITreeOptions, KEYS, TREE_ACTIONS, TreeComponent} from '@bugsplat/angular-tree-component';
import {TreeNode} from '@bugsplat/angular-tree-component/lib/defs/api';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'lhc-select-scoring-items',
  templateUrl: './select-scoring-items.component.html',
  styleUrls: ['./select-scoring-items.component.css']
})
export class SelectScoringItemsComponent implements OnInit, AfterViewInit {
  @Input() lhcStyle: SimpleStyle = {};
  @Input() items = [];
  @Output() export: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('itemTree') itemTree: TreeComponent;
  @ViewChild('filter') filter: string;

  selectedLinkIds: string[] = [];
  scoringItems = [];
  selectedItems: string[] = [];
  selectAll = false;
  expandAll = false;
  hasChildren = false;

  itemList = [];
  selectedItemsSet = new Set<string>();

  options: ITreeOptions = {
    displayField: 'text',
    childrenField: 'item',
    isExpandedField: 'true',
    idField: 'linkId',
    useCheckbox: true,
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) { TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event); }
        },
        click: TREE_ACTIONS.TOGGLE_ACTIVE_MULTI
      },
      keys: {
        [KEYS.SPACE]: TREE_ACTIONS.TOGGLE_EXPANDED,
        [KEYS.ENTER]: (tree, node, $event) => {
          TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
      }
    },
    nodeHeight: 23,
    dropSlotHeight: 23,
    allowDrag: (node) => {
      return false;
    },
    allowDrop: (node) => {
      return false;
    },
    levelPadding: 10,
    useVirtualScroll: false,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    scrollContainer: document.documentElement // HTML
  };

  constructor(private ruleEditorService: RuleEditorService, private liveAnnouncer: LiveAnnouncer) { }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {};

  /**
   * Check to see if child items exist.
   */
  private hasChildItems(items): boolean {
    return items.some((item) => {
      return item.hasOwnProperty('item') && item.item.length > 0;
    });
  }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngAfterViewInit(): void {
    // Get items that can be used for Scoring calculation
    this.scoringItems = this.ruleEditorService.getItemsForTotalCalculation(this.items);
    this.hasChildren = this.hasChildItems(this.scoringItems);
    // If there are child items, if yes then we want to expand the tree by default.
    this.expandAll = this.hasChildren;

    this.selectedLinkIds = this.ruleEditorService.getSelectedScoringLinkIds(this.items);
  };


  /**
   * Triggers when Select All checkbox is checked/unchecked. Loop through and set
   * all nodes to check or uncheck.
   */
  toggleSelectAll() {
    if (this.selectAll) {
      this.itemTree.treeModel.doForAll((node:TreeNode) => {
        node.setIsSelected(true);
      });
    } else {
      this.itemTree.treeModel.doForAll((node:TreeNode) => {
        node.setIsSelected(false);
      })
    }
  }

  /**
   * Expand or collapse the tree if it has children nodes.
   */
  toggleExpandAll() {
    if (this.expandAll) {
      this.itemTree.treeModel.expandAll();
    } else {
      this.itemTree.treeModel.collapseAll();
    }
  }

  /**
   * Close the dialog by specifying this should not be a score calculation
   */
  onCloseClick(): void {
    this.ruleEditorService.toggleMightBeScore();
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onExportClick(): void {
    const selectedItems = [...this.selectedItemsSet];
    this.ruleEditorService.setItemLinkIdsForTotalCalculation(selectedItems);
    this.export.emit();
  }

  /* 
   * This gets called when a checkbox is checked.  It does not get called when users
   * click on the row (activate event).
   */
  onSelectItems(event) {
    let pushdata: any = [];
    pushdata.push(event.node.data);
    this.selectedItemsSet.add(pushdata[0].linkId);
  }

  /* 
   * This gets called when a checkbox is unchecked.
   */
  onDeselectItems(event) {
    let pushdata: any = [];
    pushdata.push(event.node.data);
    this.selectedItemsSet.delete(pushdata[0].linkId);
  }

  /**
   * Wait for the angular-tree-component to finish loading.  Then 
   * if the selectedLinkIds is not empty, then select checkboxes 
   * that match the link ids.
   */
  private checkCheckboxScoringItems(): void {
    if (this.selectedLinkIds && this.selectedLinkIds.length > 0) {
      this.itemTree.treeModel.doForAll((node:TreeNode) => {
        if (this.selectedLinkIds.includes(node.data.linkId)) {
          node.setIsSelected(true);

          if (node.parent)
            node.parent.expandAll();
        }
      });
    }    
  }

  /**
   * Handle tree events
   * @param event - The event.
   */
  onTreeEvent(event) {
    switch(event.eventName) {
      case 'initialized':
        this.checkCheckboxScoringItems();
        this.toggleExpandAll();
        break;
      case 'activate':
        event.node.setIsActive(false);
        break;
      case 'select':
        this.liveAnnouncer.announce(`"${event.node.data.text}" is selected.`);
        this.onSelectItems(event);
        break;
      case 'deselect':
        this.onDeselectItems(event);
        break;
      default:
        break;
    }
  }
}
