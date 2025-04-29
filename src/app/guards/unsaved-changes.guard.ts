import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { TodoComponent } from '../components/todo/todo.component';

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<TodoComponent> {
  canDeactivate(component: TodoComponent): boolean {
    console.log('UnsavedChangesGuard#canDeactivate called');
    return !component.hasUnsavedChanges || confirm('Tienes cambios sin guardar. ¿Deseas salir?');
  }
}
