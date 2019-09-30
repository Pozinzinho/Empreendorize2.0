import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-custo-unitario-modal',
  templateUrl: './delete-custo-unitario-modal.component.html',
  styleUrls: ['./delete-custo-unitario-modal.component.css']
})
export class DeleteCustoUnitarioModalComponent implements OnInit {
  @ViewChild('deleteCustoUnitarioModal') public deleteCustoUnitarioModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este custo unitário?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteCustoUnitarioModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteCustoUnitarioModal.hide();
  }
}
