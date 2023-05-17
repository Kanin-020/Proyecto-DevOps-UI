import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [SessionGuard]
})
export class HistoryComponent implements OnInit {

  editingElement: any = { id: 1, fecha_cambio: 'default', detalle_cambio: 'default', responsable: 1, proyecto_asignado: 1 };
  historyData: any = {};
  historyArray: any = [];
  formItem!: FormGroup;

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.getHistoryList();
    this.formItem = new FormGroup({
      fecha_cambio: new FormControl(this.historyData.fecha_cambio),
      detalle_cambio: new FormControl(this.historyData.detalle_cambio),
      responsable: new FormControl(this.historyData.responsable),
      proyecto_asignado: new FormControl(this.historyData.proyecto_asignado),
    })
  }

  async getHistoryList() {

    this.historyService.getHistoryList().subscribe(
      (response: any) => {

        this.historyArray = response;

        return response;
      },
    );
  }

  async createHistory() {

    var { fecha_cambio, detalle_cambio, responsable, proyecto_asignado } = this.historyData;

    this.historyService.addHistory(fecha_cambio, detalle_cambio, responsable, proyecto_asignado).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closeAddPopup();
  }

  async editHistory() {

    const id = this.editingElement.id;

    var { fecha_cambio, detalle_cambio, responsable, proyecto_asignado } = this.historyData;

    if (!fecha_cambio) {
      fecha_cambio = this.editingElement.fecha_cambio;
    }

    if (!detalle_cambio) {
      detalle_cambio = this.editingElement.detalle_cambio;
    }

    if (!responsable) {
      responsable = this.editingElement.responsable;
    }

    if (!proyecto_asignado) {
      proyecto_asignado = this.editingElement.proyecto_asignado;
    }

  
   
    this.historyService.updateHistoryInfo(id, fecha_cambio, detalle_cambio, responsable, proyecto_asignado).subscribe(
      (response: any) => {
        return response;
      }
    );

    this.closeEditorPopup();
  }

  async deleteHistory(id: string) {

    const historyId: string = id;

    this.historyService.deleteHistory(historyId).subscribe(
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

