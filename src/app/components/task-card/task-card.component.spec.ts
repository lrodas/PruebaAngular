import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task_status.enum';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent], // Declarar el componente
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.task = { id: 1, title: 'Tarea inicial', status: TaskStatus.INCOMPLETE };
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título de la tarea', () => {
    const mockTask: Task = { id: 1, title: 'Tarea de prueba', status: TaskStatus.INCOMPLETE };
    component.task = mockTask;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('span.text-lg.font-medium');
    expect(titleElement?.textContent).toContain('Tarea de prueba');
  });

  it('debería aplicar el estilo "line-through" si la tarea está completa', () => {
    const mockTask: Task = { id: 1, title: 'Tarea completa', status: TaskStatus.COMPLETE };
    component.task = mockTask;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const labelElement = compiled.querySelector('label');
    expect(labelElement?.style.textDecoration).toBe('line-through');
  });

  it('debería no aplicar el estilo "line-through" si la tarea está incompleta', () => {
    const mockTask: Task = { id: 1, title: 'Tarea incompleta', status: TaskStatus.INCOMPLETE };
    component.task = mockTask;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const labelElement = compiled.querySelector('label');
    expect(labelElement?.style.textDecoration).toBe('none');
  });

  it('debería emitir el evento "taskSelected" al cambiar el estado de la tarea', () => {
    const mockTask: Task = { id: 1, title: 'Tarea de prueba', status: TaskStatus.INCOMPLETE };
    component.task = mockTask;
    spyOn(component.taskSelected, 'emit'); // Espiar el método emit
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.dispatchEvent(new Event('change')); // Simular el cambio de estado

    expect(component.taskSelected.emit).toHaveBeenCalledWith(mockTask);
  });
});
