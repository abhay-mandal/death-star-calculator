import { TestBed } from '@angular/core/testing';

import { RoutingServicesService } from './routing-services.service';

describe('RoutingServicesService', () => {
  let service: RoutingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
