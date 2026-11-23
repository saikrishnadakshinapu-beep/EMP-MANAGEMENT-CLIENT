import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });
  loginError = '';

  constructor(private readonly router: Router) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = 'Enter a valid username/email and a password of at least 6 characters.';
      return;
    }

    const credentials = this.loginForm.getRawValue();
    const username = credentials.username.trim().toLowerCase();
    const password = credentials.password;

    const isDemoLogin = username === 'demo@example.com' && password === 'Demo123!';
    const employees = this.getStoredEmployees();
    const employee = employees.find(item =>
      item.isActive &&
      (item.username?.toLowerCase() === username || item.email?.toLowerCase() === username) &&
      item.password === password
    );

    if (!isDemoLogin && !employee) {
      this.loginError = 'Invalid username or password.';
      return;
    }

    this.loginError = '';
    void this.router.navigate(['/users']);
  }

  private getStoredEmployees(): Array<{
    username?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
  }> {
    try {
      const storedEmployees = localStorage.getItem('employees');
      return storedEmployees ? JSON.parse(storedEmployees) : [];
    } catch {
      return [];
    }
  }
}
