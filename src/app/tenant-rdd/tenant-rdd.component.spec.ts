import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRDDComponent } from './tenant-rdd.component';

describe('TenantRDDComponent', () => {
  let component: TenantRDDComponent;
  let fixture: ComponentFixture<TenantRDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantRDDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantRDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
