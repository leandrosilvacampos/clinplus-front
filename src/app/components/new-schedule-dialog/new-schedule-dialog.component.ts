import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAgreement } from 'src/app/interfaces/agreement';
import { ICompany } from 'src/app/interfaces/company';
import { IPaymentMethod } from 'src/app/interfaces/payment-method';
import { AgreementsService } from 'src/app/services/agreements.service';
import { CompaniesService } from 'src/app/services/companies.service';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';

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
    private _agreementsService: AgreementsService,
    private _companiesService: CompaniesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
    private _formBuilder: FormBuilder,
    private _paymentMethodsService: PaymentMethodsService
  ) {}

  agreements$: Observable<IAgreement[]> = new Observable<IAgreement[]>();
  companies$: Observable<ICompany[]> = new Observable<ICompany[]>();
  paymentMethods$: Observable<IPaymentMethod[]> = new Observable<
    IPaymentMethod[]
  >();

  form: FormGroup = this._formBuilder.group({
    type: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    agreement: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    unit: ['', Validators.required],
    reason: [''],
  });

  ngOnInit() {
    this.agreements$ = this._agreementsService.readAgreements();
    this.companies$ = this._companiesService.readCompanies();
    this.paymentMethods$ = this._paymentMethodsService.readPaymentMethods();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
