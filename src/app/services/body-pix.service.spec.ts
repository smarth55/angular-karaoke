import { TestBed } from '@angular/core/testing';

import { BodyPixService } from './body-pix.service';

describe('BodyPixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BodyPixService = TestBed.get(BodyPixService);
    expect(service).toBeTruthy();
  });
});
