import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {MatIconModule} from '@angular/material'
import {MatSlideToggleChange} from '@angular/material';



import { Login } from '../../models';
import { LoginService } from '../../services';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-pf',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  password: string;
  showDetails: boolean;
  showDetails2: boolean;

  vs: String="Visualizar senha";

  viewSource: boolean;
  viewSource2: boolean;
  color = '';

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title,
    private loginService: LoginService) { }

  ngOnInit() {
    this.gerarForm();
    this.titleService.setTitle('Login | @angular-material-extensions/password-strength');
  }

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  visualizarsenha(){
    if(this.vs == "Visualizar senha"){
          this.vs = "Ocultar senha";
    }else{
          this.vs = "Visualizar senha";
    }
  }

  logar() {
    if (this.form.invalid) {
      return;
    }

    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe(
        data => {
          localStorage['token'] = data['data']['token'];
          const usuarioData = JSON.parse(
            atob(data['data']['token'].split('.')[1]));
          if (usuarioData['role'] == 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/funcionario']);
          }
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err['status'] == 401) {
            msg = "Email/senha inválido(s)."
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }
}






