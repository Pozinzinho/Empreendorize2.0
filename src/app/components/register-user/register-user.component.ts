import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDto } from 'src/app/core/model/model-user/userDto';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  
  public user = new UserDto;
  private unsubscribeMessage = new Subject();
  submitted = false;

  constructor( 
    private apiService: ApiService, 
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result =>{
      if(result === true){
        this.submitted = false;
      }
    });
  }

  save(): void {
    this.submitted = true;
    this.apiService.registerUser(this.user).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Por favor, verifique seu e-mail para confirmação do cadastro');
      this.goBack();
    }, error => {
      this.messageService.showError('Cadastro de usuário', 'Falha ao cadastrar usuário!');
    });
  }
  goBack() {
    this.location.back();
  }

  ngOnDestroy(){
    this.unsubscribeMessage.next();
    this.unsubscribeMessage.complete();
  }
}
