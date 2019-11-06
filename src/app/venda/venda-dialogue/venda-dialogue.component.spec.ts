import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaDialogueComponent } from './venda-dialogue.component';

describe('VendaDialogueComponent', () => {
  let component: VendaDialogueComponent;
  let fixture: ComponentFixture<VendaDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
