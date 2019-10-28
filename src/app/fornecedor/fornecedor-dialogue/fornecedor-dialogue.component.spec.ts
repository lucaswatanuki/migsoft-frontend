import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorDialogueComponent } from './fornecedor-dialogue.component';

describe('FornecedorDialogueComponent', () => {
  let component: FornecedorDialogueComponent;
  let fixture: ComponentFixture<FornecedorDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
