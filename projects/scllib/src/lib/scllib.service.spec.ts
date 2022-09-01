import { TestBed } from '@angular/core/testing';

import { ScllibService } from './scllib.service';

describe('ScllibService', () => {
  let service: ScllibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScllibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
