import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Students`;

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
  getStudent(id:number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/${id}`);
  }
  // createStudent(student) {}
  // updateStudent(id, student) {}
  // deleteStudent(id) {}
}
