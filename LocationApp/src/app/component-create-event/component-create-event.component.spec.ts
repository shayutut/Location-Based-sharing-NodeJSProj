import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCreateEventComponent } from './component-create-event.component';

describe('ComponentCreateEventComponent', () => {
  let component: ComponentCreateEventComponent;
  let fixture: ComponentFixture<ComponentCreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentCreateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
