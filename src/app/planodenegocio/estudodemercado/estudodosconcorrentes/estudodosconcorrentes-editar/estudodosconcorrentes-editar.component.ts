import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estudodosconcorrentes-editar',
  templateUrl: './estudodosconcorrentes-editar.component.html',
  styleUrls: ['./estudodosconcorrentes-editar.component.css']
})
export class EstudodosconcorrentesEditarComponent implements OnInit {

  concorrentes = new  EstudoDosConcorrentesDto();
  idConcorrentes: string;

  private idPlano : any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
  ) { }

  ngOnInit() {

    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.idConcorrentes = this.route.snapshot.paramMap.get('id');
    this.apiService.getEstudoDosConcorrentesById(this.idPlano, this.idConcorrentes).subscribe(concorrentes => {
      this.concorrentes = concorrentes;
      console.log('Retornou concorrentes com sucesso!', this.concorrentes);
    }, error => {
      console.log('Error ao pegar concorrentes por ID! ', error);
    });
  }

  update(): void {
    this.concorrentes.id = this.idConcorrentes;
    this.apiService.updateEstudoDosConcorrentes(this.concorrentes, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Concorrente atualizado com sucesso!');
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o concorrente!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
