import { Component } from '@angular/core';

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
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  employeeList: Employee[] = [
    { id: 1, employeeId: 'EMP-1001', isActive: true, email: 'ava.martin@example.com', department: 'Human Resources', dispName: 'Ava Martin', jobTitle: 'HR Manager', dateJoined: '2021-04-12', age: 34 },
    { id: 2, employeeId: 'EMP-1002', isActive: true, email: 'liam.johnson@example.com', department: 'Engineering', dispName: 'Liam Johnson', jobTitle: 'Software Engineer', dateJoined: '2022-08-01', age: 29 },
    { id: 3, employeeId: 'EMP-1003', isActive: true, email: 'mia.chen@example.com', department: 'Finance', dispName: 'Mia Chen', jobTitle: 'Financial Analyst', dateJoined: '2020-11-16', age: 31 },
    { id: 4, employeeId: 'EMP-1004', isActive: false, email: 'noah.patel@example.com', department: 'Marketing', dispName: 'Noah Patel', jobTitle: 'Marketing Specialist', dateJoined: '2019-06-24', age: 37 },
    { id: 5, employeeId: 'EMP-1005', isActive: true, email: 'sophia.lee@example.com', department: 'Operations', dispName: 'Sophia Lee', jobTitle: 'Operations Lead', dateJoined: '2023-02-06', age: 28 },
    { id: 6, employeeId: 'EMP-1006', isActive: true, email: 'ethan.brown@example.com', department: 'Engineering', dispName: 'Ethan Brown', jobTitle: 'QA Engineer', dateJoined: '2021-09-20', age: 32 },
    { id: 7, employeeId: 'EMP-1007', isActive: true, email: 'isabella.garcia@example.com', department: 'Sales', dispName: 'Isabella Garcia', jobTitle: 'Account Executive', dateJoined: '2022-03-14', age: 30 },
    { id: 8, employeeId: 'EMP-1008', isActive: false, email: 'oliver.wilson@example.com', department: 'Customer Support', dispName: 'Oliver Wilson', jobTitle: 'Support Associate', dateJoined: '2020-01-27', age: 35 }
  ];
  globalSerchlist: string[] = ['employeeId', 'email', 'department', 'dispName', 'jobTitle'];

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
