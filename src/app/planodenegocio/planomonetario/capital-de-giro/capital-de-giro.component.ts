import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstimativaDosCustosFixosMensaisDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstimativaDosCustosFixosMensaisDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material';
import { EstoqueInicialDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';

@Component({
  selector: 'app-capital-de-giro',
  templateUrl: './capital-de-giro.component.html',
  styleUrls: ['./capital-de-giro.component.css']
})
export class CapitalDeGiroComponent implements OnInit {

  estimativaCustosFixosOM :  EstimativaDosCustosFixosMensaisDto[];
  public estimativaCustos = new  EstimativaDosCustosFixosMensaisDto();
  idEstimativa: string;

  estoqueInicial :  EstoqueInicialDto[];
  estoque = new EstoqueInicialDto();
  idEstoque: string;

  private idPlano : any;



  total : number = 0;
  totalEstoque: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private messageService: MessageService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.recuperaEstoque();
    this.pegaridEstoque();

    this.recuperaEstimativa(); //Talvez eu não precise disto aqui...
    this.pegaridEstimativa();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaEstimativa(){
    this.apiService.getEstimativaDosCFOMById(this.idPlano, this.idEstimativa).subscribe(estimativaCustos => {
      this.estimativaCustos = estimativaCustos;
      console.log('Retornou estimativa dos CFOM com sucesso! ');
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegaridEstimativa() {
    this.apiService.getEstimativaDosCFOM(this.idPlano).subscribe(estimativaCustosFixosOM => {
      this.estimativaCustosFixosOM = estimativaCustosFixosOM;
      this.idEstimativa = estimativaCustosFixosOM[0].id;
        this.total = estimativaCustosFixosOM[0].valorAluguel + estimativaCustosFixosOM[0].valorCondominio 
        + estimativaCustosFixosOM[0].valorIPTU + estimativaCustosFixosOM[0].valorAgua + estimativaCustosFixosOM[0].valorEnergia 
        + estimativaCustosFixosOM[0].valorTelefone + estimativaCustosFixosOM[0].valorManutencaoDeEquipamentos
        + estimativaCustosFixosOM[0].valorMaterialDeLimpeza + estimativaCustosFixosOM[0].valorMaterialDeEscritorio  
        + estimativaCustosFixosOM[0].valorCombustivel + estimativaCustosFixosOM[0].valorTaxasDiversas
        + estimativaCustosFixosOM[0].valorServicosTerceiros + estimativaCustosFixosOM[0].valorOutrasDespesas;


      console.log("Abaixo está o id da estimativa", this.idEstimativa);
      this.recuperaEstimativa();
      if (this.idEstimativa != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'capitalDeGiro', this.idEstimativa]);
      }
    }, error => {
    });
  }
  //------------------------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerEstimativaDosCFOM(this.estimativaCustos, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Estimativa dos CFOM  cadastrada');
      console.log("Id do da rota", data.id)
      this.idEstimativa = data.id;
      this.recuperaEstimativa();
      this.router.navigate(['/planodenegocio/',this.idPlano,'capitalDeGiro', data.id]);
    }, error => {
      this.messageService.showError('Cadastro estimativa dos CFOM', 'Falha ao cadastrar estimativa dos CFOM!');
    });
  }

  update(): void {
    this.estimativaCustos.id = this.idEstimativa;
    this.apiService.updateEstimativaDosCFOM(this.estimativaCustos, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estimativa dos CFOM alterada com sucesso!');
      this.pegaridEstimativa();
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estimativa dos CFOM!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id estimativaCustos", this.idEstimativa)
    if(typeof this.idEstimativa === "undefined"){
      this.save();
    }else{
      this.update();
    }
  }


   // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
   recuperaEstoque(){
    this.apiService.getEstoqueInicialById(this.idPlano, this.idEstimativa).subscribe(estoque => {
      this.estoque = estoque;
      console.log('Retornou estoque inicial com sucesso! ');
    }, error => {
      console.log('Error ao capturar estoque inicial por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegaridEstoque() {
    this.apiService.getEstoqueInicial(this.idPlano).subscribe(estoqueInicial => {
      this.estoqueInicial = estoqueInicial;
      this.idEstoque = estoqueInicial[0].id;
      for(var i=0;i < estoqueInicial.length;i++) {
        this.totalEstoque += parseFloat(estoqueInicial[i].totalME);
      }
      console.log("Abaixo está o valor total do estoque", this.totalEstoque);
    }, error => {
    });
  }
  //------------------------------------------------------------------------------------------------------

  deletarEstoqueInicial(estoqueInicial  : EstoqueInicialDto): void{
    this.apiService.deleteEstoqueInicial(this.idPlano, estoqueInicial.id).subscribe(() => {
      this.estoqueInicial = this.estoqueInicial.filter(u => u.id !== estoqueInicial.id);
      this.messageService.showError('Deleção de estoque','Deletado com sucesso!');
      this.totalEstoque = this.totalEstoque - estoqueInicial.totalME;
    }, error => {
      this.messageService.showError('Deleção de estoque','Falha ao excluir material!');
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DicaCapitalDeGiro);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaCapitalDeGiro',
  templateUrl: 'dicaCapitalDeGiro.html',
})
export class DicaCapitalDeGiro {}

