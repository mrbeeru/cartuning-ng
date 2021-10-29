import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMakeEditComponent } from './car-make-edit.component';

describe('CarMakeEditComponent', () => {
  let component: CarMakeEditComponent;
  let fixture: ComponentFixture<CarMakeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarMakeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMakeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
