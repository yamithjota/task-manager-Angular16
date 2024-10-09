import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-tasks',
  styleUrls: ['./tasks.component.css'],
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      people: this.fb.array([]),
    });
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('')]),
    });
    this.people.push(personForm);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number) {
    const skills = this.people.at(personIndex).get('skills') as FormArray;
    skills.push(this.fb.control(''));
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.getSkills(personIndex); // Obtener el FormArray de habilidades
    if (skills.length > 1) {
      skills.removeAt(skillIndex); // Eliminar la habilidad si hay más de una
    } else {
      alert('Debe haber al menos una habilidad por persona.');
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Validación para comprobar que cada persona tenga al menos una habilidad
      const peopleArray = this.people.controls;
      let allSkillsValid = true;

      peopleArray.forEach(person => {
        const skills = person.get('skills') as FormArray;
        if (skills.length === 0 || skills.controls.every(skill => skill.value === '')) {
          allSkillsValid = false;
        }
      });

      if (!allSkillsValid) {
        alert('Cada persona debe tener al menos una habilidad.');
        return; // No continuar si alguna persona no tiene habilidades
      }

      // Validación para comprobar nombres únicos
      const namesSet = new Set<string>();
      let hasDuplicateNames = false;

      peopleArray.forEach(person => {
        const name = person.get('name')?.value;
        if (namesSet.has(name)) {
          hasDuplicateNames = true;
        } else {
          namesSet.add(name);
        }
      });

      if (hasDuplicateNames) {
        alert('No puede haber dos personas con el mismo nombre en la misma tarea.');
        return; // No continuar si hay nombres duplicados
      }


      // Guardar la tarea en el localStorage
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(this.taskForm.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.taskForm.reset();

      // Mostrar mensaje de éxito
      alert('Tarea agregada correctamente.');
      this.taskForm.reset();

    } else {
      alert('No se puede crear una tarea vacía. Por favor, llena todos los campos requeridos.');
    }
  }
}
