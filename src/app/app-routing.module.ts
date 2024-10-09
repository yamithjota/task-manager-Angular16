import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirigir a la vista de tareas por defecto
  { path: 'tasks', component: TasksComponent }, // Ruta para crear tareas
  { path: 'task-list', component: TaskListComponent }, // Ruta para listar tareas
  { path: '**', redirectTo: '/tasks' } // Redirigir cualquier otra ruta a tasks
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
