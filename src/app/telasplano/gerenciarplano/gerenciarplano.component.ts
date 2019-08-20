import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';

@Component({
  selector: 'app-gerenciarplano',
  templateUrl: './gerenciarplano.component.html',
  styleUrls: ['./gerenciarplano.component.css']
})
export class GerenciarplanoComponent implements OnInit {

  planos: PlanoDto[];

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

  deletePlano(plano: PlanoDto): void {
    this.apiService.deletePlano(plano.id).subscribe(() => {
      this.planos = this.planos.filter(u => u.id !== plano.id);
      this.messageService.showError('Deleção de plano','Plano deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de plano','Falha ao excluir plano!');
    });
  }
}
