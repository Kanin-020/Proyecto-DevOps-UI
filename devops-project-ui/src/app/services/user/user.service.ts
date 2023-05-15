import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:5000';

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
    return this.http.get(`${this.apiUrl}/users/getAll`);
  }

  getUserById(userId: string) {
    return this.http.get(`${this.apiUrl}/users/getUser/${userId}`);
  }

  updateUserInfo(userId: string, username: string, email: string, password: string) {
    const body = { username, email, password };

    return this.http.put(`${this.apiUrl}/users/update/${userId}`, body);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
  }

}
