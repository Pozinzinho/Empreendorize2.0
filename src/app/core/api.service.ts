import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as AppUtils from '../shared/comum/app.utils';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UserLogin } from './model/model-user/login';
import { UserDto } from './model/model-user/userDto';
import { PlanoDto } from './model/model-plano/planoDto';
import { AnaliseDoPlanoDto } from './model/models-do-plano/model-conclusao/AnaliseDoPlanoDto';
import { AnaliseDaMatrizDto } from './model/models-do-plano/model-analiseDaMatriz/analiseDaMatrizDto';
import { IntroducaoAoPlanoDto } from './model/models-do-plano/model-introducao-plano/introducaoAoPlanoDto';



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
  public baseUrlAM: string;
  public baseUrlIP: string;

  public user = new UserDto;
  public roleAtual : string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppUtils.BASE_URL}` + 'api/users';
    this.baseUrlR = `${AppUtils.BASE_URL}` + 'api/users/roles/main';

    this.baseUrlP = `${AppUtils.BASE_URL}` + 'api/planos';
    this.baseUrlEP = '/estudoProprio';
    this.baseUrlEC =  '/estudoDosConcorrentes';

    this.baseUrlIP = '/missaoDaEmpresa';
    this.baseUrlAM = '/analiseDaMatriz';
    this.baseUrlAP = '/analiseDoPlano';

    
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

   //Método para verificação do nível de acesso.
   isAuthenticatedADM(): Observable<boolean> {
    return new Observable<boolean> (observer => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user.roles[0].name === "ROLE_ADMIN") {
        observer.next(true);
        observer.complete();
        }
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

  getEstudoProprio(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoDosConcorrentes(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEC}`, AppUtils.OPTIONS_OBJECTO);
  }

 // ---------------- SERVIÇOS REFERENTES A Introdução do Plano ---------------------------------------------------------------
  getIntroducaoPlano(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getIntroducaoPlanoById(idPlano: string, idIntroducao: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIP}/${idIntroducao}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateIntroducaoPlano(introducao: IntroducaoAoPlanoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}/${introducao.id}`,
      introducao, AppUtils.OPTIONS_OBJECTO);
  }

  registerIntroducaoPlano(introducao: IntroducaoAoPlanoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}`, introducao, AppUtils.OPTIONS_OBJECTO);
  }
//---------------------------------------------------------------------------------------------------------------------------

    // ---------------- SERVIÇOS REFERENTES A Matriz F.O.F.A --------------------------------------------
    getAnaliseDaMatriz(id: string): Observable<any> {
      return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}`, AppUtils.OPTIONS_OBJECTO);
    }

    getAnaliseDaMatrizById(idPlano: string, idAnalise: string): Observable<any>{
      return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlAM}/${idAnalise}`, AppUtils.OPTIONS_OBJECTO);
    }

    updateAnaliseDaMatriz(analise: AnaliseDaMatrizDto, id: string): Observable<any> {
      return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}/${analise.id}`,
      analise, AppUtils.OPTIONS_OBJECTO);
    }

    registerAnaliseDaMatriz(analise: AnaliseDaMatrizDto, id: string): Observable<any>{
      return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}`, analise,  AppUtils.OPTIONS_OBJECTO);
    }
    //--------------------------------------------------------------------------------------------------------
  

  // ---------------- SERVIÇOS REFERENTES A ANÁLISE DO PLANO --------------------------------------------
  getAnaliseDoPlano(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getAnaliseDoPlanoById(idPlano: string, idAnalise: string): Observable<any>{
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlAP}/${idAnalise}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateAnaliseDoPlano(analise: AnaliseDoPlanoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}/${analise.id}`,
    analise, AppUtils.OPTIONS_OBJECTO);
  }

  registerAnaliseDoPlano(analise: AnaliseDoPlanoDto, id: string): Observable<any>{
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}`, analise,  AppUtils.OPTIONS_OBJECTO);
  }
  //--------------------------------------------------------------------------------------------------------

  
  getRoleUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlR}`, AppUtils.OPTIONS_OBJECTO);
  }

  getPlanos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlP}`, AppUtils.OPTIONS_OBJECTO);
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
