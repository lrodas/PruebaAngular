import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { StorageService } from './storage.service';
import { Task } from '../models/task.model';
import { TaskStatus } from '../models/task_status.enum';

describe('TaskService', () => {
  let service: TaskService;
  let mockStorageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    // Crear un mock para el StorageService
    mockStorageService = jasmine.createSpyObj('StorageService', ['getLocalStorage', 'saveLocalStorage', 'cleanLocalStorage']);

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: StorageService, useValue: mockStorageService }
      ]
    });

    service = TestBed.inject(TaskService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería cargar tareas desde el almacenamiento local al inicializar', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Tarea 1', status: TaskStatus.INCOMPLETE },
      { id: 2, title: 'Tarea 2', status: TaskStatus.COMPLETE }
    ];
    mockStorageService.getLocalStorage.and.returnValue(mockTasks);

    service.loadFromLocalStorage();

    expect(service.getTasks()).toEqual(mockTasks);
    expect(mockStorageService.getLocalStorage).toHaveBeenCalledWith('tasks');
  });

  it('debería agregar una tarea y marcar cambios como no guardados', () => {
    const newTask: Task = { id: 1, title: 'Nueva tarea', status: TaskStatus.INCOMPLETE };

    service.addTask(newTask);

    expect(service.getTasks().length).toBe(1);
    expect(service.getTasks()[0]).toEqual(newTask);
    service.hasUnsavedChanges().subscribe((unsaved) => {
      expect(unsaved).toBeTrue();
    });
  });

  it('debería cambiar el estado de una tarea existente', () => {
    const task: Task = { id: 1, title: 'Tarea existente', status: TaskStatus.INCOMPLETE };
    service.addTask(task);

    service.toggleTaskStatus(1);

    expect(service.getTasks()[0].status).toBe(TaskStatus.COMPLETE);
    service.hasUnsavedChanges().subscribe((unsaved) => {
      expect(unsaved).toBeTrue();
    });
  });

  it('debería guardar las tareas en el almacenamiento local y marcar cambios como guardados', () => {
    const task: Task = { id: 1, title: 'Tarea para guardar', status: TaskStatus.INCOMPLETE };
    service.addTask(task);

    service.saveToLocalStorage();

    expect(mockStorageService.cleanLocalStorage).toHaveBeenCalled();
    expect(mockStorageService.saveLocalStorage).toHaveBeenCalledWith('tasks', [task]);
    service.hasUnsavedChanges().subscribe((unsaved) => {
      expect(unsaved).toBeFalse();
    });
  });

  it('debería manejar el caso en el que no se encuentre una tarea al cambiar su estado', () => {
    spyOn(console, 'error');

    service.toggleTaskStatus(999); // ID inexistente

    expect(console.error).toHaveBeenCalledWith('Task not found');
  });
});
