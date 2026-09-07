import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { log } from 'console';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StudentModule } from '../../../core/models/student.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private studentService = inject(StudentService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  // isLoading: boolean = false;
  // errorMessage: string = '';
  // students: StudentModule[] = [];
  // searchTerm: string = '';

  students = signal<StudentModule[]>([]);
  searchTerm = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    // this.loadStudents();
    // Don't call protected API during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.loadStudents();
    }
  }

  // loadStudents() {
  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   this.studentService.getStudents().subscribe({
  //     next: (students) => {
  //       this.studentss = students;
  //       console.log('stud ====>', this.studentss);

  //       this.isLoading = false;
  //     },

  //     error: (error) => {
  //       console.error('Failed to load students:', error);

  //       this.isLoading = false;
  //       this.errorMessage = 'Unable to load students. Please try again.';
  //     },
  //   });
  // }

  // get filteredStudents(): StudentModule[] {
  //   const search = this.searchTerm.trim().toLowerCase();

  //   if (search=='') {
  //     console.log('Students List = > ', this.students);
  //     return this.students;
  //   }

  //   return this.students.filter(
  //     (student) =>
  //       student.name.toLowerCase().includes(search) ||
  //       student.email.toLowerCase().includes(search) ||
  //       student.course.toLowerCase().includes(search) ||
  //       student.address.toLowerCase().includes(search),
  //   );
  // }
  loadStudents(): void {
    this.isLoading.set(true);

    this.studentService.getStudents().subscribe({
      next: (students) => {
        console.log('stud ====>', students);

        this.students.set(students);
        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Failed to load students:', error);

        this.isLoading.set(false);
        this.errorMessage.set('Unable to load students. Please try again.');
      },
    });
  }

  createStudent(): void {
    this.router.navigate(['/students/create']);
  }

  editStudent(id: number): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(student: StudentModule): void {
    const confirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);

    if (!confirmed) {
      return;
    }

    this.studentService.deleteStudent(student.id).subscribe({
      next: () => {
        // Remove from current list
        this.students;
        // this.students.filter((s) => s.id !== student.id);
      },

      error: (error) => {
        console.error('Failed to delete student:', error);

        if (error.status === 403) {
          // this.errorMessage = 'You do not have permission to delete students.';
        } else {
          // this.errorMessage = 'Failed to delete student. Please try again.';
        }
      },
    });
  }
}
