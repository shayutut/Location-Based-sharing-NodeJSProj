import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentEventsComponent } from './component-events.component';

describe('ComponentEventsComponent', () => {
  let component: ComponentEventsComponent;
  let fixture: ComponentFixture<ComponentEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
