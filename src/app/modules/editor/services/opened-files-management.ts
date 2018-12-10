import { Injectable } from "@angular/core";
import { GWFile } from '../../../model/editor/gw-file';

@Injectable()
export class OpenedFilesManagement {
    private _files: any = {}

    get files(): any {
        return Object.values(this._files);
    }

    set files(files: any) {
        this._files = files;
    }

    getFile(at: number) {
        if (at < 0) {
            return null;
        }
        const files = Object.values(this._files);

        return files.length >= at+1 ? files[at] : null;
    }

    /**
     * -1 => file not found
     * null => file is the last element, next index cant be defined
     * number>=0 => there is another file after
     * @param file 
     */
    getNextIndex(file: GWFile): number {
        const ids = Object.keys(this._files);
        // position = index +1
        let position = ids.findIndex(item => item === file.id) + 1;
        if (position == 0) {
            return -1;
        }
        return position < ids.length ? position : null;
    }

    addFile(file: GWFile) {
        this._files[file.id] = file;
        return Object.keys(this._files).findIndex(id => file.id == id);
    }

    removeFile(file: GWFile) {
        if (this._files[file.id]) {
            delete this._files[file.id];
        }
    }
}