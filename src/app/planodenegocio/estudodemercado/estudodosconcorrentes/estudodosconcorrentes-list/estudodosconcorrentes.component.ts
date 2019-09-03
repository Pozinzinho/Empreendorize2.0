import { Component, OnInit, Inject, Input } from '@angular/core';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-estudodosconcorrentes',
  templateUrl: './estudodosconcorrentes.component.html',
  styleUrls: ['./estudodosconcorrentes.component.css']
})
export class EstudodosconcorrentesComponent implements OnInit {

  estudoProprio: EstudoProprioDto[];
  estudoDosConcorrentes: EstudoDosConcorrentesDto[];

  proprio = new EstudoProprioDto();

  idEstudo : string;

  private idPlano : any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {

    // const id: string = this.route.snapshot.params.id;
    // const url: string = this.route.snapshot.url.join('');
    // const user = this.route.snapshot.data.user;
    

    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    // //----------- PEGA ID DA URL DA ROTA FILHA -----------
    // this.route.paramMap
    //   .subscribe((params: ParamMap) =>  this.idEstudo=params.get('id'));
    // //--------------------------------------------------

    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['loginUser']);
    }

    this.apiService.getEstudoProprio(this.idPlano).subscribe(estudoProprio => {
      this.estudoProprio = estudoProprio;
      console.log("O ID DO ESTUDO É PIPIU: ", estudoProprio);
      this.idEstudo = estudoProprio[0].id;
    }, error => {
      this.messageService.showError('Lista de estudo proprio','Falha ao carregar estudo próprio!');
    });
    
    
    this.apiService.getEstudoDosConcorrentes(this.idPlano).subscribe(estudoDosConcorrentes => {
      this.estudoDosConcorrentes = estudoDosConcorrentes;
    }, error => {
      this.messageService.showError('Lista de Concorrentes','Falha ao carregar lista de concorrentes!');
    });
  }


  deleteConcorrente(estudoDosConcorrentes : EstudoDosConcorrentesDto): void{
    this.apiService.deleteConcorrentes(this.idPlano, estudoDosConcorrentes.id).subscribe(() => {
      this.estudoDosConcorrentes = this.estudoDosConcorrentes.filter(u => u.id !== estudoDosConcorrentes.id);
      this.messageService.showError('Deleção de concorrente','Concorrente deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de concorrente','Falha ao excluir concorrente!');
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(ExplicaMercado);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}

@Component({
  selector: 'explicaMercado',
  templateUrl: 'explicaMercado.html',
})
export class ExplicaMercado {

}
