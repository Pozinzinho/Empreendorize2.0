import { Component, OnInit } from '@angular/core';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';
import { InvestimentosFixosMUDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosMUDto';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
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

  deleteInvestimentoFixoME(investimentosFixos  : InvestimentosFixosDto): void{
    this.apiService.deleteInvestimentosFixos(this.idPlano, investimentosFixos.id).subscribe(() => {
      this.investimentosFixos = this.investimentosFixos.filter(u => u.id !== investimentosFixos.id);
      this.messageService.showError('Deleção de máquinas/equipamentos','Deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de máquinas/equipamentos','Falha ao excluir máquinas/equipamentos!');
    });
  }

  deleteInvestimentoFixoMU(investimentosFixosMU  : InvestimentosFixosMUDto): void{
    this.apiService.deleteInvestimentosFixosMU(this.idPlano, investimentosFixosMU.id).subscribe(() => {
      this.investimentosFixosMU = this.investimentosFixosMU.filter(u => u.id !== investimentosFixosMU.id);
      this.messageService.showError('Deleção de móveis/utensílios','Deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de móveis/utensílios','Falha ao excluir móveis/utensílios!');
    });
  }

  deleteInvestimentoFixoV(investimentosFixosV  : InvestimentosFixosVDto): void{
    this.apiService.deleteInvestimentosFixosV(this.idPlano, investimentosFixosV.id).subscribe(() => {
      this.investimentosFixosV = this.investimentosFixosV.filter(u => u.id !== investimentosFixosV.id);
      this.messageService.showError('Deleção de veículos','Deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de veículos','Falha ao excluir veículo!');
    });
  }


openDialog() {
  const dialogRef = this.dialog.open(DicasInvestimentosFixos);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}

@Component({
selector: 'dicasInvestimentosFixos',
templateUrl: 'dicasInvestimentosFixos.html',
})
export class DicasInvestimentosFixos {}