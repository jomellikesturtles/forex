import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexHomeComponent } from './forex-home.component';

describe('ForexHomeComponent', () => {
  let component: ForexHomeComponent;
  let fixture: ComponentFixture<ForexHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
