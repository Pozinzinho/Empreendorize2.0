import { Component, OnInit } from '@angular/core';
import { EstrategiasPromocionaisDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/EstrategiasPromocionaisDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estrategiapromocional',
  templateUrl: './estrategiapromocional.component.html',
  styleUrls: ['./estrategiapromocional.component.css']
})
export class EstrategiapromocionalComponent implements OnInit {
  
  estrategiaPromocional :  EstrategiasPromocionaisDto[];
  private idPlano : any;
  idPromocao: string;


  public promocoes = new  EstrategiasPromocionaisDto();

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
    this.pegaridPromocao();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getEstrategiasPromocionaisById(this.idPlano, this.idPromocao).subscribe(promocoes => {
      this.promocoes = promocoes;
      console.log('Retornou estrátegia promocional com sucesso! ');
    }, error => {
      console.log('Error ao capturar estrátegia promocional por ID! ', error);
    });
  }

  //----------- Setar id da estratégia promocional -----------------------------------------------
  pegaridPromocao() {
    this.apiService.getEstrategiasPromocionais(this.idPlano).subscribe(estrategiaPromocional => {
      this.estrategiaPromocional = estrategiaPromocional;
      this.idPromocao = estrategiaPromocional[0].id;
      console.log("Abaixo está o id da estrátegia promocional", this.idPromocao)
      this.recuperaPlano();
      if (this.idPromocao != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'estrategiaspromocionais', this.idPromocao]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerEstrategiasPromocionais(this.promocoes, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Estratégia promocional cadastrada');
      console.log("Id do da rota", data.id)
      this.idPromocao = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'estrategiaspromocionais', data.id]);
    }, error => {
      this.messageService.showError('Cadastro estratégia', 'Falha ao cadastrar estratégia promocional!');
    });
  }

  update(): void {
    this.promocoes.id = this.idPromocao;
    this.apiService.updateEstrategiasPromocionais(this.promocoes, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estratégia promocional atualizado com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estratégia promocional!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id preço", this.idPromocao)
    if(typeof this.idPromocao === "undefined"){
      this.save();
    }else{
      this.update();
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(DicaPromocional);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaPromocional',
  templateUrl: 'dicaPromocional.html',
})
export class DicaPromocional {}
