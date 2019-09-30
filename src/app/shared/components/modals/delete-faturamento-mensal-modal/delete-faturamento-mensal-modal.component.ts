import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-faturamento-mensal-modal',
  templateUrl: './delete-faturamento-mensal-modal.component.html',
  styleUrls: ['./delete-faturamento-mensal-modal.component.css']
})
export class DeleteFaturamentoMensalModalComponent implements OnInit {
  @ViewChild('deleteFaturamentoMensalModel') public deleteFaturamentoMensalModel;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este faturamento?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteFaturamentoMensalModel.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteFaturamentoMensalModel.hide();
  }
}
