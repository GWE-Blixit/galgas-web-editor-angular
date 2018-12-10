import { Settings } from './settings';
import { AceSession } from './ace-session';
import { Component } from '../../../model/component/component';

export class Editor {
    aceSessions: AceSession[]; // tabs, editors, consoles
    components: Component[]; // list of components
    settings: Settings; // editor settings like autosave

    getTree() {
        // tree from components list
    } 
}