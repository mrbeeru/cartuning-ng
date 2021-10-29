import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuningEditDialogComponent } from './tuning-edit-dialog.component';

describe('TuningEditDialogComponent', () => {
  let component: TuningEditDialogComponent;
  let fixture: ComponentFixture<TuningEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuningEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuningEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
