import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoStartTimeplanComponent } from './auto-start-timeplan.component';

describe('AutoStartTimeplanComponent', () => {
  let component: AutoStartTimeplanComponent;
  let fixture: ComponentFixture<AutoStartTimeplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoStartTimeplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoStartTimeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
