import { Component, OnInit } from '@angular/core';
import { FaturamentoMensalDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { EstimativaDosCustosFixosMensaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstimativaDosCustosFixosMensaisDto';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-faturamentomensal',
  templateUrl: './faturamentomensal.component.html',
  styleUrls: ['./faturamentomensal.component.css']
})
export class FaturamentomensalComponent implements OnInit {
  private faturamentoTotal: number = 0;
  faturamentoMensal :  FaturamentoMensalDto[];

  estimativaCustosFixosOM: EstimativaDosCustosFixosMensaisDto[];
  estoqueInicial: EstoqueInicialDto[];
  totalECFOM: number = 0;
  totalEstoque: number = 0;
  lucro: number = 0;

  texto: String = "";

  private idPlano : any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  async ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.pegarFaturamentoMensal();
    await this.minhaChamadaApiEstoqueInicial();
    await this.minhaChamadaApiECFM();
    
    this.lucro = this.faturamentoTotal - (this.totalEstoque + this.totalECFOM);

    

    if(this.faturamentoTotal == this.totalEstoque + this.totalECFOM){
      this.texto = "Você alcaçou o ponto de equilíbrio";
    }
    else if(this.faturamentoTotal < this.totalEstoque + this.totalECFOM){
      this.texto = "Sua empresa está sem rentabilidade";
    }
    else if(this.faturamentoTotal > this.totalEstoque + this.totalECFOM){
      this.texto = "Sua empresa tem o lucro de: R$ "+ this.lucro.toLocaleString('pt-BR') + " por mês!";
    }
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
      this.faturamentoTotal.toLocaleString('pt-BR');
      this.atualizaSituacao();
    }, error => {
      this.messageService.showError('Deleção de faturamento mensal','Falha ao faturamento mensal!');
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DicasFaturamentoMensal);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  atualizaSituacao(){
    this.lucro = this.faturamentoTotal - (this.totalEstoque + this.totalECFOM);

    if(this.faturamentoTotal == this.totalEstoque + this.totalECFOM){
      this.texto = "Você alcaçou o ponto de equilíbrio";
    }
    else if(this.faturamentoTotal < this.totalEstoque + this.totalECFOM){
      this.texto = "Sua empresa está sem rentabilidade";
    }
    else if(this.faturamentoTotal > this.totalEstoque + this.totalECFOM){
      this.texto = "Sua empresa tem o lucro de: R$"+ this.lucro.toLocaleString('pt-BR') + " por mês!";
    }
  }

  minhaChamadaApiEstoqueInicial(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getEstoqueInicial(this.idPlano).subscribe(estoqueInicial => {
        this.estoqueInicial = estoqueInicial;
        for (var i = 0; i < estoqueInicial.length; i++) {
          this.totalEstoque += parseFloat(estoqueInicial[i].totalME);
        }
        resolve();
      }, error => {
        reject();
      });
    })
  }

  minhaChamadaApiECFM(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getEstimativaDosCFOM(this.idPlano).subscribe(estimativaCustosFixosOM => {
        this.estimativaCustosFixosOM = estimativaCustosFixosOM;
        this.totalECFOM = estimativaCustosFixosOM[0].valorAluguel + estimativaCustosFixosOM[0].valorCondominio
          + estimativaCustosFixosOM[0].valorIPTU + estimativaCustosFixosOM[0].valorAgua + estimativaCustosFixosOM[0].valorEnergia
          + estimativaCustosFixosOM[0].valorTelefone + estimativaCustosFixosOM[0].valorManutencaoDeEquipamentos
          + estimativaCustosFixosOM[0].valorMaterialDeLimpeza + estimativaCustosFixosOM[0].valorMaterialDeEscritorio
          + estimativaCustosFixosOM[0].valorCombustivel + estimativaCustosFixosOM[0].valorTaxasDiversas
          + estimativaCustosFixosOM[0].valorServicosTerceiros + estimativaCustosFixosOM[0].valorOutrasDespesas;
        resolve();
      }, error => {
        reject();
      });
    })
  }

}

@Component({
  selector: 'dicasFaturamentoMensal',
  templateUrl: 'dicasFaturamentoMensal.html',
})
export class DicasFaturamentoMensal {}
