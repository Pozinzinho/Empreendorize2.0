import { Component, OnInit } from '@angular/core';
import { EstudoDosFornecedoresDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosFornecedoresDto';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { ApiService } from 'src/app/core/api.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-estudodosfornecedores',
  templateUrl: './estudodosfornecedores.component.html',
  styleUrls: ['./estudodosfornecedores.component.css']
})
export class EstudodosfornecedoresComponent implements OnInit {

  estudoDosFornecedores: EstudoDosFornecedoresDto[];

  idEstudo : string;

  private idPlano : any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.apiService.getEstudoDosFornecedores(this.idPlano).subscribe(estudoDosFornecedores => {
      this.estudoDosFornecedores = estudoDosFornecedores;
    }, error => {
      this.messageService.showError('Lista de Fornecedores','Falha ao carregar lista de Fornecedores!');
    });
  }

  deleteFornecedor(estudoDosFornecedores : EstudoDosFornecedoresDto): void{
    this.apiService.deleteFornecedores(this.idPlano, estudoDosFornecedores.id).subscribe(() => {
      this.estudoDosFornecedores = this.estudoDosFornecedores.filter(u => u.id !== estudoDosFornecedores.id);
      this.messageService.showError('Deleção de Fornecedor','Fornecedor deletado com sucesso!');
    }, error => {
      this.messageService.showError('Deleção de Fornecedor','Falha ao excluir Fornecedor!');
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(ExplicaFornecedores);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'explicaFornecedores',
  templateUrl: 'explicaFornecedores.html',
})
export class ExplicaFornecedores {}