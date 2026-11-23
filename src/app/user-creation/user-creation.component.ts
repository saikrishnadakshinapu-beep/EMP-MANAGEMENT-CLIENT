import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Employee {
  id: number;
  employeeId: string;
  isActive: boolean;
  email: string;
  department: string;
  dispName: string;
  jobTitle: string;
  dateJoined: string;
  age: number;
  username: string;
  password: string;
  gender: string;
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  private readonly employeesStorageKey = 'employees';

  employeeList: Employee[] = [
    { id: 1, employeeId: 'EMP-1001', isActive: true, email: 'sita.rama@example.com', department: 'Human Resources', dispName: 'Sita Rama', jobTitle: 'HR Manager', dateJoined: '2021-04-12', age: 34, username: 'sita.rama', password: '', gender: 'Female' },
    { id: 2, employeeId: 'EMP-1002', isActive: true, email: 'krishna.reddy@example.com', department: 'Engineering', dispName: 'Krishna Reddy', jobTitle: 'Software Engineer', dateJoined: '2022-08-01', age: 29, username: 'krishna.reddy', password: '', gender: 'Male' },
    { id: 3, employeeId: 'EMP-1003', isActive: true, email: 'lakshmi.devi@example.com', department: 'Finance', dispName: 'Lakshmi Devi', jobTitle: 'Financial Analyst', dateJoined: '2020-11-16', age: 31, username: 'lakshmi.devi', password: '', gender: 'Female' },
    { id: 4, employeeId: 'EMP-1004', isActive: false, email: 'rama.rao@example.com', department: 'Marketing', dispName: 'Rama Rao', jobTitle: 'Marketing Specialist', dateJoined: '2019-06-24', age: 37, username: 'rama.rao', password: '', gender: 'Male' },
    { id: 5, employeeId: 'EMP-1005', isActive: true, email: 'ramya.naidu@example.com', department: 'Operations', dispName: 'Ramya Naidu', jobTitle: 'Operations Lead', dateJoined: '2023-02-06', age: 28, username: 'ramya.naidu', password: '', gender: 'Female' },
    { id: 6, employeeId: 'EMP-1006', isActive: true, email: 'sai.krishna@example.com', department: 'Engineering', dispName: 'Sai Krishna', jobTitle: 'QA Engineer', dateJoined: '2021-09-20', age: 32, username: 'sai.krishna', password: '', gender: 'Male' },
    { id: 7, employeeId: 'EMP-1007', isActive: true, email: 'ananya.prasad@example.com', department: 'Sales', dispName: 'Ananya Prasad', jobTitle: 'Account Executive', dateJoined: '2022-03-14', age: 30, username: 'ananya.prasad', password: '', gender: 'Female' },
    { id: 8, employeeId: 'EMP-1008', isActive: false, email: 'naveen.kumar@example.com', department: 'Customer Support', dispName: 'Naveen Kumar', jobTitle: 'Support Associate', dateJoined: '2020-01-27', age: 35, username: 'naveen.kumar', password: '', gender: 'Male' }
  ];

  constructor() {
    const storedEmployees = localStorage.getItem(this.employeesStorageKey);
    if (storedEmployees) {
      try {
        const employees = JSON.parse(storedEmployees) as Employee[];
        if (Array.isArray(employees)) {
          this.employeeList = employees;
        }
      } catch {
        localStorage.removeItem(this.employeesStorageKey);
      }
    } else {
      this.saveEmployees();
    }
  }
  globalSerchlist: string[] = ['employeeId', 'email', 'department', 'dispName', 'jobTitle', 'gender', 'username'];

  employeeDialogVisible = false;
  editingEmployeeId: number | null = null;
  genderOptions = ['Male', 'Female', 'Other'];
  departmentOptions = [
    'Human Resources',
    'Engineering',
    'Finance',
    'Marketing',
    'Operations',
    'Sales',
    'Customer Support',
    'Unassigned'
  ];

  employeeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(18), Validators.max(100)] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    department: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    jobTitle: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  addEmployee(): void {
    this.editingEmployeeId = null;
    this.employeeForm.reset({
      name: '',
      age: null,
      username: '',
      password: '',
      gender: '',
      email: '',
      department: '',
      jobTitle: ''
    });
    this.employeeDialogVisible = true;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployeeId = employee.id;
    this.employeeForm.reset({
      name: employee.dispName,
      age: employee.age,
      username: employee.username,
      password: employee.password,
      gender: employee.gender,
      email: employee.email,
      department: employee.department,
      jobTitle: employee.jobTitle
    });
    this.employeeDialogVisible = true;
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const value = this.employeeForm.getRawValue();
    if (this.editingEmployeeId !== null) {
      const employee = this.employeeList.find(item => item.id === this.editingEmployeeId);
      if (employee) {
        Object.assign(employee, {
          dispName: value.name,
          age: value.age,
          username: value.username,
          password: value.password,
          gender: value.gender,
          email: value.email,
          department: value.department,
          jobTitle: value.jobTitle
        });
      }
    } else {
      const nextId = this.employeeList.length
        ? Math.max(...this.employeeList.map(employee => employee.id)) + 1
        : 1;
      this.employeeList = [...this.employeeList, {
        id: nextId,
        employeeId: `EMP-${1000 + nextId}`,
        isActive: true,
        email: value.email,
        department: value.department,
        dispName: value.name,
        jobTitle: value.jobTitle,
        dateJoined: new Date().toISOString().substring(0, 10),
        age: value.age as number,
        username: value.username,
        password: value.password,
        gender: value.gender
      }];
    }

    this.saveEmployees();
    this.employeeDialogVisible = false;
  }

  deleteEmployee(employee: Employee): void {
    this.employeeList = this.employeeList.filter(item => item.id !== employee.id);
    this.saveEmployees();
  }

  private saveEmployees(): void {
    localStorage.setItem(this.employeesStorageKey, JSON.stringify(this.employeeList));
  }

  public page: any = { first: 0, last: 0 };
  pageReportReq(table: any): void {
    if (table.totalRecords == 0) {
      this.page.first = 0;
      this.page.last = 0;
    }
    else if (table.totalRecords > table.rows) {
      this.page.first = table.first + 1;
      this.page.last = table.first ? this.page.first + (table.rows - 1) : table.rows;
      if (table.totalRecords < this.page.last) {
        this.page.last = table.totalRecords;
      }
    }
    else {
      this.page.first = (table.first * table.totalRecords) + 1;
      this.page.last = table.totalRecords * (table.first + 1);
    }
    return this.page.first && this.page.last;
  }
}
