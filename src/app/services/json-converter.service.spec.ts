import { TestBed, inject } from '@angular/core/testing';

import { JsonCntService } from './json-cnt.service';

describe('JsonCntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonCntService]
    });
  });

  it('should ...', inject([JsonCntService], (service: JsonCntService) => {
    expect(service).toBeTruthy();
  }));
});
