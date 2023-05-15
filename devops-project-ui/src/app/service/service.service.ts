import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly apiUrl = 'http://localhost:5000/';

  constructor(private readonly http: HttpClient) { }

  getHello() {
    return this.http.get(this.apiUrl);
  }

}
