import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';



import { MaterialModule } from "../../../../shared/material.module";
import { ApiService } from '../../../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { Department } from '../../../../core/models/department.model';
import { VazirFontDirective } from '../../../../shared/directives/vazir-font.directive';

@Component({
  selector: 'app-edit-department-dialog',
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
  templateUrl: './edit-department-dialog.component.html',
  styleUrl: './edit-department-dialog.component.scss'
})
export class EditDepartmentDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditDepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public department: Department
  ) {
    this.editForm = this.fb.group({
      name: [department.name, Validators.required],
      status: [department.status, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.apiService.updateDepartment(this.department.id, this.editForm.value).subscribe({
      next: () => {
        this.dialogRef.close(true); 
      },
      error: (err) => console.error('Error updating department', err)
    });
  }
}
