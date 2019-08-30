import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-concorrente-modal',
  templateUrl: './delete-concorrente-modal.component.html',
  styleUrls: ['./delete-concorrente-modal.component.css']
})
export class DeleteConcorrenteModalComponent implements OnInit {
  @ViewChild('deleteConcorrenteModal') public deleteConcorrenteModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este concorrente?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteConcorrenteModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteConcorrenteModal.hide();
  }
}
