import { Component, inject } from '@angular/core';
import { Student } from '../../core/services/student.service';
import { log } from 'console';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private studentService = inject(Student);
  student: Student[] = [];

  ngOnInit() {
    this.loadStudents();
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
