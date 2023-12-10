import { TestBed } from '@angular/core/testing';

import { UploadZipService } from './upload-zip.service';

describe('UploadZipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadZipService = TestBed.get(UploadZipService);
    expect(service).toBeTruthy();
  });
});
