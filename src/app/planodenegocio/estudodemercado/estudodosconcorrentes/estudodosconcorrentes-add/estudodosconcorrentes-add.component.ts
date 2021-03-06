import { Component, OnInit } from '@angular/core';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-estudodosconcorrentes-add',
  templateUrl: './estudodosconcorrentes-add.component.html',
  styleUrls: ['./estudodosconcorrentes-add.component.css']
})
export class EstudodosconcorrentesAddComponent implements OnInit {

  estudoDosConcorrentes :  EstudoDosConcorrentesDto[];
  private idPlano : any;
  idConcorrente: string;


  public concorrente = new  EstudoDosConcorrentesDto();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

  }

  save(): void {
    this.apiService.registerEstudoDosConcorrentes(this.concorrente, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Concorrente cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar concorrente!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }

}
