import { Component, OnInit } from '@angular/core';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { InvestimentosFixosMUDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosMUDto';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';
import { EstimativaDosCustosFixosMensaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstimativaDosCustosFixosMensaisDto';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';
import { InvestimentosPreOperacionaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosPreOperacionaisDto';
import { CustoUnitarioDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { FaturamentoMensalDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';

@Component({
  selector: 'app-demonstrativoderesultados',
  templateUrl: './demonstrativoderesultados.component.html',
  styleUrls: ['./demonstrativoderesultados.component.css']
})
export class DemonstrativoderesultadosComponent implements OnInit {
  investimentosFixos: InvestimentosFixosDto[];
  totalMee: number = 0;
  investimentosFixosMU: InvestimentosFixosMUDto[];
  totalMuu: number = 0;
  investimentosFixosV: InvestimentosFixosVDto[];
  totalVe: number = 0;


  estimativaCustosFixosOM: EstimativaDosCustosFixosMensaisDto[];
  estoqueInicial: EstoqueInicialDto[];
  totalECFOM: number = 0;
  totalEstoque: number = 0;


  investimentosPreOP: InvestimentosPreOperacionaisDto[];
  totalIPO: number = 0;

  custoTotal: number = 0;
  custoUnitario: CustoUnitarioDto[];

  private idPlano: any;
  
  capitalInicial: number = 0;
  mesesParaRetorno: number = 1;

  faturamentoTotal: number = 0;
  guardouFaturamento: number = 0;
  faturamentoMensal: FaturamentoMensalDto[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
  ) { }


  async  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    await this.minhaChamadaApiFaturamentoMensal();
    await this.minhaChamadaApiME();
    await this.minhaChamadaApiMU();
    await this.minhaChamadaApiV();
    await this.minhaChamadaApiEstoqueInicial();
    await this.minhaChamadaApiECFM();
    await this.minhaChamadaApiIPO();
    await this.minhaChamadaApiCU();


    this.capitalInicial = this.totalMee + this.totalMuu + this.totalVe + this.totalECFOM + this.totalEstoque + this.totalIPO + this.custoTotal;
    this.guardouFaturamento = this.faturamentoTotal;


    while (this.faturamentoTotal < this.capitalInicial) {
      this.mesesParaRetorno = this.mesesParaRetorno + 1;
      this.faturamentoTotal = this.faturamentoTotal + this.guardouFaturamento;
    }
  }

  minhaChamadaApiFaturamentoMensal(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getFaturamentoMensal(this.idPlano).subscribe(faturamentoMensal => {
        this.faturamentoMensal = faturamentoMensal;
        for (var i = 0; i < faturamentoMensal.length; i++) {
          this.faturamentoTotal += parseFloat(faturamentoMensal[i].faturamentoTotal);
        }
        resolve();
      }, error => {
        reject();
      });
    })
  }

  minhaChamadaApiME(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getInvestimentosFixos(this.idPlano).subscribe(investimentosFixos => {
        this.investimentosFixos = investimentosFixos;
        for (var i = 0; i < investimentosFixos.length; i++) {
          this.totalMee += parseFloat(investimentosFixos[i].totalME);
        }
        resolve();
      }, error => {
        reject();
      });
    })
  }

  minhaChamadaApiMU(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getInvestimentosFixosMU(this.idPlano).subscribe(investimentosFixosMU => {
        this.investimentosFixosMU = investimentosFixosMU;
        for (var i = 0; i < investimentosFixosMU.length; i++) {
          this.totalMuu += parseFloat(investimentosFixosMU[i].totalMU);
        }
        resolve();
      }, error => {
        reject();
      });
    })
  }

  minhaChamadaApiV(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getInvestimentosFixosV(this.idPlano).subscribe(investimentosFixosV => {
        this.investimentosFixosV = investimentosFixosV;
        for (var i = 0; i < investimentosFixosV.length; i++) {
          this.totalVe += parseFloat(investimentosFixosV[i].totalV);
        }
        resolve();
      }, error => {
        reject();
      });
    })
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

  minhaChamadaApiIPO(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getInvestimentosPO(this.idPlano).subscribe(investimentosPreOP => {
        this.investimentosPreOP = investimentosPreOP;
        this.totalIPO = investimentosPreOP[0].totalInvestimentos;
        resolve();
      }, error => {
        reject();
      });
    })
  }

  minhaChamadaApiCU(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.apiService.getCustoUnitario(this.idPlano).subscribe(custoUnitario => {
        this.custoUnitario = custoUnitario;

        for (var i = 0; i < custoUnitario.length; i++) {
          this.custoTotal += parseFloat(custoUnitario[i].total);
        }
        resolve();
      }, error => {
        reject();
      });
    })
  }

}
