import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { TarkCardComponent } from './tark-card/tark-card.component';



@NgModule({
  declarations: [
    TodoComponent,
    TaskFormComponent,
    TarkCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    TodoComponent,
    TaskFormComponent,
    TarkCardComponent
  ],
})
export class ComponentsModule { }
