import { Component, OnInit, ViewChild } from '@angular/core';
declare var $;

@Component({
  selector: 'app-gerenciarplano',
  templateUrl: './gerenciarplano.component.html',
  styleUrls: ['./gerenciarplano.component.css']
})
export class GerenciarplanoComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;

  constructor() {}

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

}
