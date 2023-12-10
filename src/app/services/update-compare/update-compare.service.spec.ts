import { TestBed } from '@angular/core/testing';

import { UpdateCompareService } from './update-compare.service';

describe('UpdateCompareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCompareService = TestBed.get(UpdateCompareService);
    expect(service).toBeTruthy();
  });
});
