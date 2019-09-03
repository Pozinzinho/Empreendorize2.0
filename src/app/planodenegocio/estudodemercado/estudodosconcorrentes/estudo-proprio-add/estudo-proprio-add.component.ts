import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudo-proprio-add',
  templateUrl: './estudo-proprio-add.component.html',
  styleUrls: ['./estudo-proprio-add.component.css']
})
export class EstudoProprioAddComponent implements OnInit {

  private idPlano : any;


  public proprio = new  EstudoProprioDto();

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
    this.apiService.registerEstudoProprio(this.proprio, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Estudo próprio cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar estudo próprio!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }

}
