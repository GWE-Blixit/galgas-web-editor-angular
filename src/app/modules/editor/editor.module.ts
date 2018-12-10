import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'ng2-tree';
import { MatGridListModule, MatMenuModule, MatButtonModule, MatTabsModule, MatIconModule } from '@angular/material';
import { AceModule, ACE_CONFIG, AceConfigInterface } from 'ngx-ace-wrapper';
import { AceEditorModule } from 'ng2-ace-editor';

import { EditorComponent } from './pages/editor/editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { ProjectService } from '../project/services/project-service';
import { ProjectTreeComponent } from './components/project-tree/project-tree.component';
import { FilesTabsComponent } from './components/files-tabs/files-tabs.component';
import { CodeEntryComponent } from './components/code-entry/code-entry.component';
import { ConsoleComponent } from './components/console/console.component';
import { ActiveProject } from './services/active-project';
import { ActiveFile } from './services/active-file';
import { FileSystem } from './services/file-system';
import { TreeEventHandler } from './services/tree-event-handler';
import { OpenedFilesManagement } from './services/opened-files-management';
import { Compilator } from './services/compilator';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
};

@NgModule({
  declarations: [
    EditorComponent,
    ProjectTreeComponent,
    FilesTabsComponent,
    CodeEntryComponent,
    ConsoleComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    TreeModule,
    MatGridListModule, MatMenuModule, MatButtonModule, MatTabsModule, MatIconModule,
    AceModule,
    AceEditorModule,
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    },
    ProjectService,
    ActiveProject, ActiveFile, OpenedFilesManagement, Compilator,
    FileSystem,
    TreeEventHandler
  ]
})
export class EditorModule { }
