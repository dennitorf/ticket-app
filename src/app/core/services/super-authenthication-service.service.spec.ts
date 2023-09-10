import { TestBed } from '@angular/core/testing';

import { SuperAuthenthicationServiceService } from './super-authenthication-service.service';

describe('SuperAuthenthicationServiceService', () => {
  let service: SuperAuthenthicationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAuthenthicationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
