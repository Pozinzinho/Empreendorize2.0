import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstruturaDeComercializacaoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/EstruturaDeComercializacaoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-estruturadecomercializacao',
  templateUrl: './estruturadecomercializacao.component.html',
  styleUrls: ['./estruturadecomercializacao.component.css']
})
export class EstruturadecomercializacaoComponent implements OnInit {

  estruturaDeComercializacao :  EstruturaDeComercializacaoDto[];
  private idPlano : any;
  idComercializacao: string;


  public comercializacao = new  EstruturaDeComercializacaoDto();

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
    this.pegaridComercializacao();
    
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getEstruturaDeComercializacaoById(this.idPlano, this.idComercializacao).subscribe(comercializacao => {
      this.comercializacao = comercializacao;
      console.log('Retornou a estrutura de comercialização com sucesso! ');
    }, error => {
      console.log('Error ao capturar estrutura de comercialização por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegaridComercializacao() {
    this.apiService.getEstruturaDeComercializacao(this.idPlano).subscribe(estruturaDeComercializacao => {
      this.estruturaDeComercializacao = estruturaDeComercializacao;
      this.idComercializacao = estruturaDeComercializacao[0].id;
      console.log("Abaixo está o id da estrutura de comercialização", this.idComercializacao)
      this.recuperaPlano();
      if (this.idComercializacao != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'estruturacomercializacao', this.idComercializacao]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerEstruturaDeComercializacao(this.comercializacao, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Estrutura de comercialização cadastrada');
      console.log("Id do da rota", data.id)
      this.idComercializacao = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'estruturacomercializacao', data.id]);
    }, error => {
      this.messageService.showError('Falha no cadastro', 'Falha ao cadastrar estrutura de comercialização!');
    });
  }

  update(): void {
    this.comercializacao.id = this.idComercializacao;
    this.apiService.updateEstruturaDeComercializacao(this.comercializacao, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estrutura de comercialização atualizado com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estrutura de comercialização!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id estrutura de comercialização", this.idComercializacao)
    if(typeof this.idComercializacao === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(DicaComercializacao);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicaComercializacao',
  templateUrl: 'dicaComercializacao.html',
})
export class DicaComercializacao {}
