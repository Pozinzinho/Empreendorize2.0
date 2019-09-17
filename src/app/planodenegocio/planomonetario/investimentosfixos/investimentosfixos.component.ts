import { Component, OnInit } from '@angular/core';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';
import { InvestimentosFixosMUDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosMUDto';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';

@Component({
  selector: 'app-investimentosfixos',
  templateUrl: './investimentosfixos.component.html',
  styleUrls: ['./investimentosfixos.component.css']
})
export class InvestimentosfixosComponent implements OnInit {

  investimentosFixos : InvestimentosFixosDto[];

  investimentosFixosMU : InvestimentosFixosMUDto[];

  investimentosFixosV : InvestimentosFixosVDto[];

  private idPlano : any;



  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
    ) {}

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------


//-------------------------------------- TABELA 1 -----------------------------------------------------------
    this.apiService.getInvestimentosFixos(this.idPlano).subscribe(investimentosFixos => {
      this.investimentosFixos = investimentosFixos;

    }, error => {
      this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 1!');
    });
//-------------------------------------------------------------------------------------------------------------


//-------------------------------------- TABELA 2 --------------------------------------------------------------
  this.apiService.getInvestimentosFixosMU(this.idPlano).subscribe(investimentosFixosMU => {
    this.investimentosFixosMU = investimentosFixosMU;

  }, error => {
    this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 2!');
  });
//--------------------------------------------------------------------------------------------------------------


//-------------------------------------- TABELA 3 --------------------------------------------------------------
  this.apiService.getInvestimentosFixosV(this.idPlano).subscribe(investimentosFixosV => {
    this.investimentosFixosV = investimentosFixosV;
  }, error => {
    this.messageService.showError('Lista de investimentos fixos', 'Falha ao carregar Tabela 3!');
  });
//----------------------------------------------------------------------------------------------------------------
  }
}
