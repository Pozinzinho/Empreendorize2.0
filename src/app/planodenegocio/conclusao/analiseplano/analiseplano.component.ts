import { Component, OnInit } from '@angular/core';
import { AnaliseDoPlanoDto } from 'src/app/core/model/models-do-plano/model-conclusao/analiseDoPlanoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/core/message.service';
import  {NgxSpinnerService}  from 'ngx-spinner';

@Component({
  selector: 'app-analiseplano',
  templateUrl: './analiseplano.component.html',
  styleUrls: ['./analiseplano.component.css']
})
export class AnaliseplanoComponent implements OnInit {

  analiseDoPlano :  AnaliseDoPlanoDto[];
  private idPlano : any;
  idAnalise: string;

  public analise = new  AnaliseDoPlanoDto();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    //----------- PEGA ID DA URL DA ROTA PAI -----------
    this.route.parent.params.subscribe((param: any) => {
      this.idPlano = param['id'];
    });
    //--------------------------------------------------

    // this.apiService.getAnaliseDoPlano(this.idPlano).subscribe(analiseDoPlano => {
    //   this.analiseDoPlano = analiseDoPlano;
    // }, error => {
    //   this.messageService.showError('Lista de análise','Falha ao carregar análise do plano!');
    // });

    this.idAnalise = this.route.snapshot.paramMap.get('id');
    console.log(this.idAnalise, "Id da análise");

    this.apiService.getAnaliseDoPlanoById(this.idPlano, this.idAnalise).subscribe(analise => {
      this.analise = analise;
      console.log('Retornou analise com sucesso! ');
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }

  update(): void {
    this.analise.id = this.idAnalise;
    this.apiService.updateAnaliseDoPlano(this.analise, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Descrição alterado com sucesso!');
     }, error => {
    this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o usuário!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
