import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLocationComponent } from './component-location.component';

describe('ComponentLocationComponent', () => {
  let component: ComponentLocationComponent;
  let fixture: ComponentFixture<ComponentLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
