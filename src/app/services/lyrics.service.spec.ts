import { TestBed } from '@angular/core/testing';

import { LyricsService } from './lyrics.service';

describe('LyricsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LyricsService = TestBed.get(LyricsService);
    expect(service).toBeTruthy();
  });
});
