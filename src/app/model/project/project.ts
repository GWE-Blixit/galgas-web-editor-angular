import { Version } from './version';
import { AbstractModel } from '../abstract-model';

export class Project extends AbstractModel {
    id = null;

    /**
     * Creation of the project on the frontend side (Timestamp)
     */
    creation = (new Date()).getTime();
  
    version: Version = new Version(0, 0, 0);
  
    targets: string[] = [];

    properties = {};
  
    components = [];

    constructor(public name: string, public description = '') {
        super();
    }

    static getInstance(): Project{
        return new Project('');
    }

    static from(map: any): Project {
        map.version = new Version(map.version.M, map.version.m, map.version.r);
    
        return AbstractModel.from(Project, map);
    }

    static merge(object: Project, map: any): Project {
        if (map.version) {
            map.version = new Version(map.version.M, map.version.m, map.version.r);
        }

        return AbstractModel.merge(object, map);
    }
}
