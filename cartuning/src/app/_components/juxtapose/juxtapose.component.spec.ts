import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuxtaposeComponent } from './juxtapose.component';

describe('JuxtaposeComponent', () => {
  let component: JuxtaposeComponent;
  let fixture: ComponentFixture<JuxtaposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuxtaposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuxtaposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
