import { Injectable } from '@angular/core';
import { api } from '../Interfaces/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private Url = `${api}/api/chat`;
  constructor(private http: HttpClient) { }

  guardarmensaje(user_id: string, mensaje:string): Observable<any> {
    const headers = new HttpHeaders({
    });
    return this.http.post(`${this.Url}`, { user_id: user_id , mensaje:mensaje }, { headers });
  }
}
