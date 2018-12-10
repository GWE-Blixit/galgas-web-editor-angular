import { Injectable } from "@angular/core";
import { ApiService } from '../../../services/api/api-service';
import { GWFile } from '../../../model/editor/gw-file';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class Compilator extends ApiService {
    readonly API = environment.urls.api + '/compile';

    private subject: BehaviorSubject<any> = new BehaviorSubject(null);
    private errorsStream: Array<any> = [];

    // ------------- COMPILATION --------------------------

    getVersion() {
        return this.http.get(this.API + '/version')
        .pipe(
            map(item => {
                return item['version'];
            })
        );
    }
    compile(file: GWFile) {
        let body = {
            query: file.sourceCode,
            path: file.path
        };

        if (file.project) {
            body['project'] = file.project.id
        }

        return this.http.post(this.API, body)
        .pipe(
            map(item => {
                item['time'] = new Date(item['time'] * 1000);
                return item;
            })
        );
    }

    // ------------- COMMUNICATION --------------------------


    dispatch(compilatorResponse: any) {
        this.errorsStream.unshift(compilatorResponse);
        this.subject.next(compilatorResponse);
    }

    clear() {
        this.errorsStream = [];
        this.subject.next(null);
    }
 
    retrieve(): Observable<any> {
        return this.subject.asObservable();
    }

    all() {
        return this.errorsStream;
    }
}