import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  //Pacotes do angular material
  MatInputModule, //Campo de texto
  MatButtonModule, //Botão
  MatListModule, //Lista que é usada no layout
  MatTooltipModule, //Tooltip que é a ajuda
  MatIconModule, //Icone de ajuda
  MatSnackBarModule //Para exibir a mensagem de sucesso ou erro
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module'; //Contem a diretiva de máscara de campos

import { 
	CadastrarPfComponent, 
	CadastroPfComponent 
} from './components';

import { CadastrarPfService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [
  	CadastrarPfComponent,
  	CadastroPfComponent
  ],
  providers: [
    CadastrarPfService
  ]
})
export class CadastroPfModule { }
