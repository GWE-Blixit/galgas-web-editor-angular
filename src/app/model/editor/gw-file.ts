import { Project } from '../project/project';

export class GWFile {
    id: string;
    name: string;
    path: string;
    sourceCode = '';
    project: Project = null;
    saved = true;
    lastUpdateOnEditor: Date = null;
    editable = true;
    isWelcome = false;
}

export class GWDefaultFile extends GWFile {
    id = 'welcome';
    name = 'Welcome';
    path = '';
    sourceCode = 'Source Code';
    editable = false;
    isWelcome = true;
}
