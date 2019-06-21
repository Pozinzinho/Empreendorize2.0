import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor(private apiService: ApiService, 
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  logou() {
    this.apiService.logout().subscribe(() => {
      this.clearLocalStore();
      this.messageService.showSuccess('Logout', 'Logout realizado com sucesso');
      this.router.navigate(['loginUser']);
    }, error => {
      this.messageService.showError('Logout', 'Erro na realização de logout');
    });
  }

  clearLocalStore() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }

  isAutenticated(): Observable<boolean> {
    return this.apiService.isAuthenticated();
  }
}
