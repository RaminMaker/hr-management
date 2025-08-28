import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [ 
  {
    path: 'departments',
    loadChildren: () => import('./features/departments/departments-routing.module').then(m => m.DEPARTMENT_ROUTES)
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees-routing.module').then(m => m.EMPLOYEE_ROUTES)
  },
  {
    path: '',
    redirectTo: 'departments', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
