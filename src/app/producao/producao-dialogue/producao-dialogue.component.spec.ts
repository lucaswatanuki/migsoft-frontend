import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoDialogueComponent } from './producao-dialogue.component';

describe('ProducaoDialogueComponent', () => {
  let component: ProducaoDialogueComponent;
  let fixture: ComponentFixture<ProducaoDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducaoDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducaoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
