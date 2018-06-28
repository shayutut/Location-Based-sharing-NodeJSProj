import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../Models/event-model';

@Component({
  selector: 'app-component-create-event',
  templateUrl: './component-create-event.component.html',
  styleUrls: ['./component-create-event.component.css']
})
export class ComponentCreateEventComponent implements OnInit {
  title = 'Create Event';
  eventModel: EventModel;
  constructor() {
    this.eventModel = new EventModel();
  }

   creatEvent() {
     console.log(this.eventModel);
   }

  ngOnInit() {

  }
}
