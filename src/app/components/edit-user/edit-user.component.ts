import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/model/userDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user = new  UserDto();
  idUser: string;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.apiService.getUserById(this.idUser).subscribe(user => {
      this.user = user;
      console.log('Retornou usuário com sucesso! ');
    }, error => {
      console.log('Error ao pegar usuário por ID! ', error);
    });
  }
  update(): void {
    this.user.id = this.idUser;
    this.apiService.updateUser(this.user).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Usuário atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o usuário!');
    });
  }
  goBack() {
    this.location.back();
  }
}
