import { TestBed } from '@angular/core/testing';

import { DateFormateService } from './date-formate.service';

describe('DateFormateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateFormateService = TestBed.get(DateFormateService);
    expect(service).toBeTruthy();
  });
});
