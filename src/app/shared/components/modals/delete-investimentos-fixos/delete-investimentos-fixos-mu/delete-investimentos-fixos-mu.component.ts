import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-investimentos-fixos-mu',
  templateUrl: './delete-investimentos-fixos-mu.component.html',
  styleUrls: ['./delete-investimentos-fixos-mu.component.css']
})
export class DeleteInvestimentosFixosMuComponent implements OnInit {
  @ViewChild('deleteInvestimentosFixosMuModal') public deleteInvestimentosFixosMuModal;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Empreendedorize';
  recebePergunta = 'Deseja realmente deletar este móvel/utensílio?';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.deleteInvestimentosFixosMuModal.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.deleteInvestimentosFixosMuModal.hide();
  }

}
