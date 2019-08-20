import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as AppUtils from '../shared/comum/app.utils';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UserLogin } from './model/model-user/login';
import { UserDto } from './model/model-user/userDto';
import { PlanoDto } from './model/model-plano/planoDto';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string;
  public baseUrlP: string;
  public baseUrlAP: string;
  public baseUrlR: string;
  public baseUrlEP: string;
  public baseUrlEC: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppUtils.BASE_URL}` + 'api/users';
    this.baseUrlR = `${AppUtils.BASE_URL}` + 'api/users/roles/main';

    this.baseUrlP = `${AppUtils.BASE_URL}` + 'api/planos';
    this.baseUrlEP = `${AppUtils.BASE_URL}` + 'api/estudoProprio';
    this.baseUrlEC = `${AppUtils.BASE_URL}` + 'api/estudoDosConcorrentes';
    this.baseUrlAP = `${AppUtils.BASE_URL}` + 'api/analiseDoPlano';
  }

  login(user: UserLogin): Observable <any> {

    const params = new HttpParams()
      .set('username', user.email)
      .set('password', user.password)
      .set('grant_type', 'password');

    const options = {
        headers: AppUtils.HEADERS_COMMUN,
        params
      };
    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  }

  getMainUser(token: any): Observable <any> {
    return this.httpClient.get<any>(`${this.baseUrl}` + '/main', AppUtils.OPTIONS_OBJECTO);
  }

  getAccessToken(refreshToken): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const options = {
        headers: AppUtils.HEADERS_COMMUN,
        params
      };
    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  } 

  
  //Método para verificação do usuário logado.
  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean> (observer => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
      }
    });
  }

  registerUser(user: UserDto): Observable<any> {
    return this.httpClient.post<any>(AppUtils.REGISTER_URL, user, {headers: AppUtils.HEADERS_COMMUN});
  }

  registerPlano(plano: PlanoDto): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlP}`, plano,  AppUtils.OPTIONS_OBJECTO);
  }

  confirmationRegisterToken(token: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token);
    const options = {
        headers: AppUtils.HEADERS_COMMUN,
        params
      };
    return this.httpClient.get<any>(AppUtils.CONFIRM_REGISTER_URL, options);
  }

  resendRegisterToken(user: UserDto): Observable<any> {
    const params = new HttpParams()
      .set('email', user.email);
    const options = {
        headers: AppUtils.HEADERS_COMMUN,
        params
      };
    return this.httpClient.get<any>(AppUtils.RESEND_REGISTER_TOKEN_URL, options);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoProprio(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlEP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoDosConcorrentes(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlEC}`, AppUtils.OPTIONS_OBJECTO);
  }

  getRoleUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlR}`, AppUtils.OPTIONS_OBJECTO);
  }

  getPlanos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlP}`, AppUtils.OPTIONS_OBJECTO);
  }
  
  getAnaliseDoPlano(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlAP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getRole(roles: Array<any>) {
    let role: any;
    if (this.isAuthenticated() && roles) {
      if (roles.length > 0) {
        roles.forEach(r => {
          role = r.name;
        });
      }
      return role;
    }
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  deletePlano(id: string): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrlP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  getPlanosById(id: string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  getAnaliseDoPlanoById(id: string): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateUser(user: UserDto): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${user.id}`, user, AppUtils.OPTIONS_OBJECTO);
    }

  updatePlano(plano: PlanoDto): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrlP}/${plano.id}`, plano, AppUtils.OPTIONS_OBJECTO);
  }

    logout(): Observable<any> {
      return this.httpClient.get<any>(`${AppUtils.BASE_URL}` + 'api/logout', AppUtils.OPTIONS_OBJECTO);
    }
}
