import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexSingleUnitComponent } from './forex-single-unit.component';

describe('ForexSingleUnitComponent', () => {
  let component: ForexSingleUnitComponent;
  let fixture: ComponentFixture<ForexSingleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexSingleUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexSingleUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
