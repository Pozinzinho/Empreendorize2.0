import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';
import { CustoUnitarioDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';

@Component({
  selector: 'app-custounitario',
  templateUrl: './custounitario.component.html',
  styleUrls: ['./custounitario.component.css']
})
export class CustounitarioComponent implements OnInit {

  private custoTotal: number = 0;
  custoUnitario :  CustoUnitarioDto[];
  private idPlano : any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.pegarIdunitario();
    
  }

  //----------- Setar id da análise -----------------------------------------------
  pegarIdunitario() {
    this.apiService.getCustoUnitario(this.idPlano).subscribe(custoUnitario => {
      this.custoUnitario = custoUnitario;

      for(var i=0;i < custoUnitario.length;i++) {
        this.custoTotal += parseFloat(custoUnitario[i].total);
      }
    }, error => {
    });
  }
  //---------------------------------------------------------------------------------------

  deletarCustoUnitario(custoUnitario  : CustoUnitarioDto): void{
    this.apiService.deleteCustoUnitario(this.idPlano, custoUnitario.id).subscribe(() => {
      this.custoUnitario = this.custoUnitario.filter(u => u.id !== custoUnitario.id);
      this.messageService.showError('Deleção do custo unitário','Deletado com sucesso!');
      this.custoTotal = this.custoTotal - custoUnitario.total;
    }, error => {
      this.messageService.showError('Deleção de custo unitário','Falha ao custo unitário!');
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DicasCustoUnitario);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicasCustoUnitario',
  templateUrl: 'dicasCustoUnitario.html',
})
export class DicasCustoUnitario {}

