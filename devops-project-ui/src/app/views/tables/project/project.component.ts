import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [SessionGuard]
})
export class ProjectComponent implements OnInit {

  editingElement: any = {id: 1, nombre: 'default', descripcion: 'default', materia: 'default', fecha_entrega: 'default', usuario_asignado: 1};
  projectData: any = {};
  projectArray: any = [];
  formItem!: FormGroup;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectList();
    this.formItem = new FormGroup({
      nombre: new FormControl(this.projectData.nombre),
      descripcion: new FormControl(this.projectData.descripcion),
      materia: new FormControl(this.projectData.materia),
      fecha_entrega: new FormControl(this.projectData.fecha_entrega),
      usuario_asignado: new FormControl(this.projectData.usuario_asignado),
    })
  }
  
  async getProjectList() {

    this.projectService.getProjectList().subscribe(
      (response: any) => {

        this.projectArray = response;

        return response;
      },
    );
  }

  async createProject() {

    var { nombre, descripcion, materia, fecha_entrega, usuario_asignado } = this.projectData;

    this.projectService.addProject(nombre, descripcion, materia, fecha_entrega, usuario_asignado).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closeAddPopup();
  }

  async editProject() {

    const id = this.editingElement.id;

    var { nombre, descripcion, materia, fecha_entrega, usuario_asignado } = this.projectData;

    if(!nombre){
      nombre = this.editingElement.nombre;
    }

    if(!descripcion){
      descripcion = this.editingElement.descripcion;
    }

    if (!materia){
    materia = this.editingElement.materia;
    }

    if(!fecha_entrega){
      fecha_entrega = this.editingElement.fecha_entrega;
    }

    if(!usuario_asignado){
      usuario_asignado = this.editingElement.usuario_asignado;
    }
    
    this.projectService.updateProjectInfo(id, nombre, descripcion, materia, fecha_entrega, usuario_asignado).subscribe(
      (response: any) => {
        return response;
      }
    );

    this.closeEditorPopup();
  }

  async deleteProject(id: string) {

    const projectId: string = id;

    this.projectService.deleteProject(projectId).subscribe(
      (response: any) => {
        return response;
      }
    );

  }

  openAddPopup() {
    const popup: HTMLElement | null = document.querySelector(".popupAdd");

    if (popup) {
      popup.style.display = "block";
    }

  }


  closeAddPopup() {
    const popup: HTMLElement | null = document.querySelector(".popupAdd");

    if (popup) {
      popup.style.display = "none";
    }
  }


  openEditorPopup(editingElement: any) {

    const popup: HTMLElement | null = document.querySelector(".popupEdit");

    if (popup) {
      popup.style.display = "block";
      this.editingElement = editingElement;
    }

  }

  closeEditorPopup() {
    const popup: HTMLElement | null = document.querySelector(".popupEdit");

    if (popup) {
      popup.style.display = "none";
    }
  }

}

  
  

