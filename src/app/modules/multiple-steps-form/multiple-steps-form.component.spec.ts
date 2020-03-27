import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleStepsFormComponent } from './multiple-steps-form.component';

describe('MultipleStepsFormComponent', () => {
  let component: MultipleStepsFormComponent;
  let fixture: ComponentFixture<MultipleStepsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleStepsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleStepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
