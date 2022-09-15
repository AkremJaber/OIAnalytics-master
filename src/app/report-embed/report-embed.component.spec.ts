import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmbedComponent } from './report-embed.component';

describe('ReportEmbedComponent', () => {
  let component: ReportEmbedComponent;
  let fixture: ComponentFixture<ReportEmbedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEmbedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
