import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexCompareComponent } from './forex-compare.component';

describe('ForexCompareComponent', () => {
  let component: ForexCompareComponent;
  let fixture: ComponentFixture<ForexCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
