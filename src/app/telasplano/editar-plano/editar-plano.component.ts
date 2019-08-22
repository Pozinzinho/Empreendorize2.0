import { Component, OnInit } from '@angular/core';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';
import { ApiService } from 'src/app/core/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import  {NgxSpinnerService}  from 'ngx-spinner';

@Component({
  selector: 'app-editar-plano',
  templateUrl: './editar-plano.component.html',
  styleUrls: ['./editar-plano.component.css']
})
export class EditarPlanoComponent implements OnInit {
  plano = new PlanoDto();
  idPlano: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.idPlano = this.route.snapshot.paramMap.get('id');
    this.apiService.getPlanosById(this.idPlano).subscribe(plano => {
      this.plano = plano;
      console.log('Retornou plano com sucesso! ');
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }

  updatePlano(): void {
    this.plano.id = this.idPlano;
    this.apiService.updatePlano(this.plano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Plano atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar o plano!');
    });
  }
  
  goBack() {
    this.location.back();
  }

}
