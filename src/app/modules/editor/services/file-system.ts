import { Injectable } from "@angular/core";
import { ApiService } from '../../../services/api/api-service';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { GWFile } from '../../../model/editor/gw-file';
import { Observable } from 'rxjs';

@Injectable()
export class FileSystem extends ApiService {

    readonly API = environment.urls.api + '/files';

    getTree(editorPath: string) {
        return this.http.post(this.API + '/tree', {
            directory: editorPath
        })
        .pipe(
            map(element => element)
        );
    }

    getFile(file: GWFile): Observable<GWFile> {
        return this.http.get(this.API + '/single', {
            params: {
                path: file.path
            }
        })
        .pipe(
            map((element:any) => {
                file.sourceCode = element.content;
                return file;
            })
        );
    }

    renameFile(file: GWFile, newname: string) {
        //
    }

    createFile(file: GWFile) {
        return this.http.post(this.API + '/create', {
            path: file.path,
            content: ''
        });
    }

    saveFile(file: GWFile) {
        return this.http.post(this.API + '/save', {
            path: file.path,
            content: file.sourceCode
        });
    }

    removeFile(file: GWFile) {
        return this.http.post(this.API + '/delete', {
            path: file.path
        });
    }

    renameFolder(file: any) {
        //
    }

    addFolder(file: any) {
        //
    }

    removeFolder(file: any) {
        //
    }
}