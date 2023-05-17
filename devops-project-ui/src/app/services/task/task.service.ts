import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'http://localhost:5000';
  private readonly token = localStorage.getItem('token');
  private readonly secretKey = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  getTaskList() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/tasks/getAll`, { headers, params });
  }

  getTaskById(taskId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/tasks/getTask/${taskId}`, { headers, params });
  }

  addTask(nombre: string, descripcion: string, estado: string, fecha_entrega: string, proyecto_asociado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { nombre, descripcion, estado, fecha_entrega, proyecto_asociado };

    return this.http.post(`${this.apiUrl}/tasks/addTask`, body, { headers, params });
  }

  updateTaskInfo(taskId: string, nombre: string, descripcion: string, estado: string, fecha_entrega: string, proyecto_asociado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { nombre, descripcion, estado, fecha_entrega, proyecto_asociado };

    return this.http.put(`${this.apiUrl}/tasks/update/${taskId}`, body, { headers, params });
  }

  deleteTask(taskId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.delete(`${this.apiUrl}/tasks/delete/${taskId}`, { headers, params });
  }

}
