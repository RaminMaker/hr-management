
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { forkJoin } from 'rxjs';

import { ApiService } from '../../../../core/services/api.service';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports:[VazirFontDirective],
    hostDirectives: [
          {
            directive: VazirFontDirective,
          }
        ],
})
export class EmployeeListComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];
  departments: any[] = [];
  isLoading = true;
  educationLevels = [
    { value: 'diploma', viewValue: 'دیپلم' },
    { value: 'bachelor', viewValue: 'کارشناسی' },
    { value: 'master', viewValue: 'کارشناسی ارشد' },
    { value: 'phd', viewValue: 'دکترا' }
  ];
  
  displayedColumns: string[] = ['id', 'name', 'departmentName', 'gender', 'mobile', 'education'];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      departmentId: [null, Validators.required],
      gender: ['male', Validators.required],
      mobile: ['', Validators.pattern('^09[0-9]{9}$')], 
      education: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    forkJoin({
      employees: this.apiService.getEmployees(),
      departments: this.apiService.getDepartments()
    }).subscribe(({ employees, departments }) => {
      this.departments = departments;

      this.employees = employees.map(emp => ({
        ...emp,
        departmentName: this.getDepartmentName(emp.departmentId)
      }));
      this.isLoading = false;
    });
  }

  getDepartmentName(id: number): string {
    const department = this.departments.find(d => d.id === id);
    return department ? department.name : 'نامشخص';
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.apiService.addEmployee(this.employeeForm.value).subscribe(() => {
        this.loadData();
        this.employeeForm.reset({ gender: 'male' });
      });
    }
  }
}