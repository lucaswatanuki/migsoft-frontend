import { TestBed } from '@angular/core/testing';

import { OrcamentoService } from './orcamento.service';

describe('OrcamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrcamentoService = TestBed.get(OrcamentoService);
    expect(service).toBeTruthy();
  });
});
