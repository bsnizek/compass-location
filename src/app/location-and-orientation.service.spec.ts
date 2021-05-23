import { TestBed } from '@angular/core/testing';

import { LocationAndOrientationService } from './location-and-orientation.service';

describe('LocationAndOrientationService', () => {
  let service: LocationAndOrientationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAndOrientationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
