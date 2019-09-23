import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-investimentos-fixos-v',
  templateUrl: './delete-investimentos-fixos-v.component.html',
  styleUrls: ['./delete-investimentos-fixos-v.component.css']
})
export class DeleteInvestimentosFixosVComponent implements OnInit {
  @ViewChild('deleteVeiculoModal') public deleteVeiculoModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este veículo?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteVeiculoModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteVeiculoModal.hide();
  }
}
