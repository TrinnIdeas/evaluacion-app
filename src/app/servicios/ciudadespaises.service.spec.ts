import { TestBed } from '@angular/core/testing';

import { CiudadespaisesService } from './ciudadespaises.service';

describe('CiudadespaisesService', () => {
  let service: CiudadespaisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadespaisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
