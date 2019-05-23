import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.css']
})
export class MenulateralComponent implements OnInit {

public mostrar: boolean;
mensagem: String="Abrir menu lateral";

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.mostrar = !this.mostrar;
    if(this.mensagem == "Fechar menu lateral"){
      this.mensagem = "Abrir menu lateral";
    }else{
      this.mensagem = "Fechar menu lateral";
}
}

}
