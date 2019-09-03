import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { ApiService } from 'src/app/core/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-estudo-proprio-editar',
  templateUrl: './estudo-proprio-editar.component.html',
  styleUrls: ['./estudo-proprio-editar.component.css']
})
export class EstudoProprioEditarComponent implements OnInit {

  proprio = new  EstudoProprioDto();
  idProprio: string;

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

    this.idProprio = this.route.snapshot.paramMap.get('id');
    this.apiService.getEstudoDosProprioById(this.idPlano, this.idProprio).subscribe(proprio => {
      this.proprio = proprio;
      console.log('Retornou proprio com sucesso!', this.proprio);
    }, error => {
      console.log('Error ao pegar proprio por ID! ', error);
    });
  }

  update(): void {
    this.proprio.id = this.idProprio;
    this.apiService.updateEstudoProprio(this.proprio, this.idPlano).subscribe(() => {
      this.messageService.showSuccess('Atualizado', 'Estudo próprio atualizado com sucesso!');
      this.goBack();
    }, error => {
      this.messageService.showError('Falha na atualização', 'Erro ao tentar atualizar estudo próprio!');
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(){
    this.update();
  }

}
