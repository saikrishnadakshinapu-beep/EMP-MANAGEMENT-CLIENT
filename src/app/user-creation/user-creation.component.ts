import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  employeeList: Employee[] = [];
  totalEmployees = 0;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  dialogError = '';
  searchTerm = '';
  employeeDialogVisible = false;
  editingEmployeeId: string | null = null;
  isDeletingId: string | null = null;
  departmentOptions = [
    'Human Resources',
    'Engineering',
    'Finance',
    'Marketing',
    'Operations',
    'Sales',
    'Customer Support'
  ];

  employeeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]
    }),
    department: new FormControl('', { nonNullable: true }),
    designation: new FormControl('', { nonNullable: true }),
    salary: new FormControl<number | null>(null, { validators: [Validators.min(0)] }),
    joiningDate: new FormControl('', { nonNullable: true })
  });

  constructor(private readonly employeeService: EmployeeService) {}

  loadEmployees(event?: { first?: number; rows?: number }): void {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 25;
    const page = Math.floor(first / rows) + 1;
    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees(page, rows, this.searchTerm).subscribe({
      next: response => {
        this.employeeList = response.employees;
        this.totalEmployees = response.total;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage = this.getErrorMessage(error, 'Could not load employees.');
      }
    });
  }

  searchEmployees(value: string, table: { reset: () => void }): void {
    this.searchTerm = value.trim();
    table.reset();
  }

  limitPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    const phoneNumber = input.value.replace(/\D/g, '').slice(0, 10);
    input.value = phoneNumber;
    this.employeeForm.controls.phone.setValue(phoneNumber);
  }

  addEmployee(): void {
    this.employeeForm.reset({
      name: '',
      email: '',
      password: '',
      phone: '',
      department: '',
      designation: '',
      salary: null,
      joiningDate: ''
    });
    this.editingEmployeeId = null;
    this.employeeForm.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
    this.employeeForm.controls.password.updateValueAndValidity();
    this.dialogError = '';
    this.employeeDialogVisible = true;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployeeId = employee._id;
    this.employeeForm.reset({
      name: employee.name,
      email: employee.email,
      password: employee.password,
      phone: employee.phone || '',
      department: employee.department || '',
      designation: employee.designation || '',
      salary: employee.salary ?? null,
      joiningDate: employee.joiningDate ? employee.joiningDate.substring(0, 10) : ''
    });
    this.employeeForm.controls.password.setValidators([Validators.minLength(6)]);
    this.employeeForm.controls.password.updateValueAndValidity();
    this.dialogError = '';
    this.employeeDialogVisible = true;
  }

  deleteEmployee(employee: Employee): void {
    // if (!window.confirm(`Delete ${employee.name}?`)) {
    //   return;
    // }

    this.isDeletingId = employee._id;
    this.errorMessage = '';
    this.employeeService.deleteEmployee(employee._id).subscribe({
      next: () => {
        this.isDeletingId = null;
        this.loadEmployees();
      },
      error: error => {
        this.isDeletingId = null;
        this.errorMessage = this.getErrorMessage(error, 'Could not delete employee.');
      }
    });
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const value = this.employeeForm.getRawValue();
    this.isSaving = true;
    this.dialogError = '';
    const employee = {
      name: value.name.trim(),
      email: value.email.trim(),
      ...(value.password ? { password: value.password } : {}),
      phone: value.phone.trim() || undefined,
      department: value.department || undefined,
      designation: value.designation.trim() || undefined,
      salary: value.salary ?? undefined,
      joiningDate: value.joiningDate || undefined
    };

    const request = this.editingEmployeeId
      ? this.employeeService.updateEmployee(this.editingEmployeeId, employee)
      : this.employeeService.createEmployee({ ...employee, password: value.password });

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.employeeDialogVisible = false;
        this.editingEmployeeId = null;
        this.employeeForm.reset();
        this.loadEmployees();
      },
      error: error => {
        this.isSaving = false;
        this.dialogError = this.getErrorMessage(
          error,
          this.editingEmployeeId ? 'Could not update employee.' : 'Could not create employee.'
        );
      }
    });
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.error && typeof error.error.message === 'string') {
        return error.error.message;
      }
      if (error.status === 0) {
        return 'Unable to reach the employee API. Check that the backend is running.';
      }
    }
    return fallback;
  }
}
