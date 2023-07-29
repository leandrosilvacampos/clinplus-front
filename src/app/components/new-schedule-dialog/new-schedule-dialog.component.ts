import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-schedule-dialog',
  templateUrl: './new-schedule-dialog.component.html',
  styleUrls: ['./new-schedule-dialog.component.scss'],
})
export class NewScheduleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
