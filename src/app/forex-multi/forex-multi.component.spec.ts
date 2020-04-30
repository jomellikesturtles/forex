import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexMultiComponent } from './forex-multi.component';

describe('ForexMultiComponent', () => {
  let component: ForexMultiComponent;
  let fixture: ComponentFixture<ForexMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
