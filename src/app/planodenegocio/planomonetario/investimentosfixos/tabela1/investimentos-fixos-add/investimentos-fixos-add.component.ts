import { Component, OnInit } from '@angular/core';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-investimentos-fixos-add',
  templateUrl: './investimentos-fixos-add.component.html',
  styleUrls: ['./investimentos-fixos-add.component.css']
})
export class InvestimentosFixosAddComponent implements OnInit {

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  private idPlano : any;


  public investimentosF = new  InvestimentosFixosDto();

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
    this.apiService.registerInvestimentosFixos(this.investimentosF, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Máquinas e equipamentos cadastrado');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar máquinas e equipamentos!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }
}
