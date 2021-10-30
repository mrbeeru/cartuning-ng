import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEngineEditComponent } from './car-engine-edit.component';

describe('CarEngineEditComponent', () => {
  let component: CarEngineEditComponent;
  let fixture: ComponentFixture<CarEngineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarEngineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEngineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
