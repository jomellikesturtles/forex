import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexUnitComponent } from './forex-unit.component';

describe('ForexUnitComponent', () => {
  let component: ForexUnitComponent;
  let fixture: ComponentFixture<ForexUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
