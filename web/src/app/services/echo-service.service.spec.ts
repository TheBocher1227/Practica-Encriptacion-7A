import { TestBed } from '@angular/core/testing';

import { EchoServiceService } from './echo-service.service';

describe('EchoServiceService', () => {
  let service: EchoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
