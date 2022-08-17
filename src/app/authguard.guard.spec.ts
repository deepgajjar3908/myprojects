import { TestBed } from '@angular/core/testing';

import { authguard } from './authguard.guard';

describe('AuthguardGuard', () => {
  let guard: authguard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authguard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
