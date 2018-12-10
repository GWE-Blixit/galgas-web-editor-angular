import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api/api-service';
import { of, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Project } from '../../../model/project/project';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProjectService extends ApiService {
    readonly API = environment.urls.api + '/projects';

    private fromCache() {
        return JSON.parse(localStorage.getItem('projects')) as Project[] || [];
    }

    getSingle(id: string): Observable<Project> {
        const projects = this.fromCache();
        const project = projects.find(_project => _project.id === id);

        if (project) {
            return of(Project.from(project));
        } else {
            return this.http.get<Project>(this.API + '/' + id)
            .pipe(
                map(data => data['project']),
                map(project => {
                    return Project.from(project) as Project;
                }),
                tap(project => {
                    // update cache
                    projects.push(project);
                    localStorage.setItem('projects', JSON.stringify(projects));
                })
            );
        }
    }
    
    get(): Observable<Project[]> {
        let projects: Project[] = [];
        let projectsFromCache: Project[] = this.fromCache();
        
        if (projectsFromCache.length === 0) {
            return this.http.get<Project[]>(this.API)
            .pipe(
                map(data => data['projects']),
                map(projects => {
                    return projects.map(p => Project.from(p)) as Project[];
                }),
                tap((projects: Project[]) => {
                    localStorage.setItem('projects', JSON.stringify(projects));
                })
            );
        } else {
            projectsFromCache.forEach(_project => {
                projects.push(Project.from(_project));
            })
        }

        return of(projects);
    }

    set(id: number, project: Project): Observable<void> {
        const projects = this.fromCache();
        const projectFound = projects.findIndex(_project => _project.id === id);
        if (projectFound >=0) {
            projects[projectFound] = project;
        } else {
            projects.push(project);
        }
        return this.setProjects(projects);
    }

    /**
     * Temporary function
     * @param projects 
     */
    setProjects(projects: Project[]): Observable<void> {
        localStorage.setItem('projects', JSON.stringify(projects));
        return of(null);
    }

    create(project: Project): Observable<string> {
        return this.http.post(this.API, project)
        .pipe(
            map(data => data['created'])
        );
    }

    update(project: Project): Observable<Project> {
        return of(null);
    }

    delete(project: Project): Observable<void> {
        return of(null);
    }
}