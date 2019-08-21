import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { MessageService } from '../core/message.service';


@Component({
  selector: 'app-planodenegocio',
  templateUrl: './planodenegocio.component.html',
  styleUrls: ['./planodenegocio.component.css']
})

export class PlanodenegocioComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
  ) { }
  

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id, "pegou id");

  }

}
