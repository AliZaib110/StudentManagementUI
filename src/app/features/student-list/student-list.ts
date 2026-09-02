import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Student } from '../../core/services/student.service';
import { log } from 'console';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private studentService = inject(Student);
  private readonly platformId = inject(PLATFORM_ID);
  student: Student[] = [];

  ngOnInit() {
    // this.loadStudents();
    if (isPlatformBrowser(this.platformId)) {
      this.loadStudents();
    }
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.student = students;
        console.log('student list =>', this.student);
      },
      error: (error) => {
        console.error('Failed to load student list', error);
      },
    });
  }
}
