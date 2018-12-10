import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../model/project/project';

import { ProjectService } from '../../services/project-service';
import { ConfirmationService } from '../../../shared/modal/confirm/confirmation-service';

@Component({
  selector: 'app-project',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.projectService.get().toPromise()
    .then(projects => this.projects = projects)
    .catch(error => alert('Error when retrieving projects'));
  }

  remove(project: Project) {
    let ref = this.confirmationService.open({
      title: 'Remove project "' + project.name + '"',
      reason: 'You are about to remove a project definitely.',
      action: 'Remove'
    });

    ref.beforeClose().toPromise()
    .then((data) => {
      //temporary order of instructions: should be remove + refresh, not the opposite
      if (ref.componentInstance.actionConfirmed()) {
        // refresh list
        this.projects = this.projects.filter(_project => _project.id !== project.id);
        // remove object
        this.projectService.setProjects(this.projects).toPromise()
        // this.projectService.delete(project).toPromise()
        .then(() => {} )
        .catch(error => alert('Error when removing project'));
      }
    })
    .catch(error => {
      alert('We failed to confirm your action !');
    });
  }
}
