import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandEditComponent } from './car-brand-edit.component';

describe('CarBrandEditComponent', () => {
  let component: CarBrandEditComponent;
  let fixture: ComponentFixture<CarBrandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarBrandEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
