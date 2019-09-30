import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { CustoUnitarioDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';

@Component({
  selector: 'app-custo-unitario-edit',
  templateUrl: './custo-unitario-edit.component.html',
  styleUrls: ['./custo-unitario-edit.component.css']
})
export class CustoUnitarioEditComponent implements OnInit {
  custosUnitarios = new  CustoUnitarioDto();
  idCustoUnitario: string;

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

    this.idCustoUnitario = this.route.snapshot.paramMap.get('id');
    this.apiService.getCustoUnitarioById(this.idPlano, this.idCustoUnitario).subscribe(custosUnitarios => {
      this.custosUnitarios = custosUnitarios;
      console.log('Retornou custo unitário com sucesso mesmo!', this.custosUnitarios);
    }, error => {
      console.log('Error ao pegar custo unitário por ID! ', error);
    });
  }

  update(): void {
    this.custosUnitarios.id = this.idCustoUnitario;
    this.apiService.updateCustoUnitario(this.custosUnitarios, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Custo unitário atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar custo unitário!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
