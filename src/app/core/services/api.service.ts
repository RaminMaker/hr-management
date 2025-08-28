// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';

const API_BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}



  // Department Methods
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${API_BASE_URL}/departments`);
  }
  addDepartment(departmentData: Omit<Department, 'id'>): Observable<Department> {
    return this.http.post<Department>(`${API_BASE_URL}/departments`, departmentData);
  }

  updateDepartment(id: string, data: Partial<Department>): Observable<Department> {
    return this.http.patch<Department>(`${API_BASE_URL}/departments/${id}`, data);
  }


  deleteDepartment(id: string): Observable<{}> {
    return this.http.delete<{}>(`${API_BASE_URL}/departments/${id}`);
  }

  getEmployeesByDepartmentId(departmentId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}/employees?departmentId=${departmentId}`);
  }


  // Employee Methods
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE_URL}/employees`);
  }

  addEmployee(employeeData: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(`${API_BASE_URL}/employees`, employeeData);
  }

  deleteEmployee(employeeId: string): Observable<{}> {
    return this.http.delete<{}>(`${API_BASE_URL}/employees/${employeeId}`);
  }

  updateEmployee(employeeId: string, employeeData: Partial<Employee>): Observable<Employee> {
    return this.http.patch<Employee>(`${API_BASE_URL}/employees/${employeeId}`, employeeData);
  }

}