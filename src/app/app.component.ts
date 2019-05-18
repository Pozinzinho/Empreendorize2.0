import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {MatSlideToggleChange} from '@angular/material';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sair() {
  	delete localStorage['token'];
  	this.router.navigate(['/']);
  }

  autenticado(): boolean {
    return localStorage['token'];
  }

}
