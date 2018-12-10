import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmComponent } from '../../../shared/modal/confirm/confirm.component';

@Injectable()
export class ConfirmationService {
    constructor(public dialog: MatDialog) {

    }

    open(data: any): MatDialogRef<ConfirmComponent, any> {
        return this.dialog.open(ConfirmComponent, {
            data: data
        });
    }
}