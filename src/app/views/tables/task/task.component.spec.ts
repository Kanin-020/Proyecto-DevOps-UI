import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';
import { TaskService } from 'src/app/services/task/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [TaskService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería realizar una llamada para obtener el array de tareas', async () => {
    const response = [{ id: "1", nombre: 'Task 1' }, { id: "2", nombre: 'Task 2' }];
    spyOn(taskService, 'getTaskList').and.returnValue(of(response));

    await component.getTaskList();

    expect(component.taskArray).toEqual(response);
  });

  it('Debería realizar la llamada para crear una tarea y cerrar el popup', async () => {
    const taskData = {
      nombre: 'New Task',
      descripcion: 'Description',
      estado: 'In Progress',
      fecha_entrega: "25/04/2023",
      proyecto_asociado: 1
    };

    spyOn(taskService, 'addTask').and.returnValue(of({}));
    spyOn(component, 'closeAddPopup');

    component.taskData = taskData;
    component.createTask();

    expect(taskService.addTask).toHaveBeenCalledWith(
      taskData.nombre,
      taskData.descripcion,
      taskData.estado,
      taskData.fecha_entrega,
      taskData.proyecto_asociado
    );
    expect(component.closeAddPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada para editar una tarea y cerrar el popup', async () => {
    const editingElement = {
      id: "1",
      nombre: "Task 1",
      descripcion: "Description 1",
      fecha_entrega: "10/04/2023",
      proyecto_asociado: 2
    };
    const taskData = {
      nombre: 'Updated Task',
      descripcion: 'Updated Description',
      estado: 'Completed',
      fecha_entrega: "25/04/2023",
      proyecto_asociado: 1
    };

    spyOn(taskService, 'updateTaskInfo').and.returnValue(of({}));
    spyOn(component, 'closeEditorPopup');

    component.editingElement = editingElement;
    component.taskData = taskData;
    await component.editTask();

    expect(taskService.updateTaskInfo).toHaveBeenCalledWith(
      editingElement.id,
      taskData.nombre,
      taskData.descripcion,
      taskData.estado,
      taskData.fecha_entrega,
      taskData.proyecto_asociado
    );
    expect(component.closeEditorPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada para eliminar la tarea', async () => {
    const taskId = '1';
    spyOn(taskService, 'deleteTask').and.returnValue(of({}));

    await component.deleteTask(taskId);

    expect(taskService.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('Debería abrir el popup para agregar una tarea', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.openAddPopup();

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
  });

  it('Debería cerrar el popup para agregar una tarea', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.closeAddPopup();

    expect(popup.style.display).toBe('');
  });

  it('Debería abrir el popup y mandar un dato para editar', () => {
    const editingElement = { id: "1", nombre: 'Task 1' };
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupEdit';
    document.body.appendChild(popup);

    component.openEditorPopup(editingElement);

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
    expect(component.editingElement).toEqual(editingElement);
  });

  it('Debería cerrar el popup de edición', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupEdit';
    document.body.appendChild(popup);

    component.closeEditorPopup();

    expect(popup.style.display).toBe('');
  });
});
