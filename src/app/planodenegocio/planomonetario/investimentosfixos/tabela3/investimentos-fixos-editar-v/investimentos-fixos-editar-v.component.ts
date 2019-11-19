import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';

@Component({
  selector: 'app-investimentos-fixos-editar-v',
  templateUrl: './investimentos-fixos-editar-v.component.html',
  styleUrls: ['./investimentos-fixos-editar-v.component.css']
})
export class InvestimentosFixosEditarVComponent implements OnInit {
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  investimentosF = new  InvestimentosFixosVDto();
  idinvestimentosF: string;

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

    this.idinvestimentosF = this.route.snapshot.paramMap.get('id');
    this.apiService.getInvestimentosFixosVById(this.idPlano, this.idinvestimentosF).subscribe(investimentosF => {
      this.investimentosF = investimentosF;
      console.log('Retornou investimentos fixos com sucesso!', this.investimentosF);
    }, error => {
      console.log('Error ao pegar investimentos fixos por ID! ', error);
    });
  }

  update(): void {
    this.investimentosF.id = this.idinvestimentosF;
    this.apiService.updateInvestimentosFixosV(this.investimentosF, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Investimentos fixos atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar investimentos fixos!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
