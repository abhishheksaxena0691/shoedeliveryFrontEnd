import { TestBed } from '@angular/core/testing';

import { ApiLinkService } from './api-link.service';

describe('ApiLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLinkService = TestBed.get(ApiLinkService);
    expect(service).toBeTruthy();
  });
});
