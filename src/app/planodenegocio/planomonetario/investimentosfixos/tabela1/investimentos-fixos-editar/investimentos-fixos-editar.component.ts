import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-investimentos-fixos-editar',
  templateUrl: './investimentos-fixos-editar.component.html',
  styleUrls: ['./investimentos-fixos-editar.component.css']
})
export class InvestimentosFixosEditarComponent implements OnInit {
  investimentosF = new  InvestimentosFixosDto();
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
    this.apiService.getInvestimentosFixosById(this.idPlano, this.idinvestimentosF).subscribe(investimentosF => {
      this.investimentosF = investimentosF;
      console.log('Retornou investimentos fixos com sucesso!', this.investimentosF);
    }, error => {
      console.log('Error ao pegar investimentos fixos por ID! ', error);
    });
  }

  update(): void {
    this.investimentosF.id = this.idinvestimentosF;
    this.apiService.updateInvestimentosFixos(this.investimentosF, this.idPlano).subscribe(() => {
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
