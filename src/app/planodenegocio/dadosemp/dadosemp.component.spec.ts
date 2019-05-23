import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosempComponent } from './dadosemp.component';

describe('DadosempComponent', () => {
  let component: DadosempComponent;
  let fixture: ComponentFixture<DadosempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
