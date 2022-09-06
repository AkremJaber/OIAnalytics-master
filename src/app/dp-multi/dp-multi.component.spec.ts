import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpMultiComponent } from './dp-multi.component';

describe('DpMultiComponent', () => {
  let component: DpMultiComponent;
  let fixture: ComponentFixture<DpMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
