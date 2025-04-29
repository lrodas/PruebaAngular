import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  public taskForm?: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public _taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  addTask() {
    if (this.taskForm!.valid) {
      const task: Task = new Task(
        this.taskForm!.value.title
      )
      this._taskService.addTask(task);
      this.taskForm!.reset();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

}
