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
  public user = new UserDto();

  idUser: string;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.idUser = this.user.id;

    this.apiService.getUserById(this.idUser).subscribe(user =>{
      this.user = user;
      console.log('Retornou usuário com sucesso! ');
    }, error => {
      console.log('Error ao pegar usuário por ID! ', error);
    });
  }

  update(): void {
    this.spinner.show();
    this.user.id = this.idUser;
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

  somenteLetras(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || 
    (charCode > 96 && charCode < 123) ||
    (charCode > 191 && charCode <= 255) ||
    (charCode == 32) ) {
      return true;
    }
    return false;
  }
}
