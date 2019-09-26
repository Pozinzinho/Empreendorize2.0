import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-estoque-inicial-modal',
  templateUrl: './delete-estoque-inicial-modal.component.html',
  styleUrls: ['./delete-estoque-inicial-modal.component.css']
})
export class DeleteEstoqueInicialModalComponent implements OnInit {
  
  @ViewChild('deleteEstoqueInicial') public deleteEstoqueInicial;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este material?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteEstoqueInicial.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteEstoqueInicial.hide();
  }

}
