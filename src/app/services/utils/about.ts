import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AboutGWE {

    getAuthor() {
        return environment.author;
    }

    getVersion() {
        return environment.version;
    }
}