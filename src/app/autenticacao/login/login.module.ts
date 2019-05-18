import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleChange} from '@angular/material';
import {MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent, LogarComponent } from './components';
import {LoginService} from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatPasswordStrengthModule 
  ],
  declarations: [
  	LoginComponent,
    LogarComponent,
    
  ],
  providers:[
    LoginService
  ]
})
export class LoginModule { }