import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDialogueComponent } from './pedido-dialogue.component';

describe('PedidoDialogueComponent', () => {
  let component: PedidoDialogueComponent;
  let fixture: ComponentFixture<PedidoDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
