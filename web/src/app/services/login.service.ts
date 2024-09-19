import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../Interfaces/enviroment';
import { Message } from '../Interfaces/message';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private loginURL = `${api}/api/auth/login`;
  private codigoURL = `${api}/api/auth/verificar`
  private token: string|null = null;
  private static instance: LoginService

  constructor(private http: HttpClient) {
    LoginService.instance = this;
  }

  public static getInstance(): LoginService{
    return LoginService.instance
  }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginURL, { email, password });
  }

  verificarCodigo(codigo: string): Observable<Message> {
    return this.http.post<Message>(this.codigoURL, { verificacion: codigo});
  }

  setToken(token: string|null){
    this.token = token
  }
  getToken(): string|null{
    return this.token
  }

  
  LogIn(email: string, password: string): Observable<Message> {
    return this.http.post<Message>(this.loginURL, { email: email, password: password })
  }

  verificarAutenticacion(): Observable<any> {
    let url = `${api}/api/user/me`
    return this.http.get<any>(url)
  }
  
  verificarLogin(): Observable<any> {
    let url = `${api}/api/auth/verificarlogin`
    return this.http.post<any>(url, {})
  }
  

}
