import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TreeModel, NodeEvent, TreeComponent, Tree, NodeMenuItemAction } from 'ng2-tree';
import { Project } from '../../../../model/project/project';
import { ActiveProject } from '../../services/active-project';
import { Subscription } from 'rxjs';
import { TreeEventHandler } from '../../services/tree-event-handler';

@Component({
  selector: 'editor-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit, AfterViewInit, OnDestroy {

  componentInitialized = false;
  componentInitializing = false;

  project: Project;
  subscription: Subscription;
  settings = {
    'cssClasses': {
      'expanded': 'fa fa-folder-open fa-lg tree-item-icon',
      'collapsed': 'fa fa-folder fa-lg tree-item-icon',
      'leaf': 'fa fa-file-o fa-lg tree-item-icon',
      'empty': 'fa fa-folder fa-lg disabled '
    },
    'templates': {
      'node': '<i></i>',
      'leaf': '<i></i>',
      'leftMenu': '<i></i>'
    },
    'menuItems': [
      { action: NodeMenuItemAction.NewTag, name: this.treeEventHandler.ACTIONS.newFile, cssClass: 'fa fa-file'},
      { action: NodeMenuItemAction.NewFolder, name: 'New folder', cssClass: 'fa fa-folder-o'},
      { action: NodeMenuItemAction.Rename, name: 'Rename', cssClass: 'fa fa-edit'},
      { action: NodeMenuItemAction.Custom, name: 'Remove', cssClass: 'fa fa-times'},
      { action: NodeMenuItemAction.Custom, name: 'Compile file', cssClass: 'fa fa-microchip'},
    ]
  };

  tree: TreeModel = {
    value: '/',
    settings: this.settings,
    children: [
      // {
      //   value: ' Object-oriented programming',
      //   children: [{ value: ' Java' }, { value: ' C++' }, { value: ' C#' }]
      // },
      // {
      //   value: ' Prototype-based programming',
      //   children: [{ value: ' JavaScript' }, { value: ' CoffeeScript' }, { value: ' Lua' }]
      // },
      // {
      //   value: ' .git'
      // }
    ]
  };

  @ViewChild('treeComponent') treeComponent: TreeComponent;

  constructor(
    private activeProject: ActiveProject,
    public treeEventHandler: TreeEventHandler
  ) {
    this.subscription = this.activeProject.retrieve().subscribe(
      project => {
        this.componentInitialized = false;
        this.project = project;
  
        this.tree.value = this.project.id;
        this.tree.isDir = true;
        if (this.treeComponent) {
          this.updateTree();
        }
      },
      error => {
        alert(error);
      });
  }

  ngOnInit() {
  }

  ngDoCheck() {
  }

  ngAfterViewInit(): void {
    if (! this.componentInitialized && ! this.componentInitializing) {
      this.updateTree();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logEvent(e: NodeEvent) {
    console.log(e)
  }

  updateTree() {
    this.componentInitializing = true;
    this.treeEventHandler
    .with(this.treeComponent)
    .resetTree({
      value: this.project.id,
      children: []
    })
    .loadSubTree('./' + this.project.id, this.treeComponent.tree, this.settings)
    .toPromise()
    .then((pathsFromApi: any) => {
      this.componentInitialized = true;
      this.componentInitializing = false;
    })
    .catch(error => {
      this.componentInitializing = false;
      alert(error);
    });
  }
}
