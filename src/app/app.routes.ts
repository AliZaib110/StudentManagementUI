import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },

  {
    path: 'students',
    loadComponent: () =>
      // import('./features/students/student-list/student-list').then((m) => m.StudentList),
      import('./features/students/student-list/student-list').then((m) => m.StudentList),
  },
  {
    path: 'students/new',
    loadComponent: () =>
      import('./features/students/new-student/new-student').then((n) => n.NewStudent),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
