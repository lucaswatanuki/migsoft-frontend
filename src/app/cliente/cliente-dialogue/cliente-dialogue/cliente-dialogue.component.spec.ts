import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDialogueComponent } from './cliente-dialogue.component';

describe('ClienteDialogueComponent', () => {
  let component: ClienteDialogueComponent;
  let fixture: ComponentFixture<ClienteDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
