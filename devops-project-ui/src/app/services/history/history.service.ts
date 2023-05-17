import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private readonly apiUrl = 'http://localhost:5000';
  private readonly token = localStorage.getItem('token');
  private readonly secretKey = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  getHistoryList() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/history/getAll`, { headers, params });
  }

  getHistoryById(HistoryId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/history/getHistory/${HistoryId}`, { headers, params });
  }

  addHistory(fecha_cambio: string, detalle_cambio: string, responsable: number, proyecto_asignado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { fecha_cambio, detalle_cambio, responsable, proyecto_asignado};
    
    return this.http.post(`${this.apiUrl}/history/addHistory`, body, { headers, params });
  }

  
  updateHistoryInfo(HistoryId: string, fecha_cambio: string, detalle_cambio: string, responsable: number, proyecto_asignado: number) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { fecha_cambio, detalle_cambio, responsable, proyecto_asignado};

    return this.http.put(`${this.apiUrl}/history/update/${HistoryId}`, body, { headers, params });
  }

  deleteHistory(HistoryId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.delete(`${this.apiUrl}/history/delete/${HistoryId}`, { headers, params });
  }

}
