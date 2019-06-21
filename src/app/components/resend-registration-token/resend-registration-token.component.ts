import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/model/userDto';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-resend-registration-token',
  templateUrl: './resend-registration-token.component.html',
  styleUrls: ['./resend-registration-token.component.css']
})
export class ResendRegistrationTokenComponent implements OnInit {
  user = new UserDto();

  constructor(private apiService: ApiService, 
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
  }
  
  resendToken() {
    this.apiService.resendRegisterToken(this.user).subscribe(data => {
      this.messageService.showSuccess('Token de verificação', 'Novo token enviado com sucesso!');
      this.router.navigate(['loginUser']);
    }, error => {
      this.messageService.showError('Falha de solicitação do token', 'Falha ao enviar novo token');
    });
  }

}
