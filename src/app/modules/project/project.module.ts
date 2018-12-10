import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatIconRegistry } from '@angular/material';

import { ProjectListComponent } from './pages/projectList/projectList.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { ProjectService } from './services/project-service';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ProjectRoutingModule
  ],
  providers: [
    MatIconRegistry,
    ProjectService
  ]
})
export class ProjectModule {
  constructor(matIconRegistry: MatIconRegistry) {
    matIconRegistry.setDefaultFontSetClass('fa');
  }
}
