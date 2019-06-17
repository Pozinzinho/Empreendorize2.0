import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { UserLogin } from './core/model/login';
import { ApiService } from './core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  public login() {
    this.apiService.login(this.user).subscribe(data =>{
      this.loginSuccess(data);
    }, error => {
      console.log("Erro ao realizar login!");
    });
  }
  
  public loginSuccess(data: any) {
    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    this.apiService.getMainUser(localStorage.getItem('accessToken')).subscribe(user =>{
      this.redirectPage(user);
    }, error =>{
      console.log('Erro ao pegar usuário logado');
    });
  }

  redirectPage(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['home']);
  }
}
