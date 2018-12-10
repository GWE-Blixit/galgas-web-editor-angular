import { Project } from '../project/project';

export class GWFile {
    id: string;
    name: string;
    path: string;
    sourceCode = '';
    project: Project = null;
}

export class GWDefaultFile extends GWFile {
    id = 'welcome';
    name = 'Welcome';
    path = '';
    sourceCode = 'Source Code';
}
