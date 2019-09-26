import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';

@Component({
  selector: 'app-estoque-inicial-save',
  templateUrl: './estoque-inicial-save.component.html',
  styleUrls: ['./estoque-inicial-save.component.css']
})
export class EstoqueInicialSaveComponent implements OnInit {

  private idPlano : any;


  public estoqueIncial = new  EstoqueInicialDto();

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
    this.apiService.registerEstoqueInicial(this.estoqueIncial, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Material cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar material do estoque inicial!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }

}
