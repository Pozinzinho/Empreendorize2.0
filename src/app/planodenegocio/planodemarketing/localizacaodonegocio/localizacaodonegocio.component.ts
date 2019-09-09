import { Component, OnInit } from '@angular/core';
import { LocalizacaoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/LocalizacaoDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-localizacaodonegocio',
  templateUrl: './localizacaodonegocio.component.html',
  styleUrls: ['./localizacaodonegocio.component.css']
})
export class LocalizacaodonegocioComponent implements OnInit {

  localizacaoMatriz :  LocalizacaoDto[];
  private idPlano : any;
  idLocalizacao: string;


  public localizacao = new  LocalizacaoDto();

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
    this.pegaridLocalizacao();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getLocalizacaoById(this.idPlano, this.idLocalizacao).subscribe(localizacao => {
      this.localizacao = localizacao;
      console.log('Retornou localização com sucesso! ');
    }, error => {
      console.log('Error ao capturar localização por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegaridLocalizacao() {
    this.apiService.getLocalizacao(this.idPlano).subscribe(localizacaoMatriz => {
      this.localizacaoMatriz = localizacaoMatriz;
      this.idLocalizacao = localizacaoMatriz[0].id;
      console.log("Abaixo está o id do localização", this.idLocalizacao)
      this.recuperaPlano();
      if (this.idLocalizacao != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'localizacaonegocio', this.idLocalizacao]);
      }
    }, error => {
    });
  }
  //---------------------------------------------------------------------------------------



  save(): void {
    this.apiService.registerLocalizacao(this.localizacao, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Localizacão cadastrado');
      console.log("Id do da rota", data.id)
      this.idLocalizacao = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'localizacaonegocio', data.id]);
    }, error => {
      this.messageService.showError('Cadastro preço', 'Falha ao cadastrar localizacão!');
    });
  }

  update(): void {
    this.localizacao.id = this.idLocalizacao;
    this.apiService.updateLocalizacao(this.localizacao, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Localizacão atualizada com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar localizacão!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id localizacão", this.idLocalizacao)
    if(typeof this.idLocalizacao === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(DicaLocalizacao);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaLocalizacao',
  templateUrl: 'dicaLocalizacao.html',
})
export class DicaLocalizacao {}
