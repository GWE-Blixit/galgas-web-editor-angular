import { Injectable } from "@angular/core";
import { Project } from '../../../model/project/project';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ActiveProject {
    private subject: BehaviorSubject<Project> = new BehaviorSubject(null);
    protected _project: Project;

    get project(): Project {
        return this._project;
    }
 
    dispatch(project: Project) {
        this._project = project;
        this.subject.next(project);
    }
 
    clear() {
        this._project = null;
        this.subject.next(null);
    }
 
    retrieve(): Observable<Project> {
        return this.subject.asObservable();
    }
}
