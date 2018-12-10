import { Component, OnInit } from '@angular/core';
import { Compilator } from '../../services/compilator';

@Component({
  selector: 'editor-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  lastCompilation = {
    errorsCount: 0,
    time: null,
    duration: null
  }
  errors: Array<string[]> = [];
  compilationCount = 0;

  constructor(
    public compilator: Compilator,
  ) {
    this.compilator.retrieve().subscribe(
    compilatorResponse => {
      if (! compilatorResponse) {
        return;
      }
      this.compilationCount++;

      this.lastCompilation.errorsCount = compilatorResponse.errors.length;
      this.lastCompilation.time = compilatorResponse.time;
      this.lastCompilation.duration = compilatorResponse.duration;

      this.errors = this.compilator.all();
    },
    error => {
      alert('Failed to retrieve the error');
    })
  }

  ngOnInit() {
  }

}
