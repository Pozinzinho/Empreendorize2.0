import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { PlanosDto } from 'src/app/core/model/model-planos/planosDto';

@Component({
  selector: 'app-gerenciarplano',
  templateUrl: './gerenciarplano.component.html',
  styleUrls: ['./gerenciarplano.component.css']
})
export class GerenciarplanoComponent implements OnInit {

  planos: PlanosDto[];

  constructor(private router: Router,
              private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['loginUser']);
    }
    this.apiService.getPlanos().subscribe(planos => {
      this.planos = planos;
    }, error => {
      this.messageService.showError('Lista de planos','Falha ao carregar lista de planos!');
    });
  }
  getRole(plano: PlanosDto) {
    return this.apiService.getRole(plano.role);
  }

}
