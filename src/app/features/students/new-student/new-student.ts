import { CommonModule } from '@angular/common';
import { StudentService } from './../../../core/services/student.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModule } from '../../../core/models/student.module';

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
  private route = inject(ActivatedRoute);

  studentId: number | null = null;

  studentForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.required, Validators.min(10)]],
    course: ['', [Validators.required]],
    address: ['', [Validators.required]],
  });
  createdDate: string = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentId = Number(id);
      this.loadStudent();
    }
  }

  isLoading: boolean = false;
  errorMessage: string = '';
  isSaving = false;

  loadStudent() {
    if (!this.studentId) return;

    this.isLoading = true;

    this.studentService.getStudent(this.studentId).subscribe({
      next: (student: StudentModule) => {
        this.createdDate = student.createdDate;

        this.studentForm.patchValue({
          name: student.name,
          email: student.email,
          age: student.age,
          course: student.course,
          address: student.address,
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load student:', error);

        this.errorMessage = 'Unable to load student.';
        this.isLoading = false;
      },
    });
  }

  saveStudent() {
    debugger;
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.studentForm.markAllAsDirty();
      return;
    }

    // this.isLoading = true;
    this.isSaving = true;
    this.errorMessage = '';

    const formData = this.studentForm.getRawValue();

    // Edit

    if (this.studentId) {
      const student: StudentModule = {
        id: this.studentId,
        name: formData.name,
        email: formData.email,
        age: formData.age,
        course: formData.course,
        address: formData.address,
        createdDate: this.createdDate,
      };

      this.studentService.updateStudent(this.studentId, student).subscribe({
        next: () => {
          // this.router.navigate([`/students/edit${this.studentId}`]);
          this.isSaving = false;
          this.loadStudent(); // reload updated record from API
        },
        error: (error) => {
          console.error('Update error:', error);
          this.isSaving = false;

          this.errorMessage =
            error.status === 403
              ? 'You do not have permission to update students.'
              : 'Failed to update student.';

          this.isSaving = false;
        },
      });
      return;
    }

    // Create

    this.studentService.createStudent(formData).subscribe({
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
