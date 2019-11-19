import { Component, OnInit } from '@angular/core';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {
  public plano = new PlanoDto;
  private unsubscribeMessage = new Subject();
  submitted = false;

  private idPlano: any;

  constructor(
    private apiService: ApiService, 
    private router:Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.notfyObservable$.pipe(takeUntil(this.unsubscribeMessage)).subscribe(result =>{
      if(result === true){
        this.submitted = false;
      }
    });
  }

  save(): void {
    this.submitted = true;
    this.apiService.registerPlano(this.plano).subscribe(data => {
      this.messageService.showSuccess('Plano de negócios criado com sucesso!', 
      'Vamos começar seu planejamento!');

      this.router.navigate(['/planodenegocio', data.id]);
    }, error => {
      this.messageService.showError('Cadastro de plano', 'Falha ao cadastrar Plano de Negócios!');
    });
  }

  onSubmit(){
    this.save();
  }

  somenteLetras(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || 
    (charCode > 96 && charCode < 123) ||
    (charCode > 191 && charCode <= 255) ||
    (charCode == 32) ) {
      return true;
    }
    return false;
  }

}
