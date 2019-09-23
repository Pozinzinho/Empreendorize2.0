import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MDBBootstrapModule} from 'angular-bootstrap-md';


import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
  MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
  MatRadioModule,MatRippleModule, MatSidenavModule,MatSidenavContainer,MatSidenavContent, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule,
} from '@angular/material';

import { 
  MascaraDirective } from './directives/mascara.directive';
import { DeleteInvestimentosFixosMeComponent } from './components/modals/delete-investimentos-fixos/delete-investimentos-fixos-me/delete-investimentos-fixos-me.component';
import { DeleteInvestimentosFixosMuComponent } from './components/modals/delete-investimentos-fixos/delete-investimentos-fixos-mu/delete-investimentos-fixos-mu.component';
import { DeleteInvestimentosFixosVComponent } from './components/modals/delete-investimentos-fixos/delete-investimentos-fixos-v/delete-investimentos-fixos-v.component';



@NgModule({
  declarations: [
    MascaraDirective],
    
  imports: [
    CommonModule, 
    MatToolbarModule,
    MDBBootstrapModule.forRoot()
  ],
  exports:[
    MascaraDirective
  ]
})
export class SharedModule { }
