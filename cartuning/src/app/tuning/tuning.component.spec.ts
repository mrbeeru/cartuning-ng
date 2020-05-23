import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuningComponent } from './tuning.component';

describe('TuningComponent', () => {
  let component: TuningComponent;
  let fixture: ComponentFixture<TuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
