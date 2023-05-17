import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionGuard } from 'src/app/guards/session.guard';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [SessionGuard]
})
export class CommentComponent implements OnInit {

  editingElement: any = { id: 1, autor: 'default', contenido: 'default', fecha: 'default', estado: 'default', tarea_asociada: 1 };
  commentData: any = {};
  commentArray: any = [];
  formItem!: FormGroup;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.getCommentList();
    this.formItem = new FormGroup({
      autor: new FormControl(this.commentData.autor),
      contenido: new FormControl(this.commentData.contenido),
      fecha: new FormControl(this.commentData.fecha),
      estado: new FormControl(this.commentData.estado),
      tarea_asociada: new FormControl(this.commentData.tarea_asociada),
    });
  }

  async getCommentList() {

    this.commentService.getCommentList().subscribe(
      (response: any) => {

        this.commentArray = response;

        return response;
      },
    );
  }

  async createComment() {

    var { autor, contenido, fecha, estado, tarea_asociada } = this.commentData;

    this.commentService.addComment(autor, contenido, fecha, estado, tarea_asociada).subscribe(
      (response: any) => {
        console.log(response);
        return response;
      }
    );

    this.closeAddPopup();
  }

  async editComment() {

    const id = this.editingElement.id;

    var { autor, contenido, fecha, estado, tarea_asociada } = this.commentData;

    if(!autor){
      autor = this.editingElement.autor;
    }
    if(!contenido){
      contenido = this.editingElement.contenido;
    }
    if(!fecha){
      fecha = this.editingElement.fecha;
    }
    if(!estado){
      estado = this.editingElement.estado;
    }
    if(!tarea_asociada){
      tarea_asociada = this.editingElement.tarea_asociada;
    }

    this.commentService.updateCommentInfo(id, autor, contenido, fecha, estado, tarea_asociada).subscribe(
      (response: any) => {
        return response;
      }
    );

    this.closeEditorPopup();
  }

  async deleteComment(id: string) {

    const commentId: string = id;

    this.commentService.deleteComment(commentId).subscribe(
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

      console.log(editingElement);

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
