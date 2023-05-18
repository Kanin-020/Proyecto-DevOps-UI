import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './project.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { SessionGuard } from 'src/app/guards/session.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [ProjectService, SessionGuard]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería realizar una llamada para obtener el array de proyectos', () => {
    const response = [
      {
        id: "1",
        nombre: 'Project 1',
        descripcion: 'Description 1',
        materia: 'Materia 1',
        fecha_entrega: '2023-05-17',
        usuario_asignado: 1
      }
    ];

    spyOn(projectService, 'getProjectList').and.returnValue(of(response));

    component.getProjectList();

    expect(projectService.getProjectList).toHaveBeenCalled();
    expect(component.projectArray).toEqual(response);
  });

  it('Debería realizar la llamada para crear un proyecto y cerrar el popup', () => {
    const projectData = {
      nombre: 'New Project',
      descripcion: 'New Description',
      materia: 'New Materia',
      fecha_entrega: '2023-05-18',
      usuario_asignado: 2
    };

    spyOn(projectService, 'addProject').and.returnValue(of({}));
    spyOn(component, 'closeAddPopup');

    component.projectData = projectData;
    component.createProject();

    expect(projectService.addProject).toHaveBeenCalledWith(
      projectData.nombre,
      projectData.descripcion,
      projectData.materia,
      projectData.fecha_entrega,
      projectData.usuario_asignado
    );
    expect(component.closeAddPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada para editar un proyecto y cerrar el popup', () => {
    const editingElement = {
      id: "1",
      nombre: 'Project 1',
      descripcion: 'Description 1',
      materia: 'Materia 1',
      fecha_entrega: '2023-05-17',
      usuario_asignado: 1
    };
    const projectData = {
      nombre: 'Updated Project',
      descripcion: 'Updated Description',
      materia: 'Updated Materia',
      fecha_entrega: '2023-05-18',
      usuario_asignado: 2
    };

    spyOn(projectService, 'updateProjectInfo').and.returnValue(of({}));
    spyOn(component, 'closeEditorPopup');

    component.editingElement = editingElement;
    component.projectData = projectData;
    component.editProject();

    expect(projectService.updateProjectInfo).toHaveBeenCalledWith(
      editingElement.id,
      projectData.nombre,
      projectData.descripcion,
      projectData.materia,
      projectData.fecha_entrega,
      projectData.usuario_asignado
    );
    expect(component.closeEditorPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada para eliminar el proyecto', () => {
    const projectId = '1';

    spyOn(projectService, 'deleteProject').and.returnValue(of({}));

    component.deleteProject(projectId);

    expect(projectService.deleteProject).toHaveBeenCalledWith(projectId);
  });

  it('Debería abrir el popup para agregar', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.openAddPopup();

    const computedStyle = getComputedStyle(popup);
    expect(computedStyle.display).toBe('block');
  });

  it('Debería cerrar el popup para agregar', () => {
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupAdd';
    document.body.appendChild(popup);

    component.closeAddPopup();

    expect(popup.style.display).toBe('');
  });

  it('Debería abrir el popup y mandar un dato para editar', () => {
    const editingElement = {
      id: "1",
      nombre: 'Project 1',
      descripcion: 'Description 1',
      materia: 'Materia 1',
      fecha_entrega: '2023-05-17',
      usuario_asignado: 1
    };
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
