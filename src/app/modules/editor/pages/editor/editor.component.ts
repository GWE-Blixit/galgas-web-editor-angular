import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';

import { Project } from '../../../../model/project/project';
import { ProjectService } from '../../../project/services/project-service';
import { ActiveProject } from '../../services/active-project';
import { ConfirmationService } from '../../../shared/modal/confirm/confirmation-service';
import { Subscription } from 'rxjs';
import { Compilator } from '../../services/compilator';
import { AboutGWE } from '../../../../services/utils/about';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  project: Project = null;
  subscription: Subscription;
  binaryVersion = '';

  constructor(
    public aboutGWE: AboutGWE,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private compilator: Compilator,
    private activeProject: ActiveProject,
    private confirmationService: ConfirmationService
  ) {
    this.subscription = this.activeProject.retrieve().subscribe(
    project => {
      this.project = project;
    },
    error => {
      alert(error);
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // edition
      if (params['id']) {
        this.getProject(params['id']);
      }
    });

    this.compilator.getVersion().toPromise()
    .then(version => {
      this.binaryVersion = version;
    })
    .catch(error => {
      alert(error);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProject(id: string) {
    this.projectService.getSingle(id).toPromise()
    .then(_project => {
      
      if (! this.project) {
        this.activeProject.dispatch(_project);
      } else {
        let ref = this.confirmationService.open({
          title: 'Update editor with new project "' + _project.name + '"',
          reason: 'You are about to remove project (' + this.project.name + ') from editor.',
          action: 'Update'
        });
  
        ref.beforeClose().toPromise()
        .then(() => {
          if (ref.componentInstance.isConfirmed) {
            this.activeProject.dispatch(_project);
          }
        });
      }
    })
    .catch(error => {
      alert(error);
    });
  }
}
