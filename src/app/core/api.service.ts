import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import * as AppUtils from '../shared/comum/app.utils';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UserLogin } from './model/model-user/login';
import { UserDto } from './model/model-user/userDto';
import { PlanoDto } from './model/model-plano/planoDto';
import { AnaliseDoPlanoDto } from './model/models-do-plano/model-conclusao/AnaliseDoPlanoDto';
import { AnaliseDaMatrizDto } from './model/models-do-plano/model-analiseDaMatriz/analiseDaMatrizDto';
import { IntroducaoAoPlanoDto } from './model/models-do-plano/model-introducao-plano/introducaoAoPlanoDto';
import { EstudoDosClientesDto } from './model/models-do-plano/model-estudo-mercado/EstudoDosClientesDto';
import { EstudoDosFornecedoresDto } from './model/models-do-plano/model-estudo-mercado/EstudoDosFornecedoresDto';
import { EstudoDosConcorrentesDto } from './model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { EstudoProprioDto } from './model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { EstrategiasPromocionaisDto } from './model/models-do-plano/model-plano-de-marketing/EstrategiasPromocionaisDto';
import { EstruturaDeComercializacaoDto } from './model/models-do-plano/model-plano-de-marketing/EstruturaDeComercializacaoDto';
import { LocalizacaoDto } from './model/models-do-plano/model-plano-de-marketing/LocalizacaoDto';
import { PrecoDto } from './model/models-do-plano/model-plano-de-marketing/PrecoDto';
import { ProdutosServicosDto } from './model/models-do-plano/model-plano-de-marketing/ProdutosServicosDto';
import { InvestimentosFixosDto } from './model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';
import { InvestimentosFixosMUDto } from './model/models-do-plano/model-plano-financeiro/investimentosFixosMUDto';
import { InvestimentosFixosVDto } from './model/models-do-plano/model-plano-financeiro/investimentosFixosVDto';
import { EstoqueInicialDto } from './model/models-do-plano/model-plano-financeiro/EstoqueInicialDto';
import { EstimativaDosCustosFixosMensaisDto } from './model/models-do-plano/model-plano-financeiro/EstimativaDosCustosFixosMensaisDto';
import { InvestimentosPreOperacionaisDto } from './model/models-do-plano/model-plano-financeiro/InvestimentosPreOperacionaisDto';
import { CustoUnitarioDto } from './model/models-do-plano/model-plano-financeiro/CustoUnitarioDto';
import { FaturamentoMensalDto } from './model/models-do-plano/model-plano-financeiro/FaturamentoMensalDto';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string;
  public baseUrlP: string;
  public baseUrlAP: string;
  public baseUrlR: string;
  public baseUrlEP: string;
  public baseUrlEC: string;
  public baseUrlAM: string;
  public baseUrlIP: string;
  public baseUrlECLI: string;
  public baseUrlEF: string;
  public baseUrlEPro: string;
  public baseUrlEDC: string;
  public baseUrlL: string;
  public baseUrlPrecos: string;
  public baseUrlProSer: string;

  public baseUrlEsIni: string;
  public baseUrlEsCFM: string;

  public baseUrlIF: string;
  public baseUrlIFMU: string;
  public baseUrlIFV: string;

  public baseUrlIPO: string;

  public baseUrlCU: string;
  public baseUrlFM: string;

  public user = new UserDto;
  public roleAtual: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${AppUtils.BASE_URL}` + 'api/users';
    this.baseUrlR = `${AppUtils.BASE_URL}` + 'api/users/roles/main';

    this.baseUrlP = `${AppUtils.BASE_URL}` + 'api/planos';
    this.baseUrlECLI = '/estudoDosClientes';
    this.baseUrlEF = '/estudoDosFornecedores';
    this.baseUrlEP = '/estudoProprio';
    this.baseUrlEC = '/estudoDosConcorrentes';

    this.baseUrlEPro = '/estrategiasPromocionais';
    this.baseUrlEDC = '/estruturaDeComercializacao';
    this.baseUrlL = '/localizacao';
    this.baseUrlPrecos = '/precos';
    this.baseUrlProSer = '/produtosServicos';

    this.baseUrlIF = '/investimentosFixos';
    this.baseUrlIFMU = '/investimentosFixosMU';
    this.baseUrlIFV = '/investimentosFixosV';

    this.baseUrlEsIni = '/estoqueInicial';
    this.baseUrlEsCFM = '/estimativaDosCustosFixosMensais';

    this.baseUrlCU = '/custoUnitario';
    this.baseUrlFM = '/faturamentoMensal';

    this.baseUrlIPO = '/investimentosPreOperacionais'

    this.baseUrlIP = '/missaoDaEmpresa';
    this.baseUrlAM = '/analiseDaMatriz';
    this.baseUrlAP = '/analiseDoPlano';


  }

  login(user: UserLogin): Observable<any> {

    const params = new HttpParams()
      .set('username', user.email)
      .set('password', user.password)
      .set('grant_type', 'password');

    const options = {
      headers: AppUtils.HEADERS_COMMUN,
      params
    };
    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  }

  getMainUser(token: any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}` + '/main', AppUtils.OPTIONS_OBJECTO);
  }

  getAccessToken(refreshToken): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    const options = {
      headers: AppUtils.HEADERS_COMMUN,
      params
    };
    return this.httpClient.post(AppUtils.URL_TOKEN, null, options);
  }


  //Método para verificação do usuário logado.
  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
      }
    });
  }

  //Método para verificação do nível de acesso.
  isAuthenticatedADM(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (JSON.parse(localStorage.getItem('currentUser'))) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user.roles[0].name === "ROLE_ADMIN") {
          observer.next(true);
          observer.complete();
        }
      } else {
        observer.next(false);
      }
    });
  }


  registerUser(user: UserDto): Observable<any> {
    return this.httpClient.post<any>(AppUtils.REGISTER_URL, user, { headers: AppUtils.HEADERS_COMMUN });
  }

  registerPlano(plano: PlanoDto): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlP}`, plano, AppUtils.OPTIONS_OBJECTO);
  }

  confirmationRegisterToken(token: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token);
    const options = {
      headers: AppUtils.HEADERS_COMMUN,
      params
    };
    return this.httpClient.get<any>(AppUtils.CONFIRM_REGISTER_URL, options);
  }

  resendRegisterToken(user: UserDto): Observable<any> {
    const params = new HttpParams()
      .set('email', user.email);
    const options = {
      headers: AppUtils.HEADERS_COMMUN,
      params
    };
    return this.httpClient.get<any>(AppUtils.RESEND_REGISTER_TOKEN_URL, options);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`, AppUtils.OPTIONS_OBJECTO);
  }

  // ---------------- SERVIÇOS REFERENTES A Introdução do Plano ---------------------------------------------------------------
  getIntroducaoPlano(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getIntroducaoPlanoById(idPlano: string, idIntroducao: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIP}/${idIntroducao}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateIntroducaoPlano(introducao: IntroducaoAoPlanoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}/${introducao.id}`,
      introducao, AppUtils.OPTIONS_OBJECTO);
  }

  registerIntroducaoPlano(introducao: IntroducaoAoPlanoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIP}`, introducao, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AO ESTUDO DE CLIENTES ---------------------------------------------------------------
  getEstudoDosClientes(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlECLI}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoDosClientesById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlECLI}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateEstudoDosClientes(estudoDosClientes: EstudoDosClientesDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlECLI}/${estudoDosClientes.id}`,
      estudoDosClientes, AppUtils.OPTIONS_OBJECTO);
  }

  registerEstudoDosClientes(estudoDosClientes: EstudoDosClientesDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlECLI}`, estudoDosClientes, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AO ESTUDO DOS FORNECEDORES ---------------------------------------------------------------
  getEstudoDosFornecedores(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEF}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoDosFornecedoresById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEF}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateEstudoDosFornecedores(estudoDosFornecedores: EstudoDosFornecedoresDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEF}/${estudoDosFornecedores.id}`,
      estudoDosFornecedores, AppUtils.OPTIONS_OBJECTO);
  }

  registerEstudoDosFornecedores(estudoDosFornecedores: EstudoDosFornecedoresDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEF}`, estudoDosFornecedores, AppUtils.OPTIONS_OBJECTO);
  }

  deleteFornecedores(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEF}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AO ESTUDO DOS CONCORRENTES ---------------------------------------------------------------
  getEstudoDosConcorrentes(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEC}`, AppUtils.OPTIONS_OBJECTO);
  }

  getEstudoDosConcorrentesById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEC}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateEstudoDosConcorrentes(estudoDosConcorrentes: EstudoDosConcorrentesDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEC}/${estudoDosConcorrentes.id}`,
      estudoDosConcorrentes, AppUtils.OPTIONS_OBJECTO);
  }

  registerEstudoDosConcorrentes(estudoDosConcorrentes: EstudoDosConcorrentesDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEC}`, estudoDosConcorrentes, AppUtils.OPTIONS_OBJECTO);
  }

  deleteConcorrentes(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEC}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AO ESTUDO PRÓPRIO ---------------------------------------------------------------
  getEstudoProprio(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEP}`, AppUtils.OPTIONS_OBJECTO);
  }
  getEstudoDosProprioById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateEstudoProprio(estudoProprio: EstudoProprioDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEP}/${estudoProprio.id}`,
      estudoProprio, AppUtils.OPTIONS_OBJECTO);
  }
  registerEstudoProprio(estudoProprio: EstudoProprioDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEP}`, estudoProprio, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AS ESTRATÉGIAS PROMOCIONAIS ---------------------------------------------------------------
  getEstrategiasPromocionais(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEPro}`, AppUtils.OPTIONS_OBJECTO);
  }
  getEstrategiasPromocionaisById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEPro}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateEstrategiasPromocionais(estrategiasPromocionais: EstrategiasPromocionaisDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEPro}/${estrategiasPromocionais.id}`,
      estrategiasPromocionais, AppUtils.OPTIONS_OBJECTO);
  }
  registerEstrategiasPromocionais(estrategiasPromocionais: EstrategiasPromocionaisDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEPro}`, estrategiasPromocionais, AppUtils.OPTIONS_OBJECTO);
  }
  //----------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AS ESTRUTURA DE COMERCIALIZAÇÃO ---------------------------------------------------------------
  getEstruturaDeComercializacao(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEDC}`, AppUtils.OPTIONS_OBJECTO);
  }
  getEstruturaDeComercializacaoById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEDC}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateEstruturaDeComercializacao(estruturaDeComercializacao: EstruturaDeComercializacaoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEDC}/${estruturaDeComercializacao.id}`,
      estruturaDeComercializacao, AppUtils.OPTIONS_OBJECTO);
  }
  registerEstruturaDeComercializacao(estruturaDeComercializacao: EstruturaDeComercializacaoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEDC}`, estruturaDeComercializacao, AppUtils.OPTIONS_OBJECTO);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES A LOCALIZAÇÃO ---------------------------------------------------------------------------------
  getLocalizacao(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlL}`, AppUtils.OPTIONS_OBJECTO);
  }
  getLocalizacaoById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlL}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateLocalizacao(localizacao: LocalizacaoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlL}/${localizacao.id}`,
      localizacao, AppUtils.OPTIONS_OBJECTO);
  }
  registerLocalizacao(localizacao: LocalizacaoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlL}`, localizacao, AppUtils.OPTIONS_OBJECTO);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AO PRECO ---------------------------------------------------------------------------------------
  getPreco(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlPrecos}`, AppUtils.OPTIONS_OBJECTO);
  }
  getPrecoById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlPrecos}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updatePreco(precos: PrecoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlPrecos}/${precos.id}`,
      precos, AppUtils.OPTIONS_OBJECTO);
  }
  registerPreco(precos: PrecoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlPrecos}`, precos, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS PRODUTOS E SERVIÇOS ------------------------------------------------------------------------
  getProdutosServicos(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlProSer}`, AppUtils.OPTIONS_OBJECTO);
  }
  getProdutosServicosById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlProSer}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateProdutosServicos(produtosServicos: ProdutosServicosDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlProSer}/${produtosServicos.id}`,
      produtosServicos, AppUtils.OPTIONS_OBJECTO);
  }
  registerProdutosServicos(produtosServicos: ProdutosServicosDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlProSer}`, produtosServicos, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS INVESTIMENTOS FIXOS ------------------------------------------------------------------------
  getInvestimentosFixos(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIF}`, AppUtils.OPTIONS_OBJECTO);
  }
  getInvestimentosFixosById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIF}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateInvestimentosFixos(investimentosFixosDto: InvestimentosFixosDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIF}/${investimentosFixosDto.id}`,
      investimentosFixosDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerInvestimentosFixos(investimentosFixosDto: InvestimentosFixosDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIF}`, investimentosFixosDto, AppUtils.OPTIONS_OBJECTO);
  }
  deleteInvestimentosFixos(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIF}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS INVESTIMENTOS FIXOS MÓVEIS E UTENSÍLIOS------------------------------------------------------
  getInvestimentosFixosMU(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFMU}`, AppUtils.OPTIONS_OBJECTO);
  }
  getInvestimentosFixosMUById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIFMU}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateInvestimentosFixosMU(investimentosFixosMUDto: InvestimentosFixosMUDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFMU}/${investimentosFixosMUDto.id}`,
      investimentosFixosMUDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerInvestimentosFixosMU(investimentosFixosMUDto: InvestimentosFixosMUDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFMU}`, investimentosFixosMUDto, AppUtils.OPTIONS_OBJECTO);
  }
  deleteInvestimentosFixosMU(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIFMU}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS INVESTIMENTOS FIXOS VEÍCULOS ------------------------------------------------------
  getInvestimentosFixosV(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFV}`, AppUtils.OPTIONS_OBJECTO);
  }
  getInvestimentosFixosVById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIFV}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateInvestimentosFixosV(investimentosFixosVDto: InvestimentosFixosVDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFV}/${investimentosFixosVDto.id}`,
      investimentosFixosVDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerInvestimentosFixosV(investimentosFixosVDto: InvestimentosFixosVDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIFV}`, investimentosFixosVDto, AppUtils.OPTIONS_OBJECTO);
  }
  deleteInvestimentosFixosV(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIFV}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS ESTOQUES INICIAIS ------------------------------------------------------
  getEstoqueInicial(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsIni}`, AppUtils.OPTIONS_OBJECTO);
  }
  getEstoqueInicialById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEsIni}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateEstoqueInicial(estoqueInicialDto: EstoqueInicialDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsIni}/${estoqueInicialDto.id}`,
      estoqueInicialDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerEstoqueInicial(estoqueInicialDto: EstoqueInicialDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsIni}`, estoqueInicialDto, AppUtils.OPTIONS_OBJECTO);
  }
  deleteEstoqueInicial(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEsIni}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS ESTIMATIVA DOS CUSTOS FIXOS OPERACIONAIS MENSAIS --------------------------------------------
  getEstimativaDosCFOM(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsCFM}`, AppUtils.OPTIONS_OBJECTO);
  }
  getEstimativaDosCFOMById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEsCFM}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateEstimativaDosCFOM(estimativaDosCustosFixosMensaisDto: EstimativaDosCustosFixosMensaisDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsCFM}/${estimativaDosCustosFixosMensaisDto.id}`,
      estimativaDosCustosFixosMensaisDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerEstimativaDosCFOM(estimativaDosCustosFixosMensaisDto: EstimativaDosCustosFixosMensaisDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlEsCFM}`, estimativaDosCustosFixosMensaisDto, AppUtils.OPTIONS_OBJECTO);
  }
  deleteEstimativaDosCFOM(idPlano: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlEsCFM}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  // ---------------- SERVIÇOS REFERENTES AOS INVESTIMENTOS PRÉ-OPERACIONAIS ------------------------------------------------------
  getInvestimentosPO(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIPO}`, AppUtils.OPTIONS_OBJECTO);
  }
  getInvestimentosPOById(idPlano: string, id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlIPO}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }
  updateInvestimentosPO(investimentosPreOperacionaisDto: InvestimentosPreOperacionaisDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIPO}/${investimentosPreOperacionaisDto.id}`,
    investimentosPreOperacionaisDto, AppUtils.OPTIONS_OBJECTO);
  }
  registerInvestimentosPO(investimentosPreOperacionaisDto: InvestimentosPreOperacionaisDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlIPO}`, investimentosPreOperacionaisDto, AppUtils.OPTIONS_OBJECTO);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

// ---------------- SERVIÇOS REFERENTES AOS CUSTOS UNITÁRIOS ------------------------------------------------------------------------------
getCustoUnitario(id: string): Observable<any> {
  return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlCU}`, AppUtils.OPTIONS_OBJECTO);
}
getCustoUnitarioById(idPlano: string, id: string): Observable<any> {
  return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlCU}/${id}`, AppUtils.OPTIONS_OBJECTO);
}
updateCustoUnitario(custoUnitarioDto: CustoUnitarioDto, id: string): Observable<any> {
  return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlCU}/${custoUnitarioDto.id}`,
  custoUnitarioDto, AppUtils.OPTIONS_OBJECTO);
}
registerCustoUnitario(custoUnitarioDto: CustoUnitarioDto, id: string): Observable<any> {
  return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlCU}`, custoUnitarioDto, AppUtils.OPTIONS_OBJECTO);
}
deleteCustoUnitario(idPlano: string, id: string): Observable<any> {
  return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlCU}/${id}`, AppUtils.OPTIONS_OBJECTO);
}
//---------------------------------------------------------------------------------------------------------------------------------------

// ---------------- SERVIÇOS REFERENTES AO FATURAMENTO MENSAL ---------------------------------------------------------------------------
getFaturamentoMensal(id: string): Observable<any> {
  return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlFM}`, AppUtils.OPTIONS_OBJECTO);
}
getFaturamentoMensalById(idPlano: string, id: string): Observable<any> {
  return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlFM}/${id}`, AppUtils.OPTIONS_OBJECTO);
}
updateFaturamentoMensal(faturamentoMensalDto: FaturamentoMensalDto, id: string): Observable<any> {
  return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlFM}/${faturamentoMensalDto.id}`,
  faturamentoMensalDto, AppUtils.OPTIONS_OBJECTO);
}
registerFaturamentoMensal(faturamentoMensalDto: FaturamentoMensalDto, id: string): Observable<any> {
  return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlFM}`, faturamentoMensalDto, AppUtils.OPTIONS_OBJECTO);
}
deleteFaturamentoMensal(idPlano: string, id: string): Observable<any> {
  return this.httpClient.delete<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlFM}/${id}`, AppUtils.OPTIONS_OBJECTO);
}
//---------------------------------------------------------------------------------------------------------------------------------------


  // ---------------- SERVIÇOS REFERENTES A Matriz F.O.F.A --------------------------------------------
  getAnaliseDaMatriz(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}`, AppUtils.OPTIONS_OBJECTO);
  }

  getAnaliseDaMatrizById(idPlano: string, idAnalise: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlAM}/${idAnalise}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateAnaliseDaMatriz(analise: AnaliseDaMatrizDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}/${analise.id}`,
      analise, AppUtils.OPTIONS_OBJECTO);
  }

  registerAnaliseDaMatriz(analise: AnaliseDaMatrizDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAM}`, analise, AppUtils.OPTIONS_OBJECTO);
  }
  //--------------------------------------------------------------------------------------------------------


  // ---------------- SERVIÇOS REFERENTES A ANÁLISE DO PLANO --------------------------------------------
  getAnaliseDoPlano(id: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getAnaliseDoPlanoById(idPlano: string, idAnalise: string): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL2}${idPlano}${this.baseUrlAP}/${idAnalise}`, AppUtils.OPTIONS_OBJECTO);
  }

  updateAnaliseDoPlano(analise: AnaliseDoPlanoDto, id: string): Observable<any> {
    return this.httpClient.put<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}/${analise.id}`,
      analise, AppUtils.OPTIONS_OBJECTO);
  }

  registerAnaliseDoPlano(analise: AnaliseDoPlanoDto, id: string): Observable<any> {
    return this.httpClient.post<any>(`${AppUtils.BASE_URL2}${id}${this.baseUrlAP}`, analise, AppUtils.OPTIONS_OBJECTO);
  }
  //--------------------------------------------------------------------------------------------------------


  getRoleUser(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlR}`, AppUtils.OPTIONS_OBJECTO);
  }

  getPlanos(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlP}`, AppUtils.OPTIONS_OBJECTO);
  }

  getRole(roles: Array<any>) {
    let role: any;
    if (this.isAuthenticated() && roles) {
      if (roles.length > 0) {
        roles.forEach(r => {
          role = r.name;
        });
      }
      return role;
    }
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  deletePlano(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrlP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }

  getPlanosById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlP}/${id}`, AppUtils.OPTIONS_OBJECTO);
  }


  updateUser(user: UserDto): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${user.id}`, user, AppUtils.OPTIONS_OBJECTO);
  }

  updatePlano(plano: PlanoDto): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrlP}/${plano.id}`, plano, AppUtils.OPTIONS_OBJECTO);
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(`${AppUtils.BASE_URL}` + 'api/logout', AppUtils.OPTIONS_OBJECTO);
  }
}
