import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { routes } from '../../app-routing.module';



export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
