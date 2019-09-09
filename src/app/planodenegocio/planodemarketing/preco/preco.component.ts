import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PrecoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/PrecoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preco',
  templateUrl: './preco.component.html',
  styleUrls: ['./preco.component.css']
})
export class PrecoComponent implements OnInit {

  precoMatriz :  PrecoDto[];
  private idPlano : any;
  idPreco: string;


  public precos = new  PrecoDto();

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
    this.pegarIdPreco();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getPrecoById(this.idPlano, this.idPreco).subscribe(precos => {
      this.precos = precos;
      console.log('Retornou preço com sucesso! ');
    }, error => {
      console.log('Error ao capturar preço por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegarIdPreco() {
    this.apiService.getPreco(this.idPlano).subscribe(precoMatriz => {
      this.precoMatriz = precoMatriz;
      this.idPreco = precoMatriz[0].id;
      console.log("Abaixo está o id do preço", this.idPreco)
      this.recuperaPlano();
      if (this.idPreco != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'preco', this.idPreco]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerPreco(this.precos, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Preço cadastrado');
      console.log("Id do da rota", data.id)
      this.idPreco = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'preco', data.id]);
    }, error => {
      this.messageService.showError('Cadastro preço', 'Falha ao cadastrar preço!');
    });
  }

  update(): void {
    this.precos.id = this.idPreco;
    this.apiService.updatePreco(this.precos, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Preço atualizado com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar preço!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id preço", this.idPreco)
    if(typeof this.idPreco === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(DicaPreco);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaPreco',
  templateUrl: 'dicaPreco.html',
})
export class DicaPreco {}

