import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskStatus } from '../models/task_status.enum';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private unsavedChanges = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _storageServie: StorageService
  ) {
    this.loadFromLocalStorage();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  hasUnsavedChanges(): BehaviorSubject<boolean> {
    return this.unsavedChanges;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.unsavedChanges.next(true);
  }

  toggleTaskStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      console.error('Task not found');
      return;
    }
    task.status = task.status === TaskStatus.INCOMPLETE ? TaskStatus.COMPLETE : TaskStatus.INCOMPLETE;
    this.unsavedChanges.next(true);
  }

  loadFromLocalStorage(): void {
    this.tasks = this._storageServie.getLocalStorage<Task[]>('tasks') || [];
  }


  saveToLocalStorage(): void {
    this._storageServie.cleanLocalStorage();
    this._storageServie.saveLocalStorage<Task[]>('tasks', this.tasks);
    this.unsavedChanges.next(false);
  }
}
