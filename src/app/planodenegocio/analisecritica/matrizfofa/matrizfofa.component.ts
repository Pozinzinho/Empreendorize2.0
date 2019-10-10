import { Component, OnInit } from '@angular/core';
import { AnaliseDaMatrizDto } from 'src/app/core/model/models-do-plano/model-analiseDaMatriz/analiseDaMatrizDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-matrizfofa',
  templateUrl: './matrizfofa.component.html',
  styleUrls: ['./matrizfofa.component.css']
})
export class MatrizfofaComponent implements OnInit {

  analiseDaMatriz :  AnaliseDaMatrizDto[];
  private idPlano : any;
  idFofa: string;


  public fofa = new  AnaliseDaMatrizDto();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    public dialog: MatDialog,
    private messageService: MessageService) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------
    this.recuperaMatrizPeloPlano();
    this.pegarIdDaMatriz();
  }

   // -------------------------------- RECUPERAR Matriz PELO Plano ID ---------------------------
   recuperaMatrizPeloPlano(){
    this.apiService.getAnaliseDaMatrizById(this.idPlano, this.idFofa).subscribe(fofa => {
      this.fofa = fofa;
      console.log('Retornou matriz com sucesso! ');
    }, error => {
      console.log('Error ao capturar matriz por ID! ', error);
    });
  }

   //----------- Setar id da matriz -----------------------------------------------
  pegarIdDaMatriz() {
    this.apiService.getAnaliseDaMatriz(this.idPlano).subscribe(analiseDaMatriz => {
      this.analiseDaMatriz = analiseDaMatriz;
      this.idFofa = analiseDaMatriz[0].id;
      console.log("Abaixo está o id da matriz", this.idFofa)
      this.recuperaMatrizPeloPlano();
      if(this.idFofa != "undefined"){
        this.router.navigate(['/planodenegocio/',this.idPlano,'matrizfofa', this.idFofa]);
      }
    }, error => {
    });
    //---------------------------------------------------------------------------------------
  }

  save(): void {
    this.apiService.registerAnaliseDaMatriz(this.fofa, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Matriz F.O.F.A cadastrada');
      console.log("Id do da rota", data.id)
      this.idFofa = data.id;
      this.recuperaMatrizPeloPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'matrizfofa', data.id]);
    }, error => {
      this.messageService.showError('Cadastro da matriz', 'Falha ao cadastrar matriz F.O.F.A!');
    });
  }

  update(): void {
    this.fofa.id = this.idFofa;
    this.apiService.updateAnaliseDaMatriz(this.fofa, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Matriz F.O.F.A alterada com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar matriz!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id da matriz", this.idFofa)
    if(typeof this.idFofa === "undefined"){
      this.save();
    }else{
      this.update();
    }
    
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(DicasFOFA);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dicasFOFA',
  templateUrl: 'dicasFOFA.html',
})
export class DicasFOFA {}
