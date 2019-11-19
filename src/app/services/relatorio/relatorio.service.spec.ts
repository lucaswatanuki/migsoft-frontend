import { TestBed } from '@angular/core/testing';

import { RelatorioService } from './relatorio.service';

describe('RelatorioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelatorioService = TestBed.get(RelatorioService);
    expect(service).toBeTruthy();
  });
});
