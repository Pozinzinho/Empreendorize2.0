import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.css']
})
export class GerarRelatorioComponent implements OnInit {


  planos: PlanoDto[];

  fileName: string = "meuRelatorio.pdf";

  private idPlano : any;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {

    this.ngxLoader.start();
    //----------- PEGA ID DA URL DA ROTA -----------
    this.idPlano = this.route.snapshot.paramMap.get('id');
    //--------------------------------------------------

    console.log("id plano", this.idPlano);

    this.gerarRelatorio();
  }

  public gerarRelatorio(){
    this.apiService.getPdf(this.idPlano).subscribe((data) => {
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "meuPlano.pdf";
      link.click();
      this.router.navigate(['gerenciarplano']);
      this.ngxLoader.stop();
    });
  }

}
