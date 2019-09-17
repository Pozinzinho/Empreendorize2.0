import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { InvestimentosFixosVDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-investimentos-fixos-add-v',
  templateUrl: './investimentos-fixos-add-v.component.html',
  styleUrls: ['./investimentos-fixos-add-v.component.css']
})
export class InvestimentosFixosAddVComponent implements OnInit {

  private idPlano : any;


  public investimentosF = new  InvestimentosFixosVDto();

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
    this.apiService.registerInvestimentosFixosV(this.investimentosF, this.idPlano).subscribe(data => {
      this.messageService.showSuccess('Cadastro realizado com sucesso!', 
      'Veículos cadastrados');
      this.goBack();
    }, error => {
      this.messageService.showError('Erro de cadastro', 'Falha ao cadastrar veículos!');
    });
  }
  goBack() {
    this.location.back();
  }

  onSubmit(){
      this.save();
  }

}
