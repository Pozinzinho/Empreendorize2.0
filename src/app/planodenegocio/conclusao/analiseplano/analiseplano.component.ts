import { Component, OnInit } from '@angular/core';
import { AnaliseDoPlanoDto } from 'src/app/core/model/models-do-plano/model-conclusao/AnaliseDoPlanoDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';

@Component({
  selector: 'app-analiseplano',
  templateUrl: './analiseplano.component.html',
  styleUrls: ['./analiseplano.component.css']
})
export class AnaliseplanoComponent implements OnInit {


  analiseDoPlano = new AnaliseDoPlanoDto();
  idAnalise : string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.idAnalise = this.route.snapshot.paramMap.get('id');
    this.apiService.getAnaliseDoPlanoById(this.idAnalise).subscribe(analiseDoPlano => {
      this.analiseDoPlano = analiseDoPlano;
      console.log('Retornou a análise do plano com sucesso! ');
    }, error => {
      console.log('Error ao capturar análise do plano por ID! ', error);
    });
  }

}
