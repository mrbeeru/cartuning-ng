import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambletextComponent } from './scrambletext.component';

describe('ScrambletextComponent', () => {
  let component: ScrambletextComponent;
  let fixture: ComponentFixture<ScrambletextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrambletextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrambletextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
