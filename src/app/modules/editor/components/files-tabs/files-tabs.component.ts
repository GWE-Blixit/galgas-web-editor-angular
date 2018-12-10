import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { OpenedFilesManagement } from '../../services/opened-files-management';
import { ActiveFile } from '../../services/active-file';
import { GWFile, GWDefaultFile } from '../../../../model/editor/gw-file';
import { Subscription } from 'rxjs';
import { ActiveProject } from '../../services/active-project';

@Component({
  selector: 'editor-files-tabs',
  templateUrl: './files-tabs.component.html',
  styleUrls: ['./files-tabs.component.scss']
})
export class FilesTabsComponent implements OnInit, OnDestroy {
  currentFile: GWDefaultFile = new GWDefaultFile();
  subscriptionToActiveFile: Subscription;
  subscriptionToActiveProject: Subscription;
  selectedIndex: number = 0;

  tabToFile: {};

  constructor(
    public openedFilesManagement: OpenedFilesManagement,
    public activeFile: ActiveFile,
    public activeProject: ActiveProject,
    private cdr: ChangeDetectorRef,
  ) {

    this.subscriptionToActiveFile = this.activeFile.retrieve().subscribe(
    file => {
      if (! (file instanceof GWFile)) {
        return;
      }
      this.openFile(file);
    },
    error => {
      alert(error);
    });

  }

  ngOnInit() {
    this.subscriptionToActiveProject = this.activeProject.retrieve().subscribe(
    project => {
      if (! project) {
        return;
      }
      // on new project, reset the view
      this.reset();
    },
    error => {
      alert(error);
    });
  }

  public ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptionToActiveFile.unsubscribe();
    this.subscriptionToActiveProject.unsubscribe();
  }

  openFile(file: GWFile) {
    this.currentFile = file;
    this.selectedIndex = this.openedFilesManagement.addFile(file);
  }

  close(file: GWFile) {
    let index = this.openedFilesManagement.getNextIndex(file);
    // if the next opened file can't be find
    if (index >= 0) {
      this.openedFilesManagement.removeFile(file);
    }    
  }
  
  reset() {
    this.openedFilesManagement.files = [];
    const file = new GWDefaultFile();
    this.openFile(file);
    this.activeFile.dispatch(file);
  }
  
  tabSelected(index) {
    const file = this.openedFilesManagement.getFile(index) as GWFile;
    if (! file) {
      this.activeFile.clear();
    } else {
      this.activeFile.dispatch(file);
    }
  }

  notifyFileSelected(file: GWFile) {
  }

}
