import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Employee {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate: string;
  createdAt?: string;
}

export interface EmployeeListResponse {
  total: number;
  page: number;
  pages: number;
  employees: Employee[];
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate?: string;
}

export interface UpdateEmployeeRequest {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  department?: string;
  designation?: string;
  salary?: number;
  joiningDate?: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly employeesUrl = `${environment.apiUrl}/employees`;

  constructor(private readonly http: HttpClient) {}

  getEmployees(page = 1, limit = 25, search = ''): Observable<EmployeeListResponse> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    const requestParams = search ? params.set('search', search) : params;
    return this.http.get<EmployeeListResponse>(this.employeesUrl, { params: requestParams });
  }

  getEmployee(id: string): Observable<{ employee: Employee }> {
    return this.http.get<{ employee: Employee }>(`${this.employeesUrl}/${encodeURIComponent(id)}`);
  }

  createEmployee(employee: CreateEmployeeRequest): Observable<{ message: string; employee: Employee }> {
    return this.http.post<{ message: string; employee: Employee }>(this.employeesUrl, employee);
  }

  updateEmployee(id: string, employee: UpdateEmployeeRequest): Observable<{ message: string; employee: Employee }> {
    return this.http.put<{ message: string; employee: Employee }>(
      `${this.employeesUrl}/updEmp`,
      { ...employee, id }
    );
  }

  deleteEmployee(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.employeesUrl}/dltEmp`,
      { body: { id } }
    );
  }
}
