import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/model/userDto';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: UserDto[];

  constructor(private router: Router,
              private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['loginUser']);
    }
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
    }, error => {
      this.messageService.showError('Lista de usuários','Falha ao carregar lista de usuários!');
    });
  }
  getRole(user: UserDto) {
    return this.apiService.getRole(user.roles);
  }

  deleteUser(user: UserDto): void {
    this.apiService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.messageService.showError('Deleção de usuário','Usuário deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de usuário','Falha ao excluir usuário!');
    });
  }
}
