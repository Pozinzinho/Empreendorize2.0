import { Component, OnInit } from '@angular/core';
import { ProdutosServicosDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/ProdutosServicosDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produtoseservicos',
  templateUrl: './produtoseservicos.component.html',
  styleUrls: ['./produtoseservicos.component.css']
})
export class ProdutoseservicosComponent implements OnInit {
  produtosServicos :  ProdutosServicosDto[];
  private idPlano : any;
  idProduto: string;


  public produtos = new  ProdutosServicosDto();

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

    this.recuperaPlano(); //Talvez eu não precise disto aqui...
    this.pegarIdProduto();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getProdutosServicosById(this.idPlano, this.idProduto).subscribe(produtos => {
      this.produtos = produtos;
      console.log('Retornou produtos com sucesso! ');
    }, error => {
      console.log('Error ao capturar produtos por ID! ', error);
    });
  }

  //----------- Setar id dos produtos ou serviços -----------------------------------------------
  pegarIdProduto() {
    this.apiService.getProdutosServicos(this.idPlano).subscribe(produtosServicos => {
      this.produtosServicos= produtosServicos;
      this.idProduto = produtosServicos[0].id;
      console.log("Abaixo está o id do produto(Serviço)", this.idProduto)
      this.recuperaPlano();
      if (this.idProduto != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'produtoseservicos', this.idProduto]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerProdutosServicos(this.produtos, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Produto ou serviço cadastrado');
      console.log("Id do da rota", data.id)
      this.idProduto = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'produtoseservicos', data.id]);
    }, error => {
      this.messageService.showError('Cadastro produtos ou serviços', 'Falha ao cadastrar!');
    });
  }

  update(): void {
    this.produtos.id = this.idProduto;
    this.apiService.updateProdutosServicos(this.produtos, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Produtos ou serviços alterados com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar produtos ou serviços!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id Produtos", this.idProduto)
    if(typeof this.idProduto === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(DicaProdutos);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaProdutos',
  templateUrl: 'dicaProdutos.html',
})
export class DicaProdutos {}
