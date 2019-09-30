import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { FaturamentoMensalDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';

@Component({
  selector: 'app-faturamento-mensal-edit',
  templateUrl: './faturamento-mensal-edit.component.html',
  styleUrls: ['./faturamento-mensal-edit.component.css']
})
export class FaturamentoMensalEditComponent implements OnInit {
  faturamentoMensal = new  FaturamentoMensalDto();
  idFaturamento: string;

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

    this.idFaturamento = this.route.snapshot.paramMap.get('id');
    this.apiService.getFaturamentoMensalById(this.idPlano, this.idFaturamento).subscribe(faturamentoMensal => {
      this.faturamentoMensal = faturamentoMensal;
      console.log('Retornou faturamento mensal com sucesso!', this.faturamentoMensal);
    }, error => {
      console.log('Error ao pegar faturamento mensal por ID! ', error);
    });
  }

  update(): void {
    this.faturamentoMensal.id = this.idFaturamento;
    this.apiService.updateFaturamentoMensal(this.faturamentoMensal, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Faturamento mensal atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar faturamento mensal!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
