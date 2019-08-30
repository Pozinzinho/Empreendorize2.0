import { Component, OnInit } from '@angular/core';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { PlanodenegocioComponent } from 'src/app/planodenegocio/planodenegocio.component';

@Component({
  selector: 'app-estudodosconcorrentes',
  templateUrl: './estudodosconcorrentes.component.html',
  styleUrls: ['./estudodosconcorrentes.component.css']
})
export class EstudodosconcorrentesComponent implements OnInit {

  estudoProprio: EstudoProprioDto[];
  estudoDosConcorrentes: EstudoDosConcorrentesDto[];

  private idPlano : any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService) {
     }

  ngOnInit() {

    // const id: string = this.route.snapshot.params.id;
    // const url: string = this.route.snapshot.url.join('');
    // const user = this.route.snapshot.data.user;
    

    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['loginUser']);
    }

    this.apiService.getEstudoProprio(this.idPlano).subscribe(estudoProprio => {
      this.estudoProprio = estudoProprio;
    }, error => {
      this.messageService.showError('Lista de estudo proprio','Falha ao carregar estudo próprio!');
    });

    
    this.apiService.getEstudoDosConcorrentes(this.idPlano).subscribe(estudoDosConcorrentes => {
      this.estudoDosConcorrentes = estudoDosConcorrentes;
    }, error => {
      this.messageService.showError('Lista de Concorrentes','Falha ao carregar lista de concorrentes!');
    });
  }

  deleteConcorrente(estudoDosConcorrentes : EstudoDosConcorrentesDto): void{
    this.apiService.deleteConcorrentes(this.idPlano, estudoDosConcorrentes.id).subscribe(() => {
      this.estudoDosConcorrentes = this.estudoDosConcorrentes.filter(u => u.id !== estudoDosConcorrentes.id);
      this.messageService.showError('Deleção de concorrente','Concorrente deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de concorrente','Falha ao excluir concorrente!');
    });
  }

}
