import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmationDialogData {
    title: string;
    body: string;
}
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.sass'
})
export class ConfirmationDialogComponent {

    public title: string
    public body: string
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: ConfirmationDialogData,
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    ) {
        this.title = data.title
        this.body = data.body
    }

    public confirm() {
        this.dialogRef.close(true);
    }
    public closeDialog() {
        this.dialogRef.close();
    }
}
