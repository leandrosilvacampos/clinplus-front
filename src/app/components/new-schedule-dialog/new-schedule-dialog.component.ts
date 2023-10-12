import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAgreement } from 'src/app/core/interfaces/agreement';
import { ICompany } from 'src/app/core/interfaces/company';
import { IPaymentMethod } from 'src/app/core/interfaces/payment-method';
import { AgreementsHttpService } from 'src/app/services/agreements.service';
import { CompaniesHttpService } from 'src/app/services/companies.service';
import { PaymentMethodsHttpService } from 'src/app/services/payment-methods.service';
import { DatePipe } from '@angular/common';
import { SchedulesHttpService } from 'src/app/services/schedules.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ISpecialty } from 'src/app/core/interfaces/specialty';
import { SpecialtiesHttpService } from 'src/app/services/specialties.service';

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
    private _agreementsService: AgreementsHttpService,
    private _companiesService: CompaniesHttpService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewScheduleDialogComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _paymentMethodsService: PaymentMethodsHttpService,
    private _router: Router,
    private _schedulesService: SchedulesHttpService,
    private _specialtiesService: SpecialtiesHttpService
  ) {}

  agreements: IAgreement[] = [];
  companies$: Observable<ICompany[]> = new Observable<ICompany[]>();
  companyHours: string[] = [];
  paymentMethods: IPaymentMethod[] = [];
  specialties: ISpecialty[] = [];
  userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  form!: FormGroup;

  ngOnInit() {
    this.form = this._formBuilder.group({
      date: [{ value: undefined, disabled: true }, Validators.required],
      time: [{ value: undefined, disabled: true }, Validators.required],
      agreementId: [{ value: undefined, disabled: true }, Validators.required],
      paymentMethodId: [
        { value: undefined, disabled: true },
        Validators.required,
      ],
      companyId: [undefined, Validators.required],
      specialtyId: [{ value: undefined, disabled: true }, Validators.required],
      procedureId: [{ value: 1, disabled: true }, Validators.required],
      procedureType: [{ value: 1, disabled: true }, Validators.required],
      reason: [{ value: undefined, disabled: true }, Validators.required],
    });

    this.companies$ = this._companiesService.readCompanies();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const { companyId, ...formValue } = this.form.value;

      this._schedulesService
        .createSchedule(companyId, {
          ...formValue,
          procedureId: 1,
          timezone: this.userTimezone,
          date: this._datePipe.transform(formValue.date, 'yyyy-MM-dd'),
        })
        .subscribe({
          next: (res) => {
            this._snackBar.open('Consulta agendada com sucesso', 'Ok', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
              panelClass: ['success-snackbar'],
            });

            this.dialogRef.close();

            this._router.navigate(['/my-schedules']);
          },
          error: (err) => {
            this._snackBar.open('Ocorreu um erro ao agendar a consulta', 'Ok', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
          },
        });
    }
  }

  onCompanyIdChange() {
    const companyId = this.form.get('companyId')?.value;

    if (companyId) {
      this._paymentMethodsService
        .readPaymentMethods(companyId)
        .subscribe((res) => {
          this.paymentMethods = res;
        });

      this._agreementsService.readAgreements(companyId).subscribe((res) => {
        this.agreements = res;
      });

      this._specialtiesService
        .readCompanySpecialties(companyId)
        .subscribe((res) => {
          this.specialties = res;
        });

      this.form.get('date')?.enable();
      this.form.get('agreementId')?.enable();
      this.form.get('paymentMethodId')?.enable();
      this.form.get('specialtyId')?.enable();
      this.form.get('reason')?.enable();
    }
  }

  onDateChange() {
    const date = this._datePipe.transform(
      this.form.get('date')?.value,
      'yyyy-MM-dd'
    );
    const companyId = this.form.get('companyId')?.value;

    if (date && companyId) {
      this._companiesService
        .readAvailableCompanyHours(companyId, date, this.userTimezone)
        .subscribe((res) => {
          this.companyHours = res;

          this.form.get('time')?.enable();
        });
    }
  }
}
