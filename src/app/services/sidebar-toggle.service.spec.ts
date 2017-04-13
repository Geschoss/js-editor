import { TestBed, inject } from '@angular/core/testing';

import { SidebarToggleService } from './sidebar-toggle.service';

describe('SidebarToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarToggleService]
    });
  });

  it('should ...', inject([SidebarToggleService], (service: SidebarToggleService) => {
    expect(service).toBeTruthy();
  }));
});
