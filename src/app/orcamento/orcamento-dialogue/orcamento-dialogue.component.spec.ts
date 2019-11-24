import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoDialogueComponent } from './orcamento-dialogue.component';

describe('OrcamentoDialogueComponent', () => {
  let component: OrcamentoDialogueComponent;
  let fixture: ComponentFixture<OrcamentoDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
