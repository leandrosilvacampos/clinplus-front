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
import { DatePipe } from '@angular/common';

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
    private _datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
    private _formBuilder: FormBuilder,
    private _paymentMethodsService: PaymentMethodsService
  ) {}

  agreements$: Observable<IAgreement[]> = new Observable<IAgreement[]>();
  companies$: Observable<ICompany[]> = new Observable<ICompany[]>();
  companyHours: string[] = [];
  paymentMethods$: Observable<IPaymentMethod[]> = new Observable<
    IPaymentMethod[]
  >();

  form: FormGroup = this._formBuilder.group({
    date: [{ value: undefined, disabled: true }, Validators.required],
    time: [{ value: undefined, disabled: true }, Validators.required],
    agreementId: [{ value: undefined, disabled: true }, Validators.required],
    paymentMethodId: [
      { value: undefined, disabled: true },
      Validators.required,
    ],
    companyId: [undefined, Validators.required],
    reason: [{ value: undefined, disabled: true }],
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

  onCompanyIdChange() {
    const companyId = this.form.get('companyId')?.value;

    if (companyId) {
      this.form.get('date')?.enable();
      this.form.get('agreementId')?.enable();
      this.form.get('paymentMethodId')?.enable();
      this.form.get('reason')?.enable();
    }
  }

  onDateChange() {
    const date = this._datePipe.transform(
      this.form.get('date')?.value,
      'yyyy-MM-dd'
    );
    const companyId = this.form.get('companyId')?.value;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (date && companyId) {
      this._companiesService
        .readAvailableCompanyHours(companyId, date, userTimezone)
        .subscribe((res) => {
          console.log('res: ', res);

          this.companyHours = res;

          this.form.get('time')?.enable();
        });
    }
  }
}
