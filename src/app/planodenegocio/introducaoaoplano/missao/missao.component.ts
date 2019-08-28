import { Component, ViewChild, OnInit } from '@angular/core';
import { IntroducaoAoPlanoDto } from 'src/app/core/model/models-do-plano/model-introducao-plano/introducaoAoPlanoDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-missao',
  templateUrl: './missao.component.html',
  styleUrls: ['./missao.component.css']
})
export class MissaoComponent implements OnInit {

  checked: boolean = false;

  nomeAgro: string;
  nomeServ: string;
  nomeIndu: string;
  nomeComercio: string;

  checouAgro: boolean = false;
  checouServ: boolean = false;
  checouIndu: boolean = false;
  checouComercio: boolean = false;

  introducaoAoPlano :  IntroducaoAoPlanoDto[];
  private idPlano : any;
  idIntroducao: string;
  


  public introducao = new  IntroducaoAoPlanoDto();

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

    this.recuperaPlano();
    this.pegarIdIntroducao();
    
  }

  onAgro(event) {
    // can't event.preventDefault();
    if (event.checked === true) {
      this.checouAgro = true;
      this.nomeAgro = "Agropecuária";
    } else {
      this.checouAgro = false;
      this.nomeAgro = "";
    }
    console.log('Checou agropecuária = ', this.checouAgro);
  }

  onServ(event) {
    if (event.checked === true) {
      this.checouServ = true;
      this.nomeServ = "Serviços";
    } else {
      this.checouServ = false;
      this.nomeServ = "";
    }
    console.log('Checou serviço = ', this.checouServ);
  }

  onIndu(event) {
    if (event.checked === true) {
      this.checouIndu = true;
      this.nomeIndu = "Indústria";
    } else {
      this.checouIndu = false;
      this.nomeIndu = "";
    }
    console.log('Checou indústria = ', this.checouIndu);
  }

  onComercio(event) {
    if (event.checked === true) {
      this.checouComercio = true;
      this.nomeComercio = "Comércio";
      console.log("nome comércio ", this.nomeComercio);
    } else {
      this.checouComercio = false;
      this.nomeComercio = "";
    }
    console.log('Checou comércio = ', this.checouComercio);
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano() {
    this.apiService.getIntroducaoPlanoById(this.idPlano, this.idIntroducao).subscribe(introducao => {
      this.introducao = introducao;
      console.log('Retornou introdução com sucesso! ');
    }, error => {
      console.log('Error ao capturar introdução por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegarIdIntroducao() {
    this.apiService.getIntroducaoPlano(this.idPlano).subscribe(introducaoAoPlano => {
      this.introducaoAoPlano = introducaoAoPlano;
      this.idIntroducao = introducaoAoPlano[0].id;
      this.nomeAgro = introducaoAoPlano[0].agro;
      this.nomeServ = introducaoAoPlano[0].serv;
      this.nomeIndu = introducaoAoPlano[0].indu;
      this.nomeComercio = introducaoAoPlano[0].comer;

      if (this.nomeAgro === "Agropecuária") { this.checouAgro = true; }
      if(this.nomeServ === "Serviços"){this.checouServ = true;}
      if(this.nomeIndu === "Indústria"){ this.checouIndu = true;}
      if(this.nomeComercio === "Comércio"){   this.checouComercio = true;}

      console.log("Abaixo está o id da introdução", this.idIntroducao)
      this.recuperaPlano();
      if (this.idIntroducao != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'missao', this.idIntroducao]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  save(): void {
    this.introducao.agro = this.nomeAgro;
    this.introducao.serv = this.nomeServ;
    this.introducao.indu = this.nomeIndu;
    this.introducao.comer = this.nomeComercio;
    this.apiService.registerIntroducaoPlano(this.introducao, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Introdução cadastrada');
      console.log("Id do da rota", data.id)
      this.idIntroducao = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'missao', data.id]);
    }, error => {
      this.messageService.showError('Cadastro Introdução', 'Falha ao cadastrar Introdução!');
    });
  }

  update(): void {
    this.introducao.id = this.idIntroducao;
    this.introducao.agro = this.nomeAgro;
    this.introducao.serv = this.nomeServ;
    this.introducao.indu = this.nomeIndu;
    this.introducao.comer = this.nomeComercio;
    this.apiService.updateIntroducaoPlano(this.introducao, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Introdução ao plano alterada com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar introdução ao plano!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id analise", this.idIntroducao)
    if(typeof this.idIntroducao === "undefined"){
      this.save();
    }else{
      this.update();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DicasMissao);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dicasMissao',
  templateUrl: 'dicasMissao.html',
})
export class DicasMissao {}