import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { CustoUnitarioDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';


@Component({
  selector: 'app-custo-unitario-add',
  templateUrl: './custo-unitario-add.component.html',
  styleUrls: ['./custo-unitario-add.component.css']
})
export class CustoUnitarioAddComponent implements OnInit {

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  private idPlano : any;


  public custosUnitarios = new  CustoUnitarioDto();

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
    this.apiService.registerCustoUnitario(this.custosUnitarios, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Custo unitário cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar custo unitário!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }

}
