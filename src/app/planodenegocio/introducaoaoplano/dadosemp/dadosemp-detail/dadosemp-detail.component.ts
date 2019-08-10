import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dadosemp-detail',
  templateUrl: './dadosemp-detail.component.html',
  styleUrls: ['./dadosemp-detail.component.css']
})
export class DadosempDetailComponent implements OnInit {
  @ViewChild('dadosempDetail') public dadosempDetail;
  @Input() recebeItem;
  @Output() resposta = new EventEmitter();
  recebeTitulo = 'Informação do sócio';
  recebePergunta = 'Aqui será setado os dados do sócio';

  constructor() { }

  ngOnInit() {
  }
  onClose(event: any) {
    console.log(event);
  }
  show() {
    this.dadosempDetail.show();
  }
  delete() {
    this.resposta.emit(this.recebeItem);
    this.dadosempDetail.hide();
  }

}
