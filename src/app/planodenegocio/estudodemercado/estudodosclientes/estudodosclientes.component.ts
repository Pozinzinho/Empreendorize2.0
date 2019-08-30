import { Component, OnInit } from '@angular/core';
import { EstudoDosClientesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosClientesDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-estudodosclientes',
  templateUrl: './estudodosclientes.component.html',
  styleUrls: ['./estudodosclientes.component.css']
})
export class EstudodosclientesComponent implements OnInit {

  estudoDosClientes :  EstudoDosClientesDto[];
  private idPlano : any;
  idClientes: string;


  public clientes = new  EstudoDosClientesDto();

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
    this.pegarIdCliente();
  }

  // -------------------------------- RECUPERAR CLIENTE PELO ID ---------------------------
  recuperaPlano(){
    this.apiService.getEstudoDosClientesById(this.idPlano, this.idClientes).subscribe(clientes => {
      this.clientes = clientes;
      console.log('Retornou clientes com sucesso! ');
    }, error => {
      console.log('Error ao capturar clientes por ID! ', error);
    });
  }

  //----------- SETAR ID DO CLIENTE -----------------------------------------------
  pegarIdCliente() {
    this.apiService.getEstudoDosClientes(this.idPlano).subscribe(estudoDosClientes => {
      this.estudoDosClientes = estudoDosClientes;
      this.idClientes = estudoDosClientes[0].id;
      console.log("Abaixo está o id do cliente", this.idClientes);
      this.recuperaPlano();
      if (this.idClientes != "undefined") {
        this.router.navigate(['/planodenegocio/', this.idPlano, 'estudocliente', this.idClientes]);
      }

    }, error => {

    });
  }
  //---------------------------------------------------------------------------------------


  save(): void {
    this.apiService.registerEstudoDosClientes(this.clientes, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Estudo dos clientes cadastrado');
      console.log("Id do da rota", data.id)
      this.idClientes = data.id;
      this.recuperaPlano();
      this.router.navigate(['/planodenegocio/',this.idPlano,'estudocliente', data.id]);
    }, error => {
      this.messageService.showError('Falha no cadastro', 'Falha ao cadastrar estudo dos clientes!');
    });
  }

  update(): void {
    this.clientes.id = this.idClientes;
    this.apiService.updateEstudoDosClientes(this.clientes, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estudo dos clientes alterado com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estudo dos clientes!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    console.log("Valor atual id cliente", this.idClientes)
    if(typeof this.idClientes === "undefined"){
      this.save();
    }else{
      this.update();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DicasClientes);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dicasClientes',
  templateUrl: 'dicasClientes.html',
})
export class DicasClientes {}