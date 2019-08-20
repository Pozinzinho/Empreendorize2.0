import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { UserLogin } from 'src/app/core/model/model-user/login';
import  {NgxSpinnerService}  from 'ngx-spinner';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  user = new UserLogin();

  constructor(private apiService: ApiService, 
    private spinner: NgxSpinnerService,
    private router:Router, 
    private messageService: MessageService) { }

  

  ngOnInit() {

    
    this.spinner.hide();
    

    if(!(localStorage.getItem('accessToken') === "")){
      this.router.navigate(['home']);
    }
  }

  public login() {

    this.spinner.show();

    this.apiService.login(this.user).subscribe(data => {
      this.loginSuccess(data);
    }, error => {
      this.spinner.hide();
      this.messageService.showError('Login', 'Falha de autenticação');
    });
  }

  public loginSuccess(data: any) {
    localStorage.clear();
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    this.apiService.getMainUser(localStorage.getItem('accessToken')).subscribe(user => {
      this.redirectPage(user);
      this.messageService.showSuccess('Bem-vindo ao empreendedorize', 'Vamos começar já o seu plano de negócios');
    }, error => {
      this.messageService.showError('Usuário principal', error);
    });
  }

  public  redirectPage(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['home']);
  }

  
}
