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
  private title = '';
  private reason = '';
  private action = '';
  private isConfirmed = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    this.title = data.title;
    this.reason = data.reason;
    this.action = data.action;
  }

  ngOnInit() {
  }

  protected actionTriggered(){
    this.isConfirmed = true;
  }

  actionConfirmed() {
    return this.isConfirmed;
  }
}
