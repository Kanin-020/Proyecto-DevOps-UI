import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = 'http://localhost:5000';
  private readonly token = localStorage.getItem('token');
  private readonly secretKey = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  getCommentList() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/comments/getAll`, { headers, params });
  }

  getCommentById(CommentId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/comments/getComment/${CommentId}`, { headers, params });
  }

  addComment(autor: string, contenido: string, fecha: string, estado: string, tarea_asociada: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { autor, contenido, fecha, estado, tarea_asociada };

    return this.http.post(`${this.apiUrl}/comments/addComment`, body, { headers, params });
  }

  updateCommentInfo(CommentId: string, autor: string, contenido: string, fecha: string, estado: string, tarea_asociada: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { autor, contenido, estado, fecha, tarea_asociada };

    return this.http.put(`${this.apiUrl}/comments/update/${CommentId}`, body, { headers, params });
  }

  deleteComment(CommentId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.delete(`${this.apiUrl}/comments/delete/${CommentId}`, { headers, params });
  }

}
