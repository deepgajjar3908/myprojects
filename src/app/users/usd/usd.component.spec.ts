import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdComponent } from './usd.component';

describe('UsdComponent', () => {
  let component: UsdComponent;
  let fixture: ComponentFixture<UsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
