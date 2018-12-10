import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmDialogData {
  title: string;
  reason: string;
  action: string;
  isConfirmed?: boolean;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public title = '';
  public reason = '';
  public action = '';
  public isConfirmed = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    this.title = data.title;
    this.reason = data.reason;
    this.action = data.action;
  }

  ngOnInit() {
  }

  public actionTriggered(){
    this.isConfirmed = true;
  }
}
