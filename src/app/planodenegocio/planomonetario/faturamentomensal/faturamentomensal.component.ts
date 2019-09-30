import { Component, OnInit } from '@angular/core';
import { FaturamentoMensalDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-faturamentomensal',
  templateUrl: './faturamentomensal.component.html',
  styleUrls: ['./faturamentomensal.component.css']
})
export class FaturamentomensalComponent implements OnInit {
  private faturamentoTotal: number = 0;
  faturamentoMensal :  FaturamentoMensalDto[];
  private idPlano : any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.pegarFaturamentoMensal();
    
  }

  //----------- Setar id da análise -----------------------------------------------
  pegarFaturamentoMensal() {
    this.apiService.getFaturamentoMensal(this.idPlano).subscribe(faturamentoMensal => {
      this.faturamentoMensal = faturamentoMensal;

      for(var i=0;i < faturamentoMensal.length;i++) {
        this.faturamentoTotal += parseFloat(faturamentoMensal[i].faturamentoTotal);
      }
    }, error => {
    });
  }
  //---------------------------------------------------------------------------------------

  deletarFaturamentoMensal(faturamentoMensal  : FaturamentoMensalDto): void{
    this.apiService.deleteFaturamentoMensal(this.idPlano, faturamentoMensal.id).subscribe(() => {
      this.faturamentoMensal = this.faturamentoMensal.filter(u => u.id !== faturamentoMensal.id);
      this.messageService.showError('Deleção do faturamento mensal','Deletado com sucesso!');
      this.faturamentoTotal = this.faturamentoTotal - faturamentoMensal.faturamentoTotal;
    }, error => {
      this.messageService.showError('Deleção de faturamento mensal','Falha ao faturamento mensal!');
    });
  }
  

}
