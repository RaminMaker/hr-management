import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'departments', loadChildren: () => import('./features/departments/departments.module').then(m => m.DepartmentsModule) }, { path: 'employees', loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
