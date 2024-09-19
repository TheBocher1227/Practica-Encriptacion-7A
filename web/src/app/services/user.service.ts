import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../Interfaces/enviroment';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private dataURL = `${api}/api/user/me`
  private registroURL = `${api}/api/user/registrobatalla/`

  getData(): Observable<User> {
    
    return this.http.get<User>(this.dataURL)
  }

  // getBatallas(): Observable<>

}
