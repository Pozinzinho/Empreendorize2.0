import{NgModule} from '@angular/core';
import{CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import{LoginUserComponent} from './login-user.component';
import { from } from 'rxjs';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './resend-registration-token/resend-registration-token.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { HeaderComponent } from './shared/components/navigation/header/header.component';
import { DeleteUserModalComponent } from './shared/components/modals/delete-user-modal/delete-user-modal.component';

import { LoginUserRoutingModule, loginUserRoutes } from './login-user.routing.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ApiService } from './core/api.service';

@NgModule({
    imports:[
        MDBBootstrapModule.forRoot(),
        CommonModule,
        RouterModule.forChild(loginUserRoutes),
        LoginUserRoutingModule,
        HttpClientModule, 
        AppRoutingModule, 
        ReactiveFormsModule,
        FormsModule
    ],
    exports:[],
    declarations:[
        LoginUserComponent, 
        RegisterUserComponent, 
        ResendRegistrationTokenComponent, 
        EditUserComponent, 
        ListUserComponent,
        HeaderComponent
    ],
    providers:[ApiService],
})
export class LoginUserModule{}