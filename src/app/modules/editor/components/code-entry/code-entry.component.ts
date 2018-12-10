import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveFile } from '../../services/active-file';
import { GWFile } from '../../../../model/editor/gw-file';
import 'brace';
import 'brace/mode/text';
import 'brace/theme/github';
import { Editor } from 'brace';
// import { AceConfigInterface, AceComponent } from 'ngx-ace-wrapper';
import { Compilator } from '../../services/compilator';
import { FileSystem } from '../../services/file-system';
import { AboutGWE } from '../../../../services/utils/about';

@Component({
  selector: 'editor-code-entry',
  templateUrl: './code-entry.component.html',
  styleUrls: ['./code-entry.component.scss']
})
export class CodeEntryComponent implements OnInit, OnDestroy {

  subscriptionToActiveFile: Subscription;
  file:GWFile;
  ace: Editor = null;
  currentCode = '';
  currentPosition: any;

  compileCount = 0;
  compilationSucceed = true;
  savingFile = false;

  // @ViewChild(AceComponent) componentRef?: AceComponent;

  // public config: AceConfigInterface = {
  //   mode: 'text',
  //   theme: 'github',
  //   readOnly : false
  // };

  @ViewChild('editor') editor;
  options:any = {maxLines: 1000, printMargin: false};

  constructor(
    public aboutGWE: AboutGWE,
    public activeFile: ActiveFile,
    public compilator: Compilator,
    public fs: FileSystem,
    public cdr:ChangeDetectorRef
  ) {
    this.subscriptionToActiveFile = this.activeFile.retrieve().subscribe(
    file => {
      if (! (file instanceof GWFile)) {
        this.file = null;
        return;
      }
      this.file = file;
    },
    error => {
      alert(error);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.ace = this.componentRef.directiveRef.ace();
    // this.ace.commands.addCommand({
    //   name: "compileFile",
    //   bindKey: { win: "Ctrl-S", mac: "Command-S" },
    //   exec: (editor) => {
    //     // this.file.sourceCode = this.currentCode;
    //     // this.ace.moveCursorToPosition(this.currentPosition);
    //     this.compile();
    //   }
    // });
  }

  ngOnDestroy() {
    this.subscriptionToActiveFile.unsubscribe();
  }
  
  onChange(e: string) {
    if (e.length === 0) {
      return;
    }

    if (this.file.lastUpdateOnEditor === null) {
      this.file.lastUpdateOnEditor = new Date();
      return;
    }
    this.file.saved = false;
  }

  compile(e?) {
    // engage compilation only if there are no running compilation
    if (this.compileCount > 0) {
      return;
    }
    this.compileCount ++; 
    this.compilationSucceed = false;

    // start compiling
    this.compilator.compile(this.file)
    .toPromise()
    .then((response: any) => {
      const errors = response.errors || [];
      if (errors.length) {
        // dispatch errors to console
        this.compilationSucceed = false;
      } else {
        this.compilationSucceed = true;
      }
      this.compilator.dispatch(response);

      this.cdr.detectChanges();
      this.pauseCompiler();
    })
    .catch(error => { 
      this.pauseCompiler();
      alert(error);
    })

  }

  save() {
    // engage compilation only if there are no running compilation
    if (this.savingFile) {
      return;
    }
    this.savingFile = true;

    // start compiling
    this.fs.saveFile(this.file)
    .toPromise()
    .then((response: any) => { 
      const errors = response.errors || [];
      if (errors.length > 0) {
        alert(response.errors);
      } else {
        this.file.saved = true;
      }

      this.cdr.detectChanges();
      this.pauseSaver();
    })
    .catch(error => { 
      this.pauseSaver();
      alert(error);
    })
  }

  /**
   * Delay to avoid simulatenous compilation
   * @param ms 
   */
  pauseCompiler(ms = 500) {
    setTimeout(() => {
      this.compileCount = 0;
    }, ms);
  }
  pauseSaver(ms = 500) {
    setTimeout(() => {
      this.savingFile = false;
    }, ms);
  }

}
