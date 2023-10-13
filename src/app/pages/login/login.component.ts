import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private _authService: AuthHttpService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.loading = true;
    const formValue = this.form.value;

    this._authService.login(formValue.email, formValue.password).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/');
      },
      error: (err) => {
        this.loading = false;

        this._snackBar.open('E-mail ou senha incorretos', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
