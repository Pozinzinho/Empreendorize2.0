import { Component, OnInit } from '@angular/core';
import { EstudoDosFornecedoresDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosFornecedoresDto';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estudodosfornecedores-editar',
  templateUrl: './estudodosfornecedores-editar.component.html',
  styleUrls: ['./estudodosfornecedores-editar.component.css']
})
export class EstudodosfornecedoresEditarComponent implements OnInit {
  fornecedores = new  EstudoDosFornecedoresDto();
  idFornecedores: string;

  private idPlano : any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit() {

    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    this.idFornecedores = this.route.snapshot.paramMap.get('id');
    this.apiService.getEstudoDosFornecedoresById(this.idPlano, this.idFornecedores).subscribe(fornecedores => {
      this.fornecedores = fornecedores;
      console.log('Retornou fornecedores com sucesso!', this.fornecedores);
    }, error => {
      console.log('Error ao pegar fornecedores por ID! ', error);
    });
  }

  update(): void {
    this.fornecedores.id = this.idFornecedores;
    this.apiService.updateEstudoDosFornecedores(this.fornecedores, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Fornecedor atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o fornecedor!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }
}
