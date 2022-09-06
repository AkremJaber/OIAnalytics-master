import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsHasPersonsComponent } from './tenants-has-persons.component';

describe('TenantsHasPersonsComponent', () => {
  let component: TenantsHasPersonsComponent;
  let fixture: ComponentFixture<TenantsHasPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsHasPersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantsHasPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
