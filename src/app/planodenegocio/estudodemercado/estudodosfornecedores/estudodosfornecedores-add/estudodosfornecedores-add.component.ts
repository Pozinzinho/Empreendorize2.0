import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudoDosFornecedoresDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosFornecedoresDto';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estudodosfornecedores-add',
  templateUrl: './estudodosfornecedores-add.component.html',
  styleUrls: ['./estudodosfornecedores-add.component.css']
})
export class EstudodosfornecedoresAddComponent implements OnInit {

  private idPlano : any;


  public fornecedores = new  EstudoDosFornecedoresDto();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

  }

  save(): void {
    this.apiService.registerEstudoDosFornecedores(this.fornecedores, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Fornecedor cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar fornecedor!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }
}
