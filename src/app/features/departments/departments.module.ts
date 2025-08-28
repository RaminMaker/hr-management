// src/app/features/departments/departments.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
 
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { AddEmployeeDialogComponent } from './components/add-employee-dialog/add-employee-dialog.component';
import { EditDepartmentDialogComponent } from './components/edit-department-dialog/edit-department-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { EditEmployeeDialogComponent } from './components/edit-employee-dialog/edit-employee-dialog.component';

@NgModule({ 
  declarations: [
     

  
    // EditEmployeeDialogComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class DepartmentsModule { }