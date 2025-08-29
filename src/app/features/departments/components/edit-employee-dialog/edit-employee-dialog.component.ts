

import { Component, Inject, OnDestroy } from '@angular/core';  
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { Employee } from '../../../../core/models/employee.model';


import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../core/services/api.service';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';

import { Subject,filter, switchMap, takeUntil,take } from 'rxjs';

@Component({
  selector: 'app-edit-employee-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatRadioModule, MatButtonModule, MatIconModule,VazirFontDirective
  ],
  hostDirectives: [
        {
          directive: VazirFontDirective,
        }
      ],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss'] 
})
export class EditEmployeeDialogComponent {

  private destroy$ = new Subject<void>();
  
  editForm: FormGroup;
  
  educationLevels = [
    { value: 'diploma', viewValue: 'دیپلم' },
    { value: 'bachelor', viewValue: 'کارشناسی' },
    { value: 'master', viewValue: 'کارشناسی ارشد' },
    { value: 'phd', viewValue: 'دکترا' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee
  ) {
    this.editForm = this.fb.group({
      name: [employee.name, Validators.required],
      gender: [employee.gender, Validators.required],
      mobile: [employee.mobile, [Validators.pattern('^09[0-9]{9}$')]],
      education: [employee.education, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

onSubmit(): void {
  if (this.editForm.invalid || !this.editForm.dirty) {
    return;
  }

  this.apiService.updateEmployee(this.employee.id, this.editForm.value)
    .pipe(take(1)) 
    .subscribe({
      next: (updatedEmployee) => {
        this.dialogRef.close(updatedEmployee);
      },
      error: (err) => console.error('Error updating employee', err)
    });
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
