import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  standalone: false,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  private subscription!: Subscription;
  hasUnsavedChanges: boolean = false;

  constructor(
    public readonly _taskService: TaskService,
  ){}

  ngOnInit(): void {
    this.subscription = this._taskService.hasUnsavedChanges().subscribe((unsaved) => {
      this.hasUnsavedChanges = unsaved;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleTask(task: any) {
    this._taskService.toggleTaskStatus(task.id);
  }

  public saveTasks(): void {
    this._taskService.saveToLocalStorage();
  }
}
