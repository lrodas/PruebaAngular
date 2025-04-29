import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task_status.enum';

@Component({
  selector: 'tark-card',
  standalone: false,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  public taskStatus = TaskStatus;
  @Input() public task!: Task;
  @Output() public taskSelected: EventEmitter<Task> = new EventEmitter<Task>();

  toggleStatus(task: Task): void {
    this.taskSelected.emit(task);
  }
}
