import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class NewScheduleDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder
  ) {}

  form: FormGroup = this._formBuilder.group({
    type: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    agreement: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    unit: ['', Validators.required],
    reason: [''],
  });

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
