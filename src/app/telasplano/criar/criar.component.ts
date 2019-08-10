import { Component, OnInit } from '@angular/core';
import { PlanoDto } from 'src/app/core/model/model-plano/planoDto';
import { ApiService } from 'src/app/core/api.service';
import { MessageService } from 'src/app/core/message.service';
import { Router } from '@angular/router';
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

  constructor(
    private apiService: ApiService, 
    private router:Router,
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
      this.router.navigate(['/planodenegocio']);
    }, error => {
      this.messageService.showError('Cadastro de plano', 'Falha ao cadastrar Plano de Negócios!');
    });
  }

}
