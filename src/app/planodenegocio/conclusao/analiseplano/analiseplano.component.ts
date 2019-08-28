import { Component, OnInit } from '@angular/core';
import { AnaliseDoPlanoDto } from 'src/app/core/model/models-do-plano/model-conclusao/analiseDoPlanoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';
import  {NgxSpinnerService}  from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-analiseplano',
  templateUrl: './analiseplano.component.html',
  styleUrls: ['./analiseplano.component.css']
})
export class AnaliseplanoComponent implements OnInit {

  analiseDoPlano :  AnaliseDoPlanoDto[];
  private idPlano : any;
  idAnalise: string;


  public analise = new  AnaliseDoPlanoDto();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.recuperaPlano();
    this.pegarIdAnalise();
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // -------------------------------- RECUPERAR O PLANO PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getAnaliseDoPlanoById(this.idPlano, this.idAnalise).subscribe(analise => {
      this.analise = analise;
      console.log('Retornou analise com sucesso! ');
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }

  //----------- Setar id da análise -----------------------------------------------
  pegarIdAnalise() {
    this.apiService.getAnaliseDoPlano(this.idPlano).subscribe(analiseDoPlano => {
      this.analiseDoPlano = analiseDoPlano;
      this.idAnalise = analiseDoPlano[0].id;
      console.log("Abaixo está o id da análise", this.idAnalise)
      this.recuperaPlano();
      if (this.idAnalise != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'analiseplano', this.idAnalise]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------

  

  save(): void {
    this.apiService.registerAnaliseDoPlano(this.analise, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Análise cadastrada');
      console.log("Id do da rota", data.id)
      this.idAnalise = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'analiseplano', data.id]);
    }, error => {
      this.messageService.showError('Cadastro análise', 'Falha ao cadastrar Análise!');
    });
  }

  update(): void {
    this.analise.id = this.idAnalise;
    this.apiService.updateAnaliseDoPlano(this.analise, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Descrição do plano alterada com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar descrição do plano!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id analise", this.idAnalise)
    if(typeof this.idAnalise === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
