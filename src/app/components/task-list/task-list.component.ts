import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Array para almacenar todas las tareas
  filteredTasks: any[] = []; // Array para almacenar las tareas filtradas

  ngOnInit() {
    this.loadTasks(); // Cargar las tareas al inicializar el componente
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks'); // Obtener tareas de localStorage
    this.tasks = storedTasks ? JSON.parse(storedTasks) : []; // Parsear y almacenar las tareas
    this.filteredTasks = [...this.tasks]; // Inicializar tareas filtradas
  }

  filterTasks(status: string) {
    if (status === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (status === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = [...this.tasks]; // Mostrar todas las tareas
    }
  }

  markAsCompleted(task: any) {
    task.completed = true; // Marcar tarea como completada
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Actualizar en localStorage
    this.filterTasks('all'); // Refrescar la lista filtrada
  }

  markAsPending(task: any) {
    task.completed = false; // Marcar tarea como pendiente
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Actualizar en localStorage
    this.filterTasks('all'); // Refrescar la lista filtrada
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Hacer casting a HTMLSelectElement
    this.filterTasks(target.value); // Obtener el valor del select
  }
}
