import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { FaturamentoMensalDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';

@Component({
  selector: 'app-faturamento-mensal-add',
  templateUrl: './faturamento-mensal-add.component.html',
  styleUrls: ['./faturamento-mensal-add.component.css']
})
export class FaturamentoMensalAddComponent implements OnInit {

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  private idPlano : any;


  public faturamentoMensal = new  FaturamentoMensalDto();

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
    this.apiService.registerFaturamentoMensal(this.faturamentoMensal, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Faturamento cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar faturamento!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }
}
