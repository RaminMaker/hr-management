
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { forkJoin } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { MaterialModule } from "../../../../shared/material.module";

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Department } from '../../../../core/models/department.model';
import { AddEmployeeDialogComponent } from '../../components/add-employee-dialog/add-employee-dialog.component';
import { EmployeeDialogComponent } from '../../components/employee-dialog/employee-dialog.component';
import { EditDepartmentDialogComponent } from '../../components/edit-department-dialog/edit-department-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';

 
@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    VazirFontDirective
    // eslint-disable-next-line @angular-eslint/no-unused-imports
    // ConfirmDialogComponent
  ],
    hostDirectives: [
    {
      directive: VazirFontDirective,
    }
  ],
})
export class DepartmentListComponent implements OnInit, AfterViewInit {
  departmentForm: FormGroup;
  departments: any[] = [];
  employees: any[] = [];
  selectedDepartmentEmployees: any[] = [];
  selectedDepartmentName: string | null = null;
  isLoading = true;
  
  displayedColumns: string[] = ['id', 'name', 'status', 'creationDate', 'actions'];

  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      status: ['active', Validators.required],
      creationDate: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.isLoading = true;
    this.apiService.getDepartments().subscribe(departments => {
      this.dataSource.data = departments;
      this.isLoading = false;
    }, error => {
      console.error('Error loading departments', error);
      this.isLoading = false;
    });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.apiService.addDepartment(this.departmentForm.value).subscribe(() => {
        this.loadData(); 
        this.departmentForm.reset({ status: 'active', creationDate: new Date() });
      });
    }
  }


  onViewDetails(department: Department): void {
    //const departmentEmployees = this.employees.filter(emp => emp.departmentId === department.id);
    
    // this.isLoading = true;


    this.apiService.getEmployeesByDepartmentId(department.id).subscribe({
      next: (employeesOfDept) => {
        this.dialog.open(EmployeeDialogComponent, {
          width: '700px',
          direction: 'rtl',
          data: {
            departmentName: department.name,
            employees: employeesOfDept
          }
        });
      },
      error: (err) => {

        console.error(`Error fetching employees for department ${department.id}`, err);

      }
    });
  }

  onEdit(department: Department, event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(EditDepartmentDialogComponent, {
      width: '450px',
      direction: 'rtl',
      data: department 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.loadData(); 
        
      }
    });
  }

  onDelete(department: Department, event: MouseEvent): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      direction: 'rtl',
      data: {
        title: 'تایید حذف واحد',
        message: `آیا از حذف واحد "${department.name}" اطمینان دارید؟ این عملیات غیرقابل بازگشت است.`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
 
        this.apiService.deleteDepartment(department.id).subscribe({
          next: () => {
            this.loadData();
            
          },
          error: (err) => console.error('Error deleting department', err)
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onRowClick(department: any): void {
    this.selectedDepartmentName = department.name;
    
    this.selectedDepartmentEmployees = this.employees.filter(emp => emp.departmentId === department.id);
  }



  onAddEmployee(department: Department, event: MouseEvent): void {
    event.stopPropagation(); 

    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '700px',
      direction: 'rtl',
      data: { departmentId: department.id } 
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        console.log('Employee added, you might want to refresh data or show a success message.');
        
      }
    });
  }
}