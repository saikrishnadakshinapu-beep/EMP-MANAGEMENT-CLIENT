import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSubmitting = false;
  loginError = '';

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.isSubmitting = true;
    this.loginError = '';
    this.authService.login(email.trim(), password).subscribe({
      next: () => this.finishAuthentication(),
      error: error => this.handleRequestError(error)
    });
  }

  private finishAuthentication(): void {
    this.isSubmitting = false;
    void this.router.navigate(['/users/dashboard']);
  }

  private handleRequestError(error: unknown): void {
    this.isSubmitting = false;
    if (error instanceof HttpErrorResponse) {
      const message = error.error && typeof error.error.message === 'string'
        ? error.error.message
        : '';
      this.loginError = message || (error.status === 0
        ? 'Unable to reach the employee API. Check that the backend is running.'
        : 'The request could not be completed.');
      return;
    }
    this.loginError = 'The request could not be completed.';
  }
}
