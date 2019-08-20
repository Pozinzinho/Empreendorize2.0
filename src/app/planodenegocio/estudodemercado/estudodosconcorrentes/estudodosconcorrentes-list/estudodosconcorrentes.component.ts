import { Component, OnInit } from '@angular/core';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estudodosconcorrentes',
  templateUrl: './estudodosconcorrentes.component.html',
  styleUrls: ['./estudodosconcorrentes.component.css']
})
export class EstudodosconcorrentesComponent implements OnInit {

  estudoProprio: EstudoProprioDto[];
  estudoDosConcorrentes: EstudoDosConcorrentesDto[];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService) { }

  ngOnInit() {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['loginUser']);
    }

    this.apiService.getEstudoProprio().subscribe(estudoProprio => {
      this.estudoProprio = estudoProprio;
    }, error => {
      this.messageService.showError('Lista de estudo proprio','Falha ao carregar estudo próprio!');
    });

    this.apiService.getEstudoDosConcorrentes().subscribe(estudoDosConcorrentes => {
      this.estudoDosConcorrentes = estudoDosConcorrentes;
    }, error => {
      this.messageService.showError('Lista de Concorrentes','Falha ao carregar lista de concorrentes!');
    });
  }

}
