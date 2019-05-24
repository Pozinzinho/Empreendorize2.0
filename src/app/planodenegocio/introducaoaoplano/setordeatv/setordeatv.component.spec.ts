import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetordeatvComponent } from './setordeatv.component';

describe('SetordeatvComponent', () => {
  let component: SetordeatvComponent;
  let fixture: ComponentFixture<SetordeatvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetordeatvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetordeatvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
