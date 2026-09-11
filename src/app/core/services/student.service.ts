import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { StudentModule } from '../models/student.module';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Students`;

  getStudents(): Observable<StudentModule[]> {
    return this.http.get<StudentModule[]>(this.apiUrl);
  }
  getStudent(id: number): Observable<StudentModule> {
    return this.http.get<StudentModule>(`${this.apiUrl}/${id}`);
  }
  createStudent(student: any): Observable<StudentModule[]> {
    return this.http.post<StudentModule[]>(this.apiUrl, student);
  }

  // updateStudent(student: StudentModule): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${student.id}`, student);
  // }

  updateStudent(id: number, student: StudentModule): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  }
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
