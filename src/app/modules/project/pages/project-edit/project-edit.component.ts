import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../model/project/project';
import { ProjectService } from '../../services/project-service';
import { Version } from '../../../../model/project/version';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  project: Project = null;
  saveForm: FormGroup;
  creationInProgress = false;


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectService.getSingle(params['id']).toPromise()
        .then(_project => {
          this.project = _project;
        })
        .catch(error => {
          alert(error);
        })
      } else {
        this.project = new Project('');
        this.creationInProgress = true;
      }
    })
  }

  ngOnInit() {
    this.saveForm = this.formBuilder.group({
        name: [this.project ? this.project.name : '', [Validators.required, Validators.minLength(2)]],
        versionM: [this.project ? this.project.version.M : 0, [Validators.required, Validators.min(0)]],
        versionm: [this.project ? this.project.version.m : 0, [Validators.required, Validators.min(0)]],
        versionr: [this.project ? this.project.version.r : 0, [Validators.required, Validators.min(0)]],
        description: [this.project ? this.project.description : '', Validators.required],
    });
  }

  /** Convenient fonction to get controls */
  get f() { return this.saveForm.controls; }

  save() {
    if (this.saveForm.invalid) {
      return;
    }

    Project.merge(this.project, {
      id: this.project.id,
      name: this.f.name.value,
      version: new Version(+this.f.versionM.value, +this.f.versionm.value, +this.f.versionr.value),
      description: this.f.description.value,
    });

    if (this.creationInProgress) {
      this.projectService.create(this.project).toPromise()
      .then((id: string) => {
        alert('Saved ! You will be redirected to the editor.');
        this.router.navigate(['/editor/' + id]);
      })
      .catch(error => {
        alert(error);
      });
    } else {
      this.projectService.set(this.project.id, this.project).toPromise()
    .then(() => {
      alert('Saved ! You will be redirected to the projects page.');
      this.router.navigate(['/projects']);
    })
    .catch(error => {
      alert(error);
    });
    }
  }

}
