import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoDialogueComponent } from './cotacao-dialogue.component';

describe('CotacaoDialogueComponent', () => {
  let component: CotacaoDialogueComponent;
  let fixture: ComponentFixture<CotacaoDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacaoDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
