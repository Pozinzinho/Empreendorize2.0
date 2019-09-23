import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-investimentos-fixos-me',
  templateUrl: './delete-investimentos-fixos-me.component.html',
  styleUrls: ['./delete-investimentos-fixos-me.component.css']
})
export class DeleteInvestimentosFixosMeComponent implements OnInit {
  @ViewChild('deleteMaquinasEquipamentosModal') public deleteMaquinasEquipamentosModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar esta máquina/equipamento?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteMaquinasEquipamentosModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteMaquinasEquipamentosModal.hide();
  }

}
