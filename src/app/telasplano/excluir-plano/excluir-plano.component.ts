import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-excluir-plano',
  templateUrl: './excluir-plano.component.html',
  styleUrls: ['./excluir-plano.component.css']
})
export class ExcluirPlanoComponent implements OnInit {
  @ViewChild('excluirPlano') public excluirPlano;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este plano?';


  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show()
  {
    this.excluirPlano.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.excluirPlano.hide();
  }
}
