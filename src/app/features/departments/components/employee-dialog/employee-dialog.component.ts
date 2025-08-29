

import { Component, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'; 


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';

import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../../shared/material.module';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

import { Employee } from '../../../../core/models/employee.model';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';

import { Subject,filter, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatPaginatorModule,
    VazirFontDirective
    // eslint-disable-next-line @angular-eslint/no-unused-imports
    //ConfirmDialogComponent,
    // eslint-disable-next-line @angular-eslint/no-unused-imports
    //EditEmployeeDialogComponent,

  ],
      hostDirectives: [
      {
        directive: VazirFontDirective,
      }
    ],
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements AfterViewInit, OnDestroy {

 @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'gender', 'education', 'actions'];

  private destroy$ = new Subject<void>();


  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departmentName: string, employees: any[] },
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
    this.dataSource.data = data.employees;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  translateEducation(education: string): string {
    const map: { [key: string]: string } = {
      'diploma': 'دیپلم',
      'bachelor': 'کارشناسی',
      'master': 'کارشناسی ارشد',
      'phd': 'دکترا'
    };
    return map[education] || education;
  }

onEditEmployee(employee: Employee): void {
  const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
    width: '400px',
    direction: 'rtl',
    data: employee 
  });

  dialogRef.afterClosed()
    .pipe(
      takeUntil(this.destroy$),
      filter(updatedEmployee => !!updatedEmployee) 
    )
    .subscribe((updatedEmployee: Employee) => {
      const index = this.dataSource.data.findIndex(emp => emp.id === updatedEmployee.id);
      if (index > -1) {
        const currentData = this.dataSource.data;
        currentData[index] = updatedEmployee;
        this.dataSource.data = [...currentData]; 
      }
    });
}

onDeleteEmployee(employee: Employee): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    direction: 'rtl',
    data: {
      title: 'تایید حذف کارمند',
      message: `آیا از حذف کارمند "${employee.name}" اطمینان دارید؟`
    }
  });

  dialogRef.afterClosed()
    .pipe(
      takeUntil(this.destroy$), 
      filter(result => !!result), 
      switchMap(() => 
        this.apiService.deleteEmployee(employee.id) 
      )
    )
    .subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== employee.id);
      },
      error: (err) => console.error('Error deleting employee', err)
    });
}

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}