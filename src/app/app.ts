import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentList } from "./features/student-list/student-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-management-ui');
}
