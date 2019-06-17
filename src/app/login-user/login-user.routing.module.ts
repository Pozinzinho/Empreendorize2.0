import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginUserComponent } from './login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './resend-registration-token/resend-registration-token.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';

export const loginUserRoutes = [
    {path: 'loginUser', component: LoginUserComponent, children : [
        {path: 'registerUser', component: RegisterUserComponent},
        {path: 'resendeRegistrationToken', component: ResendRegistrationTokenComponent},
        {path: ':id', component: ListUserComponent},
        {path: ':id/editUser', component: EditUserComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(loginUserRoutes)],
    exports: [RouterModule]
})

export class LoginUserRoutingModule{}
