import { TestBed } from '@angular/core/testing';

import { VendaService } from './venda.service';

describe('VendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendaService = TestBed.get(VendaService);
    expect(service).toBeTruthy();
  });
});
