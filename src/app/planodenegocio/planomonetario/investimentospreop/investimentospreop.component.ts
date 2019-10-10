import { Component, OnInit } from '@angular/core';
import { InvestimentosPreOperacionaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosPreOperacionaisDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-investimentospreop',
  templateUrl: './investimentospreop.component.html',
  styleUrls: ['./investimentospreop.component.css']
})
export class InvestimentospreopComponent implements OnInit {


  investimentosPreOP :  InvestimentosPreOperacionaisDto[];
  investimentosPO = new InvestimentosPreOperacionaisDto();
  idInvestimentoPO: string;

  private idPlano : any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.recuperaInvestimentosPO(); //Talvez eu não precise disto aqui...
    this.pegaridInvestimentosPO();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaInvestimentosPO(){
    this.apiService.getInvestimentosPOById(this.idPlano, this.idInvestimentoPO).subscribe(investimentosPO => {
      this.investimentosPO = investimentosPO;
      console.log('Retornou investimentos pré-operacionais com sucesso! ');
    }, error => {
      console.log('Error ao capturar investimentos pré-operacionais por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegaridInvestimentosPO() {
    this.apiService.getInvestimentosPO(this.idPlano).subscribe(investimentosPreOP => {
      this.investimentosPreOP = investimentosPreOP;
      this.idInvestimentoPO = investimentosPreOP[0].id;
      console.log("Investimentos pré-operacionais", this.idInvestimentoPO);
      this.recuperaInvestimentosPO();
      if (this.idInvestimentoPO != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'investimentospreop', this.idInvestimentoPO]);
      }
    }, error => {
    });
  }
  //------------------------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerInvestimentosPO(this.investimentosPO, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Investimentos pré-operacionais cadastrada');
      console.log("Id do da rota", data.id)
      this.idInvestimentoPO = data.id;
      this.pegaridInvestimentosPO();
      this.router.navigate(['/planodenegocio/',this.idPlano,'investimentospreop', data.id]);
    }, error => {
      this.messageService.showError('Cadastro estimativa dos investimentos pré-operacionais', 'Falha ao cadastrar investimentos pré-operacionais!');
    });
  }

  update(): void {
    this.investimentosPO.id = this.idInvestimentoPO;
    this.apiService.updateInvestimentosPO(this.investimentosPO, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Investimentos pré-operacionais alterada com sucesso!');
      this.pegaridInvestimentosPO();
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar investimentos pré-operacionais!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    if(typeof this.idInvestimentoPO === "undefined"){
      this.save();
    }else{
      this.update();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DicasInvestimentosPreOP);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicasInvestimentosPreOP',
  templateUrl: 'dicasInvestimentosPreOP.html',
})
export class DicasInvestimentosPreOP {}
