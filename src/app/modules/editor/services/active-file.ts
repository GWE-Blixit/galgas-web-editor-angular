import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from 'rxjs';
import { GWFile, GWDefaultFile } from '../../../model/editor/gw-file';
import { ActiveProject } from './active-project';

@Injectable()
export class ActiveFile {
    private subject: BehaviorSubject<GWFile> = new BehaviorSubject(null);

    constructor(
        public activeProject: ActiveProject,
    ) {}
 
    dispatch(file: GWFile) {
        if (! (file instanceof GWDefaultFile) && this.activeProject.project) {
            file.project = this.activeProject.project;
        }

        this.subject.next(file);
    }
 
    clear() {
        this.subject.next(null);
    }
 
    retrieve(): Observable<GWFile> {
        return this.subject.asObservable();
    }
}
