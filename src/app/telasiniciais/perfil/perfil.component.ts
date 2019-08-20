import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/model/model-user/userDto';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { Location } from '@angular/common';;
import  {NgxSpinnerService}  from 'ngx-spinner';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  users: UserDto[];
  public user = new UserDto;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  update(): void {
    this.spinner.show();
    this.user.id = this.user.id;
    this.apiService.updateUser(this.user).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Usuário atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.spinner.hide();
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o usuário!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }
}
