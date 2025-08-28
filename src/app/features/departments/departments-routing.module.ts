// .../departments/departments-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './pages/department-list/department-list.component';

import { routes } from '../../app-routing.module';


export const DEPARTMENT_ROUTES: Routes = [
  {
    path: '',
    component: DepartmentListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
