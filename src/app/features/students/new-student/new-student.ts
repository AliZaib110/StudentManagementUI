import { CommonModule } from '@angular/common';
import { StudentService } from './../../../core/services/student.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-new-student',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-student.html',
  styleUrl: './new-student.css',
})
export class NewStudent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(10)]],
    course: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  isLoading: boolean = false;
  errorMessage: string = '';

  submitStudent() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.studentForm.markAllAsDirty();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.studentService.createStudent(this.studentForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Create student error:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to create student';
      },
    });
  }
  cancel(): void {
    this.router.navigate(['/students']);
  }
}
