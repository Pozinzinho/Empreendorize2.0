import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';


import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
  MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,
  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
  MatRadioModule,MatRippleModule, MatSidenavModule,MatSidenavContainer,MatSidenavContent, MatSliderModule, MatSlideToggleModule,MatSnackBarModule, MatSortModule,MatStepperModule,  MatTooltipModule,
} from '@angular/material';

import { 
  MascaraDirective } from './directives/mascara.directive';

@NgModule({
  declarations: [MascaraDirective],
  imports: [
    CommonModule, MatToolbarModule
  ],
  exports:[
    MascaraDirective
  ]
})
export class SharedModule { }
