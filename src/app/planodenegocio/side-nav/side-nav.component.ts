import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnaliseDoPlanoDto } from 'src/app/core/model/models-do-plano/model-conclusao/AnaliseDoPlanoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { AnaliseDaMatrizDto } from 'src/app/core/model/models-do-plano/model-analiseDaMatriz/analiseDaMatrizDto';
import { IntroducaoAoPlanoDto } from 'src/app/core/model/models-do-plano/model-introducao-plano/introducaoAoPlanoDto';
import { EstudoDosClientesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosClientesDto';
import { EstudoDosFornecedoresDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosFornecedoresDto';
import { EstudoDosConcorrentesDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoDosConcorrentesDto';
import { EstudoProprioDto } from 'src/app/core/model/models-do-plano/model-estudo-mercado/EstudoProprioDto';
import { EstrategiasPromocionaisDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/EstrategiasPromocionaisDto';
import { EstruturaDeComercializacaoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/EstruturaDeComercializacaoDto';
import { LocalizacaoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/LocalizacaoDto';
import { PrecoDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/PrecoDto';
import { ProdutosServicosDto } from 'src/app/core/model/models-do-plano/model-plano-de-marketing/ProdutosServicosDto';
import { InvestimentosFixosDto } from 'src/app/core/model/models-do-plano/model-plano-financeiro/InvestimentosFixosDto';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  
  private idPlano : any;
  recebeTitulo = 'Empreendedorize';
  panelOpenState = false;

  public introducao = new  IntroducaoAoPlanoDto();
  introducaoAoPlano :  IntroducaoAoPlanoDto[];
  idIntroducao: string;

  public clientes = new  EstudoDosClientesDto();
  estudoDosClientes :  EstudoDosClientesDto[];
  idClientes: string;

  public fornecedores = new  EstudoDosFornecedoresDto();
  estudoDosFornecedores :  EstudoDosFornecedoresDto[];
  idFornecedores: string;

  public concorrentes = new  EstudoDosConcorrentesDto();
  estudoDosConcorrentes :  EstudoDosConcorrentesDto[];
  idConcorrentes: string;

  public promocionais = new  EstrategiasPromocionaisDto();
  estrategiaPromocionais :  EstrategiasPromocionaisDto[];
  idPromocionais: string;

  public comercializacao = new  EstruturaDeComercializacaoDto();
  estruturaDeComercializacao :  EstruturaDeComercializacaoDto[];
  idComercializacao: string;

  public localizacao = new  LocalizacaoDto();
  localizacaoMatriz :  LocalizacaoDto[];
  idLocalizacao: string;

  public preco = new  PrecoDto();
  precoMatriz :  PrecoDto[];
  idPreco: string;

  public produtos = new  ProdutosServicosDto();
  produtosServicos :  ProdutosServicosDto[];
  idProdutos: string;

  public investimentosF = new  InvestimentosFixosDto();
  investimentosFixos :  InvestimentosFixosDto[];
  idInvestimentosF: string;

  public fofa = new  AnaliseDaMatrizDto();
  analiseDaMatriz :  AnaliseDaMatrizDto[];
  idFofa: string;

  public analise = new  AnaliseDoPlanoDto();
  analiseDoPlano :  AnaliseDoPlanoDto[];
  idAnalise: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
    ) {}

    ngOnInit() {
      //----------- PEGA ID DA URL DA ROTA PAI -----------
      this.idPlano = this.route.snapshot.paramMap.get('id');
      //--------------------------------------------------
      console.log("Abaixo está o id do plano",this.idPlano)

    
      
      this.pegarIdIntroducao();

      this.pegarIdClientes();
      this.pegarIdConcorrentes();
      this.pegarIdFornecedores();

      this.pegarIdPromocional();
      this.pegarIdComercializacao();
      this.pegarIdLocalizacao();
      this.pegarIdPromocional();
      this.pegarIdProdutosServicos();

      this.pegarIdInvestimentosFixos();

      this.pegarIdMatriz();

      this.pegarIdAnalise();
    }

 //----------- Pegar e setar id da Introdução -----------------------------------------------------
 pegarIdIntroducao() {
  this.apiService.getIntroducaoPlano(this.idPlano).subscribe(introducaoAoPlano => {
    this.introducaoAoPlano = introducaoAoPlano;
    this.idIntroducao = introducaoAoPlano[0].id;
    console.log("Abaixo está o id da introdução", this.idIntroducao);
    this.iniciaIntroducao();
  }, error => {
  });
}

iniciaIntroducao(){
  this.apiService.getIntroducaoPlanoById(this.idPlano, this.idIntroducao).subscribe(introducao => {
    this.introducao = introducao;
    console.log('Retornou introdução com sucesso! ', this.introducao);
  }, error => {
    console.log('Error ao capturar introdução por ID! ', error);
  });
}
//----------------------------------------------------------------------------------------------------

 //----------- Pegar e setar id do estudo dos clientes -----------------------------------------------
 pegarIdClientes() {
  this.apiService.getEstudoDosClientes(this.idPlano).subscribe(estudoDosClientes => {
    this.estudoDosClientes = estudoDosClientes;
    this.idClientes = estudoDosClientes[0].id;
    console.log("Abaixo está o id dos clientes", this.idClientes);
    this.iniciaClientes();
  }, error => {
  });
}

iniciaClientes(){
  this.apiService.getEstudoDosClientesById(this.idPlano, this.idClientes).subscribe(clientes => {
    this.clientes = clientes;
    console.log('Retornou clientes com sucesso! ', this.clientes);
  }, error => {
    console.log('Error ao capturar clientes por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id do estudo dos concorrentes -----------------------------------------------
pegarIdConcorrentes() {
  this.apiService.getEstudoDosConcorrentes(this.idPlano).subscribe(estudoDosConcorrentes => {
    this.estudoDosConcorrentes = estudoDosConcorrentes;
    this.idConcorrentes = estudoDosConcorrentes[0].id;
    console.log("Abaixo está o id dos Concorrentes", this.idConcorrentes);
    this.iniciaConcorrentes();
  }, error => {
  });
}

iniciaConcorrentes(){
  this.apiService.getEstudoDosConcorrentesById(this.idPlano, this.idConcorrentes).subscribe(concorrentes => {
    this.concorrentes = concorrentes;
    console.log('Retornou concorrentes com sucesso! ', this.concorrentes);
  }, error => {
    console.log('Error ao capturar concorrentes por ID! ', error);
  });
}
//-----------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id do estudo dos fornecedores -------------------------------------------------
pegarIdFornecedores() {
  this.apiService.getEstudoDosFornecedores(this.idPlano).subscribe(estudoDosFornecedores => {
    this.estudoDosFornecedores = estudoDosFornecedores;
    this.idFornecedores = estudoDosFornecedores[0].id;
    console.log("Abaixo está o id dos fornecedores", this.idFornecedores);
    this.iniciaClientes();
  }, error => {
  });
}

iniciaFornecedores(){
  this.apiService.getEstudoDosFornecedoresById(this.idPlano, this.idFornecedores).subscribe( fornecedores => {
    this.fornecedores = fornecedores;
    console.log('Retornou fornecedores com sucesso! ', this.fornecedores);
  }, error => {
    console.log('Error ao capturar fornecedores por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id estrategias promocionais-------------------------------------------------
pegarIdPromocional() {
  this.apiService.getEstrategiasPromocionais(this.idPlano).subscribe(estrategiaPromocionais => {
    this.estrategiaPromocionais = estrategiaPromocionais;
    this.idPromocionais = estrategiaPromocionais[0].id;
    console.log("Abaixo está o id da estratégia promocional", this.idPromocionais);
    this.iniciaEstrategiaPromocional();
  }, error => {
  });
}

iniciaEstrategiaPromocional(){
  this.apiService.getEstrategiasPromocionaisById(this.idPlano, this.idPromocionais).subscribe( promocionais => {
    this.promocionais = promocionais;
    console.log('Retornou a estratégia promocional com sucesso! ', this.promocionais);
  }, error => {
    console.log('Error ao capturar a estratégia promocional por ID! ', error);
  });
}
//--------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id estrutura de comercialização-------------------------------------------------
pegarIdComercializacao() {
  this.apiService.getEstruturaDeComercializacao(this.idPlano).subscribe( estruturaDeComercializacao => {
    this.estruturaDeComercializacao = estruturaDeComercializacao;
    this.idComercializacao = estruturaDeComercializacao[0].id;
    console.log("Abaixo está o id da estrutura de comercialização", this.idComercializacao);
    this.iniciaEstruturaDeComercializacao();
  }, error => {
  });
}

iniciaEstruturaDeComercializacao(){
  this.apiService.getEstruturaDeComercializacaoById(this.idPlano, this.idComercializacao).subscribe( comercializacao => {
    this.comercializacao = comercializacao;
    console.log('Retornou a estrutura de comercialização com sucesso! ', this.comercializacao);
  }, error => {
    console.log('Error ao capturar a estrutura de comercialização por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id localização-------------------------------------------------
pegarIdLocalizacao() {
  this.apiService.getLocalizacao(this.idPlano).subscribe( localizacaoMatriz => {
    this.localizacaoMatriz = localizacaoMatriz;
    this.idLocalizacao = localizacaoMatriz[0].id;
    console.log("Abaixo está o id da localização", this.localizacao);
    this.iniciaLocalizacao();
  }, error => {
  });
}

iniciaLocalizacao(){
  this.apiService.getLocalizacaoById(this.idPlano, this.idLocalizacao).subscribe( localizacao => {
    this.localizacao = localizacao;
    console.log('Retornou a localização com sucesso! ', this.localizacao);
  }, error => {
    console.log('Error ao capturar localização por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id Preco-------------------------------------------------
pegarIdPreco() {
  this.apiService.getPreco(this.idPlano).subscribe( precoMatriz => {
    this.precoMatriz = precoMatriz;
    this.idPreco = precoMatriz[0].id;
    console.log("Abaixo está o id do preco", this.preco);
    this.iniciaPreco();
  }, error => {
  });
}

iniciaPreco(){
  this.apiService.getPrecoById(this.idPlano, this.idPreco).subscribe( preco => {
    this.preco = preco;
    console.log('Retornou o preco com sucesso! ', this.preco);
  }, error => {
    console.log('Error ao capturar preco por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

//----------- Pegar e setar id Produtos e Servicos------------------------------------------------------
pegarIdProdutosServicos() {
  this.apiService.getProdutosServicos(this.idPlano).subscribe( produtosServicos => {
    this.produtosServicos = produtosServicos;
    this.idProdutos = produtosServicos[0].id;
    console.log("Abaixo está o id dos produtos e serviços", this.produtosServicos);
    this.iniciaProdutosEServicos();
  }, error => {
  });
}

iniciaProdutosEServicos(){
  this.apiService.getProdutosServicosById(this.idPlano, this.idProdutos).subscribe( produtos => {
    this.produtos = produtos;
    console.log('Retornou o produtos e serviços com sucesso! ', this.produtos);
  }, error => {
    console.log('Error ao capturar produtos e serviços por ID! ', error);
  });
}
//-------------------------------------------------------------------------------------------------------


//----------- Pegar e setar id dos investimentos fixos-------------------------------------------------
pegarIdInvestimentosFixos() {
  this.apiService.getInvestimentosFixos(this.idPlano).subscribe(investimentosFixos => {
    this.investimentosFixos = investimentosFixos;
    this.idInvestimentosF = investimentosFixos[0].id;
    console.log("Abaixo está o id dos investimentos fixos", this.idInvestimentosF);
    this.iniciaInvestimentosFixos();
  }, error => {
  });
}

iniciaInvestimentosFixos(){
  this.apiService.getInvestimentosFixosById(this.idPlano, this.idInvestimentosF).subscribe( investimentosF => {
    this.investimentosF = investimentosF;
    console.log('Retornou investimentos fixos com sucesso! ', this.investimentosF);
  }, error => {
    console.log('Error ao capturar investimentos fixos por ID! ', error);
  });
}
//------------------------------------------------------------------------------------------------------

  //----------- Pegar e setar id da matriz F.O.F.A -----------------------------------------------
  pegarIdMatriz() {
    this.apiService.getAnaliseDaMatriz(this.idPlano).subscribe(analiseDaMatriz => {
      this.analiseDaMatriz = analiseDaMatriz;
      this.idFofa = analiseDaMatriz[0].id;
      console.log("Abaixo está o id da matriz", this.idFofa)
      this.iniciaMatriz();
    }, error => {
    });
  }

  iniciaMatriz(){
    this.apiService.getAnaliseDaMatrizById(this.idPlano, this.idFofa).subscribe(fofa => {
      this.fofa = fofa;
      console.log('Retornou matriz com sucesso! ', this.fofa);
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }
  //---------------------------------------------------------------------------------------


    //----------- Pegar e Setar id da análise -----------------------------------------------
  pegarIdAnalise() {
    this.apiService.getAnaliseDoPlano(this.idPlano).subscribe(analiseDoPlano => {
      this.analiseDoPlano = analiseDoPlano;
      this.idAnalise = analiseDoPlano[0].id;
      console.log("Abaixo está o id da análise", this.idAnalise)
      this.iniciaAnalise();
    }, error => {
    });
  }
  
  iniciaAnalise() {
    this.apiService.getAnaliseDoPlanoById(this.idPlano, this.idAnalise).subscribe(analise => {
      this.analise = analise;
      console.log('Retornou analise com sucesso! ', this.analise);
    }, error => {
      console.log('Error ao capturar plano por ID! ', error);
    });
  }
    //---------------------------------------------------------------------------------------


   

  // ------------------------------ MAPA DA INTRODUÇÃO --------------------------
  clicouIntroducao(){
    this.recebeTitulo = 'Introdução ao plano';
  }
  clicouIntroducaoME(){
    this.recebeTitulo= 'Introdução ao plano / Missão da Empresa'
  }
  clicouIntroducaoSA(){
    this.recebeTitulo= 'Introdução ao plano / Setores de atividade'
  }
  clicouIntroducaoCS(){
    this.recebeTitulo= 'Introdução ao plano / Capital Social'
  }
  // ------------------------------------------------------------------------------

  //----------------------------- MAPA DO ESTUDO DE MERCADO -----------------------
  clicouEstudoDeMercado(){
    this.recebeTitulo = 'Estudo de mercado';
  }
  clicouEstudoDosClientes(){
    this.recebeTitulo = 'Estudo de mercado / Estudo dos Clientes';
  }
  clicouEstudoDosConcorrentes(){
    this.recebeTitulo = 'Estudo de mercado / Estudo dos Concorrentes';
  }
  clicouEstudoDosFornecedores(){
    this.recebeTitulo = 'Estudo de mercado / Estudo dos Fornecedores';
  }
  //--------------------------------------------------------------------------------

  //----------------------------- MAPA DO PLANO DE MARKETING -----------------------
  clicouPlanoDeMarketing(){
    this.recebeTitulo = 'Plano de Marketing';
  }
  clicouPlanoDeMarketingPS(){
    this.recebeTitulo = 'Plano de Marketing / Produtos e Serviços';
  }
  clicouPlanoDeMarketingP(){
    this.recebeTitulo = 'Estudo de mercado / Preço';
  }
  clicouPlanoDeMarketingEP(){
    this.recebeTitulo = 'Estudo de mercado / Estratégias Promocionais';
  }
  clicouPlanoDeMarketingEC(){
    this.recebeTitulo = 'Estudo de mercado / Estrutura de comercialização';
  }
  clicouPlanoDeMarketingLN(){
    this.recebeTitulo = 'Estudo de mercado / Localização do Negócio';
  }
  //-----------------------------------------------------------------------------------

  //----------------------------- MAPA DO PLANO MONETÁRIO -----------------------
  clicouPlanoMonetario(){
    this.recebeTitulo = 'Plano monetário';
  }
  clicouPlanoMonetarioIF(){
    this.recebeTitulo = 'Plano monetário / Investimentos fixos';
  }
  clicouPlanoMonetarioIPO(){
    this.recebeTitulo = 'Plano monetário / Investimentos Pré-operacionais';
  }
  clicouPlanoMonetarioCG(){
    this.recebeTitulo = 'Plano monetário / Capital de giro';
  }
  clicouPlanoMonetarioCU(){
    this.recebeTitulo = 'Plano monetário / Custo unitário';
  }
  clicouPlanoMonetarioIT(){
    this.recebeTitulo = 'Plano monetário / Investimento Total';
  }
  clicouPlanoMonetarioFM(){
    this.recebeTitulo = 'Plano monetário / Faturamento mensal';
  }
  clicouPlanoMonetarioDR(){
    this.recebeTitulo = 'Plano monetário / Demonstrativo de resultados';
  }
  //--------------------------------------------------------------------------------


  //----------------------------- MAPA ANÁLISE CRÍTICA -----------------------
  clicouAnaliseCritica(){
    this.recebeTitulo = 'Análise crítica';
  }
  clicouAnaliseCriticaF(){
    this.recebeTitulo = 'Análise crítica / Matriz F.O.F.A';
  }
  //--------------------------------------------------------------------------------

   //----------------------------- MAPA CONCLUSÃO -----------------------
   clicouConclusao(){
    this.recebeTitulo = 'Conclusão';
  }
  clicouAnaliseDoPlano(){
    this.recebeTitulo = 'Conclusão / Análise do plano';
  }
  //--------------------------------------------------------------------------------
}
