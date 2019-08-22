import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnaliseDoPlanoDto } from 'src/app/core/model/models-do-plano/model-conclusao/AnaliseDoPlanoDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  analiseDoPlano :  AnaliseDoPlanoDto[];
  private idPlano : any;

  recebeTitulo = 'Empreendedorize';

  panelOpenState = false;

  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService
    ) {}

    ngOnInit() {
      //----------- PEGA ID DA URL DA ROTA PAI -----------
      this.idPlano = this.route.snapshot.paramMap.get('id');
      //--------------------------------------------------
      console.log("Abaixo está o id do plano",this.idPlano)

      //----------- Setar análises -----------------------------------------------
      this.apiService.getAnaliseDoPlano(this.idPlano).subscribe(analiseDoPlano => {
        this.analiseDoPlano = analiseDoPlano;
      }, error => {
        this.messageService.showError('Lista de análise','Falha ao carregar análise do plano!');
      });
      //---------------------------------------------------------------------------------------
    }

    pegaID(){
      
    }

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
