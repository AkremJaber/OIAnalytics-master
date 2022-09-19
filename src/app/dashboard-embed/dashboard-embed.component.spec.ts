import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmbedComponent } from './dashboard-embed.component';

describe('DashboardEmbedComponent', () => {
  let component: DashboardEmbedComponent;
  let fixture: ComponentFixture<DashboardEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmbedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
