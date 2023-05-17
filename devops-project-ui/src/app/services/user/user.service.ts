import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:5000';
  private readonly token = localStorage.getItem('token');
  private readonly secretKey = localStorage.getItem('secretKey');


  constructor(private readonly http: HttpClient) { }

  registerUser(username: string, email: string, password: string) {
    const body = { username, email, password };

    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(username: string, password: string) {
    const body = { username, password };

    return this.http.post(`${this.apiUrl}/login`, body);
  }

  getUserList() {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/users/getAll`, { headers, params });
  }

  getUserById(userId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.get(`${this.apiUrl}/users/getUser/${userId}`, { headers, params });
  }

  updateUserInfo(userId: string, username: string, email: string, password: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);
    const body = { username, email, password };

    return this.http.put(`${this.apiUrl}/users/update/${userId}`, body, { headers, params });
  }

  deleteUser(userId: string) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    const params = new HttpParams().set('secretKey', `${this.secretKey}`);

    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`, { headers, params });
  }

}
