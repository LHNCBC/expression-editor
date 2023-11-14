import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RuleEditorService, SimpleStyle } from '../rule-editor.service';
import {ITreeOptions, KEYS, TREE_ACTIONS, TreeComponent} from '@bugsplat/angular-tree-component';
import {TreeNode} from '@bugsplat/angular-tree-component/lib/defs/api';

@Component({
  selector: 'lhc-select-scoring-items',
  templateUrl: './select-scoring-items.component.html',
  styleUrls: ['./select-scoring-items.component.css']
})
export class SelectScoringItemsComponent implements OnInit {
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
    useTriState: false,
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
    levelPadding: 40,
    useVirtualScroll: false,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    scrollContainer: document.documentElement // HTML
  };

  constructor(private ruleEditorService: RuleEditorService) { }

  /**
   * Angular lifecycle hook called when the component is initialized
   */
  ngOnInit(): void {
    this.selectedLinkIds = this.ruleEditorService.getSelectedScoringLinkIds(this.items);

    // Get items that can be used for Scoring calculation
    this.scoringItems = this.ruleEditorService.getScoreItems(this.items);
    this.hasChildren = this.hasChildItems(this.scoringItems);
    // If there are child items, if yes then we want to expand the tree by default.
    this.expandAll = this.hasChildren;
  };

  /**
   * Check to see if child items exist.
   * @param items - Questionnaire item array
   * @return True if any item has at least one child 
   */
  private hasChildItems(items): boolean {
    return items.some((item) => {
      return item.hasOwnProperty('item') && item.item.length > 0;
    });
  }

  /**
   * Set the state whether to Select All or Unselect All tree nodes.
   * @param status - true to select all and false to unselect all
   */
  setSelectAllState(status) {
    const hiddenNodes = this.itemTree.treeModel.hiddenNodes;

    const toggleItemHierarchy = (node, status) => {

      // Only toggle if node.isActive is opposite from status 
      if (node.data.type === 'choice' && status !== node.isActive && node.data.hasScore)
        node.toggleActivated(true);
  
      if (node.hasChildren) {
        node.children.forEach((subItem) => toggleItemHierarchy(subItem, status));
      }
    };
    
    this.itemTree.treeModel.getVisibleRoots().forEach((item) => toggleItemHierarchy(item, status));
  }

  /**
   * Set the state whether to Expand All or Collapse All the tree model.
   * @param status - true to expand all and false to collapse all
   */
  setExpandAllState(expand) {
    if (expand) {
      this.itemTree.treeModel.expandAll();
    } else {
      this.itemTree.treeModel.collapseAll();
    }
  }

  /**
   * Close the dialog by specifying this should not calculate the score
   */
  onCloseClick(): void {
    this.ruleEditorService.toggleScoreCalculation();
  }

  /**
   * Export the sum of scores as a FHIR Questionnaire
   */
  onExportClick(): void {
    const selectedItemLinkIds = this.itemTree.treeModel.getActiveNodes()
                                  .map((node) => node.data.linkId);
    this.ruleEditorService.setItemLinkIdsForTotalCalculation(selectedItemLinkIds);
    this.export.emit();
  }

  /**
   * If the questionnaire already contains selected items for the calculation,
   * toggle selection that match the link ids. 
   */
  private checkCheckboxScoringItems(): void {
    if (this.selectedLinkIds && this.selectedLinkIds.length > 0) {
      this.itemTree.treeModel.doForAll((node:TreeNode) => {
        if (this.selectedLinkIds.includes(node.data.linkId)) {
          node.toggleActivated(true);
        }
      });
    }    
  }

  /**
   * This gets called when the angular-tree-model tree model is created. Check for
   * pre-selected items and expand the tree if it contains grandchildren nodes. 
   * @param tree - tree model
   */  
  onTreeLoad(tree): void {
    this.checkCheckboxScoringItems();
    if (this.expandAll)
      this.setExpandAllState(true);
  }
}
