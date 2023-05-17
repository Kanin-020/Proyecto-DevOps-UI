import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl = 'http://localhost:5000';
  private readonly token = localStorage.getItem('token');
  private readonly secretKey = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  getProjectList() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/projects/getAll`, { headers, params });
  }

  getProjectById(projectId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/projects/getProject/${projectId}`, { headers, params });
  }

  addProject(nombre: string, descripcion: string, materia: string, fecha_entrega: string, usuario_asignado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { nombre, descripcion, materia, fecha_entrega, usuario_asignado };
    
    return this.http.post(`${this.apiUrl}/projects/addProject`, body, { headers, params });
  }

  updateProjectInfo(ProjectId: string, nombre: string, descripcion: string, materia: string, fecha_entrega: string, usuario_asignado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { nombre, descripcion, materia, fecha_entrega, usuario_asignado };

    return this.http.put(`${this.apiUrl}/projects/update/${ProjectId}`, body, { headers, params });
  }

  deleteProject(ProjectId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.delete(`${this.apiUrl}/projects/delete/${ProjectId}`, { headers, params });
  }

}


