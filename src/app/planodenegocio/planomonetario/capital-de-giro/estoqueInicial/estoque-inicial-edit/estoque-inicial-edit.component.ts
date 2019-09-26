import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estoque-inicial-edit',
  templateUrl: './estoque-inicial-edit.component.html',
  styleUrls: ['./estoque-inicial-edit.component.css']
})
export class EstoqueInicialEditComponent implements OnInit {
  estoqueInicial = new  EstoqueInicialDto();
  idEstoque: string;

  private idPlano : any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit() {

    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.idEstoque = this.route.snapshot.paramMap.get('id');
    this.apiService.getEstoqueInicialById(this.idPlano, this.idEstoque).subscribe(estoqueInicial => {
      this.estoqueInicial = estoqueInicial;
      console.log('Retornou estoque inicial com sucesso!', this.estoqueInicial);
    }, error => {
      console.log('Error ao pegar estoque inicial por ID! ', error);
    });
  }

  update(): void {
    this.estoqueInicial.id = this.idEstoque;
    this.apiService.updateEstoqueInicial(this.estoqueInicial, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estoque inicial atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estoque inicial!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
