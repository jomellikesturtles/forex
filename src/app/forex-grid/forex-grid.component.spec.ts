import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexGridComponent } from './forex-grid.component';

describe('ForexGridComponent', () => {
  let component: ForexGridComponent;
  let fixture: ComponentFixture<ForexGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
