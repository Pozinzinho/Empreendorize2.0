import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-fornecedor-modal',
  templateUrl: './delete-fornecedor-modal.component.html',
  styleUrls: ['./delete-fornecedor-modal.component.css']
})
export class DeleteFornecedorModalComponent implements OnInit {
  @ViewChild('deleteFornecedorModal') public deleteFornecedorModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este fornecedor?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteFornecedorModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteFornecedorModal.hide();
  }
}
