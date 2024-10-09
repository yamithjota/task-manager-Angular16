import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: any[] = [];

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  getTasks() {
    return this.tasks;
  }

  saveTask(task: any) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(index: number, task: any) {
    this.tasks[index] = task;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
