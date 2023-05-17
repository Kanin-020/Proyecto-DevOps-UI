import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [SessionGuard]
})
export class TaskComponent implements OnInit {

  editingElement: any = { id: 1, nombre: 'default', descripcion: 'default', estado: 'default', fecha_entrega: 'default', proyecto_asociado: 1 };
  taskData: any = {};
  taskArray: any = [];
  formItem!: FormGroup;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTaskList();
    this.formItem = new FormGroup({
      nombre: new FormControl(this.taskData.nombre),
      descripcion: new FormControl(this.taskData.descripcion),
      estado: new FormControl(this.taskData.estado),
      fecha_entrega: new FormControl(this.taskData.fecha_entrega),
      proyecto_asociado: new FormControl(this.taskData.proyecto_asociado),
    });
  }

  async getTaskList() {

    this.taskService.getTaskList().subscribe(
      (response: any) => {

        this.taskArray = response;

        return response;
      },
    );
  }

  async createTask() {

    var { nombre, descripcion, estado, fecha_entrega, proyecto_asociado } = this.taskData;

    this.taskService.addTask(nombre, descripcion, estado, fecha_entrega, proyecto_asociado).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closeAddPopup();
  }

  async editTask() {

    const id = this.editingElement.id;

    var { nombre, descripcion, estado, fecha_entrega, proyecto_asociado } = this.taskData;

    if (!nombre || !descripcion || !estado || !fecha_entrega || !proyecto_asociado) {
      nombre = this.editingElement.nombre;
      descripcion = this.editingElement.descripcion;
      estado = this.editingElement.estado;
      fecha_entrega = this.editingElement.fecha_entrega;
      proyecto_asociado = this.editingElement.proyecto_asociado;
    }

    this.taskService.updateTaskInfo(id, nombre, descripcion, estado, fecha_entrega, proyecto_asociado).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closeEditorPopup();
  }

  async deleteTask(id: string) {

    const taskId: string = id;

    this.taskService.deleteTask(taskId).subscribe(
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
