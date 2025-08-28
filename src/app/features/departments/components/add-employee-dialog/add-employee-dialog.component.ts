import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from "../../../../shared/material.module";
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';


@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    VazirFontDirective
  ],
    hostDirectives: [
          {
            directive: VazirFontDirective,
          }
        ],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss'
})
export class AddEmployeeDialogComponent {
  employeeForm: FormGroup;
  educationLevels = [
    { value: 'diploma', viewValue: 'دیپلم' },
    { value: 'bachelor', viewValue: 'کارشناسی' },
    { value: 'master', viewValue: 'کارشناسی ارشد' },
    { value: 'phd', viewValue: 'دکترا' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departmentId: string }
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['male', Validators.required],
      mobile: ['', [Validators.pattern('^09[0-9]{9}$')]], 
      education: [null, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return; 
    }

    const newEmployeeData = {
      ...this.employeeForm.value,
      departmentId: this.data.departmentId 
    };

    this.apiService.addEmployee(newEmployeeData).subscribe({
      next: (response) => {
        console.log('Employee added successfully', response);
       
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error adding employee', err);
        
      }
    });
  }

}
