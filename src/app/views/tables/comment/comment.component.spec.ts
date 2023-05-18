import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentComponent } from './comment.component';
import { SessionGuard } from 'src/app/guards/session.guard';
import { CommentService } from 'src/app/services/comment/comment.service';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentService: CommentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SessionGuard, CommentService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
    fixture.detectChanges();
  });

  it('Debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debería realizar la llamada para obtener el Array de comentarios', () => {
    const commentList = [
      { id: "1", autor: 'John Doe', contenido: 'Comment 1', fecha: '2023-05-17', estado: 'Pending', tarea_asociada: 1 },
      { id: "2", autor: 'Jane Smith', contenido: 'Comment 2', fecha: '2023-05-17', estado: 'Approved', tarea_asociada: 2 }
    ];

    spyOn(commentService, 'getCommentList').and.returnValue(of(commentList));

    component.getCommentList();

    expect(commentService.getCommentList).toHaveBeenCalled();
    expect(component.commentArray).toEqual(commentList);
  });

  it('Debería realizar la llamada para crear un comentario y cerrar el popup', () => {
    const commentData = {
      autor: 'John Doe',
      contenido: 'This is a comment',
      fecha: '2023-05-17',
      estado: 'Pending',
      tarea_asociada: 1
    };
    const formItem = new FormGroup({
      autor: new FormControl(commentData.autor),
      contenido: new FormControl(commentData.contenido),
      fecha: new FormControl(commentData.fecha),
      estado: new FormControl(commentData.estado),
      tarea_asociada: new FormControl(commentData.tarea_asociada)
    });

    spyOn(commentService, 'addComment').and.returnValue(of({}));
    spyOn(component, 'closeAddPopup');

    component.commentData = commentData;
    component.formItem = formItem;
    component.createComment();

    expect(commentService.addComment).toHaveBeenCalledWith(
      commentData.autor,
      commentData.contenido,
      commentData.fecha,
      commentData.estado,
      commentData.tarea_asociada
    );
    expect(component.closeAddPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada para editar comentario y cerrar el popup', () => {
    const editingElement = { id: "1", autor: 'John Doe', contenido: 'This is a comment', fecha: '2023-05-17', estado: 'Pending', tarea_asociada: 1 };
    const commentData = {
      autor: 'Jane Smith',
      contenido: 'Updated comment',
      fecha: '2023-05-18',
      estado: 'Approved',
      tarea_asociada: 2
    };

    spyOn(commentService, 'updateCommentInfo').and.returnValue(of({}));
    spyOn(component, 'closeEditorPopup');

    component.editingElement = editingElement;
    component.commentData = commentData;
    component.editComment();

    expect(commentService.updateCommentInfo).toHaveBeenCalledWith(
      editingElement.id,
      commentData.autor,
      commentData.contenido,
      commentData.fecha,
      commentData.estado,
      commentData.tarea_asociada
    );
    expect(component.closeEditorPopup).toHaveBeenCalled();
  });

  it('Debería realizar la llamada a eliminar un comentario', () => {
    const commentId = '1';

    spyOn(commentService, 'deleteComment').and.returnValue(of({}));

    component.deleteComment(commentId);

    expect(commentService.deleteComment).toHaveBeenCalledWith(commentId);
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
    const popup: HTMLElement = document.createElement('div');
    popup.className = 'popupEdit';
    document.body.appendChild(popup);

    const editingElement = { id: "1", autor: 'John Doe', contenido: 'This is a comment', fecha: '2023-05-17', estado: 'Pending', tarea_asociada: 1 };

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
