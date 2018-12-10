import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './pages/projectList/projectList.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: ProjectEditComponent
  },
  {
    path: '',
    component: ProjectListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
