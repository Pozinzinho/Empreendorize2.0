import { HttpHeaders } from '@angular/common/http';

export const BASE_URL = 'http://localhost:8081/';
//export const BASE_URL = 'https://empreendedorize10.herokuapp.com/';
export const LOCAL = 'http://localhost:8081/';
export const BASE_URL2 = 'http://localhost:8081/api/';
//export const BASE_URL2 = 'https://empreendedorize10.herokuapp.com/api/';
export const URL_TOKEN = BASE_URL + 'oauth/token';
export const REGISTER_URL = BASE_URL + 'api/public/registration/users';
export const REGISTER_URL_LOCAL = LOCAL + 'api/public/registration/users';
export const CONFIRM_REGISTER_URL = BASE_URL + 'api/public/regitrationConfirm/users';
export const RESEND_REGISTER_TOKEN_URL = BASE_URL + 'api/public/resendRegistrationToken/users';

//EndPoint's para alteração de senha ---------------------------------------
export const RESET_PASSWORD = BASE_URL + 'api/public/resetPassword/users';
export const CHANGE_PASSWORD = BASE_URL + 'api/public/changePassword/users';
export const SAVE_PASSWORD = BASE_URL + 'api/public/savePassword/users';
//---------------------------------------------------------------------------

const headersToken = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
 });

export const OPTIONS_OBJECTO = { headers: headersToken};


export const HEADERS_LOGIN = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
 });
export const HEADERS_REGISTER = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
});
export const HEADERS_COMMUN = new HttpHeaders({
 Authorization: 'Basic ' + btoa('cliente' + ':' + '123')
});
