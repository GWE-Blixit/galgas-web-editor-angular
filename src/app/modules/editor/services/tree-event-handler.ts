import { Injectable } from "@angular/core";
import { FileSystem } from './file-system';
import { NodeEvent, Tree, TreeComponent, MenuItemSelectedEvent } from 'ng2-tree';
import { tap } from 'rxjs/operators';
import { ActiveFile } from './active-file';
import { GWFile } from '../../../model/editor/gw-file';
import { OpenedFilesManagement } from './opened-files-management';

@Injectable()
export class TreeEventHandler {
    readonly ACTIONS = {
        newFile: 'New File',
        newFolder: 'New folder',
        rename: 'Rename',
        remove: 'Remove',
        compileFile: 'Compile file',
    };

    treeComponent: TreeComponent;

    /**
     * map <nodeId, path>
     * We store path to avoid to compute them several times
     */
    private knownNodes: Map<string, string> = new Map<string, string>();

    constructor(
        public fs: FileSystem,
        public activeFile: ActiveFile,
        public openedFilesManager: OpenedFilesManagement,
    ) {}

    with(treeComponent: TreeComponent) {
        this.treeComponent = treeComponent;
        return this;
    }

    /**
     * Relative path from project root to current node
     * @param node 
     */
    getPath(node: Tree) {
        if (this.knownNodes.has(String(node.id))) {
            return this.knownNodes.get(String(node.id));
        }

        let path = this._getPath(node);

        if (node.id) {
            this.knownNodes.set(String(node.id), path);
        }

        return path;
    }

    private _getPath(node: Tree): string {
        if (node.parent) {
            return this._getPath(node.parent) + '/' + node.value;
        }

        return './' + node.value;
    }

    resetTree(treeModel: any) {
        this.treeComponent.getController().rename(treeModel.value);
        this.treeComponent.getController().setChildren(treeModel.children);
        return this;
    }

    loadSubTree(editorPath: string, tree: Tree, settings?: any) {
        return this.fs.getTree(editorPath)
        .pipe(
            tap((pathsFromApi: any) => {
                this.addPathsToTree(tree, pathsFromApi, settings);
            })
        );
    }

    private addPathsToTree(tree: Tree, paths: any[], settings?: any) {
      if (tree == undefined || tree == null) {
          throw ('Tree is not ready');
      }
      paths.forEach(path => {
        if (path.dir) {
          let node = new Tree({
            id: path.path,
            value: path.name,
            settings: settings || tree.node.settings,
            isDir: true,
            children: []
          });
          node = tree.addChild(node);

        //   // collapse directories by default
        //   if (this.treeComponent) {
        //       const item = this.treeComponent.getControllerByNodeId(node.id)
        //       if (item) {
        //           item.collapse();
        //       }
        //   }
        } else {
          let leaf = new Tree({
            id: path.path,
            value: path.name,
            settings: settings || tree.node.settings
          });
          tree.addChild(leaf);
        }
      });
    }

    onMenuItemSelected(e: MenuItemSelectedEvent) {
        switch(e.selectedItem) {
            case this.ACTIONS.newFile:
            break;
            case this.ACTIONS.newFolder: 
                e.node.node.isDir = true;
            break;
            case this.ACTIONS.rename:
            break;
            case this.ACTIONS.remove: 

                if (e.node.node.isDir) {
                    alert('Removing a directory is not possible for now');
                } else {
                    // is file 
                    this.removeFile(e);
                }
            break;
            case this.ACTIONS.compileFile: 
                // specific action
                // move the compile() function from code-entryComponent to Compilator service
            break;
        }
    }

    onNodeMoved(e: NodeEvent) {
        console.log(this.getPath(e.node));
    }

    async onNodeSelected(e: NodeEvent) {
        let path = this.getPath(e.node);

        if (e.node.node.isDir) {
            if (! e.node.hasChildren()) {
                await this.loadSubTree(path, e.node).toPromise();
            }
        } else {
           // is file
            const file = new GWFile();
            file.id = String(e.node.id || path);
            file.name = e.node.value;
            file.path = path;

            this.fs.getFile(file)
            .toPromise()
            .then((_file: GWFile) => {
                // at this point, know that _file === file
                this.activeFile.dispatch(_file);
            })
            .catch(error => {
                // dispatch error using EditorErrorDispatcher
                alert('Impossible to get file from the server');
                console.error(error);
            })
        }
    }
    
    onNodeRenamed(e: NodeEvent) {
        console.log(this.getPath(e.node))
    }
    
    removeFile(e: MenuItemSelectedEvent) {
        const path = this.getPath(e.node);
        const file = new GWFile();
        file.id = String(e.node.id || path);
        file.path = path;

        this.fs.removeFile(file)
        .toPromise()
        .then(() => {
            // remove from tree
            const controller = this.treeComponent.getControllerByNodeId(e.node.id);
            controller.remove();
        })
        .catch(error => {
            // dispatch error using EditorErrorDispatcher
            alert('Impossible to remove the file remotely');
        });
    }
    onNodeRemoved(e: NodeEvent) {
        const path = this.getPath(e.node);

        if (e.node.node.isDir) {
            alert('Removing a directory is not possible for now');
        } else {
           // is file 
            const file = new GWFile();
            file.id = String(e.node.id || path);
            file.path = path;

            // forget this file
            if (this.knownNodes.has(String(file.id))) {
                this.knownNodes.delete(String(file.id));
            }

            // remove file from list of opened files
            this.openedFilesManager.removeFile(file);
        }
    }
    
    onNodeCreated(e: NodeEvent) {
        const path = this.getPath(e.node);
        console.log(path);

        if (e.node.node.isDir) {
            //     await this.loadSubTree(path, e.node).toPromise();
        } else {
           // is file 
            const file = new GWFile();
            file.id = String(e.node.id || path);
            file.name = e.node.value;
            file.path = path;

            this.fs.createFile(file)
            .toPromise()
            .then(() => {
                this.activeFile.dispatch(file);
            })
            .catch(error => {
                // dispatch error using EditorErrorDispatcher
                alert('Impossible to create the file remotely');
                console.error(error);
            });
        }
    }
    
    onNodeExpanded(e: NodeEvent) {
        console.log(this.getPath(e.node))
        
    }
    
    onNodeCollapsed(e: NodeEvent) {
        console.log(this.getPath(e.node))
        
    }
}