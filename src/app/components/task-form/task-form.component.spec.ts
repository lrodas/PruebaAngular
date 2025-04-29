import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task_status.enum';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    // Crear un mock para TaskService
    mockTaskService = jasmine.createSpyObj('TaskService', ['addTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule], // Importar ReactiveFormsModule para trabajar con formularios reactivos
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el formulario correctamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input[formControlName="title"]');
    const buttonElement = compiled.querySelector('button[type="submit"]');

    expect(inputElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(buttonElement?.textContent).toContain('Add');
  });

  it('debería marcar el formulario como inválido si el título está vacío', () => {
    component.taskForm?.controls['title'].setValue('');
    expect(component.taskForm?.valid).toBeFalse();
  });

  it('debería marcar el formulario como válido si el título tiene al menos 3 caracteres', () => {
    component.taskForm?.controls['title'].setValue('Nueva tarea');
    expect(component.taskForm?.valid).toBeTrue();
  });

  it('debería llamar a TaskService.addTask al enviar un formulario válido', () => {
    const mockTask: Task = { id: 1, title: 'Nueva tarea', status: TaskStatus.INCOMPLETE };
    component.taskForm?.controls['title'].setValue(mockTask.title);

    component.addTask();

    expect(mockTaskService.addTask).toHaveBeenCalledWith(jasmine.objectContaining({ title: mockTask.title }));
  });

  it('debería reiniciar el formulario después de agregar una tarea válida', () => {
    component.taskForm?.controls['title'].setValue('Nueva tarea');
    component.addTask();

    expect(component.taskForm?.value.title).toBeNull();
  });

  it('debería mostrar una alerta si el formulario es inválido', () => {
    spyOn(window, 'alert');
    component.taskForm?.controls['title'].setValue('');
    component.addTask();

    expect(window.alert).toHaveBeenCalledWith('Por favor, complete todos los campos.');
  });
});
