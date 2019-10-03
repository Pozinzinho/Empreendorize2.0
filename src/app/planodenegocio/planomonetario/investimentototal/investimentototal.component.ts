import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { InvestimentosFixosMUDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosMUDto';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';
import { EstimativaDosCustosFixosMensaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstimativaDosCustosFixosMensaisDto';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';
import { InvestimentosPreOperacionaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosPreOperacionaisDto';
import { CustoUnitarioDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';

@Component({
  selector: 'app-investimentototal',
  templateUrl: './investimentototal.component.html',
  styleUrls: ['./investimentototal.component.css']
})
export class InvestimentototalComponent implements OnInit {
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

  private custoTotal: number = 0;
  custoUnitario :  CustoUnitarioDto[];

  private idPlano: any;

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


    //-------------------------------------- TABELA 1 -----------------------------------------------------------
    this.apiService.getInvestimentosFixos(this.idPlano).subscribe(investimentosFixos => {
      this.investimentosFixos = investimentosFixos;
      for (var i = 0; i < investimentosFixos.length; i++) {
        this.totalMee += parseFloat(investimentosFixos[i].totalME);
      }
    }, error => {
      this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 1!');
    });
    //-------------------------------------------------------------------------------------------------------------


    //-------------------------------------- TABELA 2 --------------------------------------------------------------
    this.apiService.getInvestimentosFixosMU(this.idPlano).subscribe(investimentosFixosMU => {
      this.investimentosFixosMU = investimentosFixosMU;
      for (var i = 0; i < investimentosFixosMU.length; i++) {
        this.totalMuu += parseFloat(investimentosFixosMU[i].totalMU);
      }
    }, error => {
      this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 2!');
    });
    //--------------------------------------------------------------------------------------------------------------


    //-------------------------------------- TABELA 3 --------------------------------------------------------------
    this.apiService.getInvestimentosFixosV(this.idPlano).subscribe(investimentosFixosV => {
      this.investimentosFixosV = investimentosFixosV;
      for (var i = 0; i < investimentosFixosV.length; i++) {
        this.totalVe += parseFloat(investimentosFixosV[i].totalV);
      }
    }, error => {
      this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 3!');
    });
    //----------------------------------------------------------------------------------------------------------------



    //----------- ESTOQUE INICIAL -----------------------------------------------
    this.apiService.getEstoqueInicial(this.idPlano).subscribe(estoqueInicial => {
      this.estoqueInicial = estoqueInicial;
      for (var i = 0; i < estoqueInicial.length; i++) {
        this.totalEstoque += parseFloat(estoqueInicial[i].totalME);
      }
      console.log("Abaixo está o valor total do estoque", this.totalEstoque);
    }, error => {
    });
    //---------------------------------------------------------------------------------

    //----------- ESTIMATIVA DOS CUSTOS FIXOS OPERACIONAIS MENSAIS -----------------------------------------------
    this.apiService.getEstimativaDosCFOM(this.idPlano).subscribe(estimativaCustosFixosOM => {
      this.estimativaCustosFixosOM = estimativaCustosFixosOM;
      this.totalECFOM = estimativaCustosFixosOM[0].valorAluguel + estimativaCustosFixosOM[0].valorCondominio
        + estimativaCustosFixosOM[0].valorIPTU + estimativaCustosFixosOM[0].valorAgua + estimativaCustosFixosOM[0].valorEnergia
        + estimativaCustosFixosOM[0].valorTelefone + estimativaCustosFixosOM[0].valorManutencaoDeEquipamentos
        + estimativaCustosFixosOM[0].valorMaterialDeLimpeza + estimativaCustosFixosOM[0].valorMaterialDeEscritorio
        + estimativaCustosFixosOM[0].valorCombustivel + estimativaCustosFixosOM[0].valorTaxasDiversas
        + estimativaCustosFixosOM[0].valorServicosTerceiros + estimativaCustosFixosOM[0].valorOutrasDespesas;
    }, error => {
    });
    //------------------------------------------------------------------------------------------------------

    //----------- INVESTIMENTOS PRÉ OPERACIONAIS -----------------------------------------------
    this.apiService.getInvestimentosPO(this.idPlano).subscribe(investimentosPreOP => {
      this.investimentosPreOP = investimentosPreOP;
      this.totalIPO = investimentosPreOP[0].totalInvestimentos;
    }, error => {
    });

    //------------------------------------------------------------------------------------------------------
  
  //----------- CUSTO UNITARIO -----------------------------------------------
    this.apiService.getCustoUnitario(this.idPlano).subscribe(custoUnitario => {
      this.custoUnitario = custoUnitario;

      for(var i=0;i < custoUnitario.length;i++) {
        this.custoTotal += parseFloat(custoUnitario[i].total);
      }
    }, error => {
    });
  //---------------------------------------------------------------------------------------
  
  }
}
