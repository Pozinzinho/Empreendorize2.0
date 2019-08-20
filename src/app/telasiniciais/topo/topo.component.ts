import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { Role } from 'src/app/core/model/model-user/role';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  verificaRole : boolean = false;
  roles: Role[];

  public nomeDoRole : string;

  constructor(private apiService: ApiService, 
    private router: Router,
    private messageService: MessageService,
    private role: Role) { }

  ngOnInit() {
    //  this.apiService.getRoleUser().subscribe(roles => {
    //    this.roles = roles;
    // });
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

  isAdmin(): Observable<boolean>{
    return new Observable<boolean> (observer => {
  

      this.nomeDoRole = "ROLE_USER";
      if(this.nomeDoRole == "ROLE_ADMIN"){
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
      }
    });
  }
}
