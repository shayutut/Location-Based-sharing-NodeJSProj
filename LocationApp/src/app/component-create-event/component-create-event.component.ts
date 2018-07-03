import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../Models/event-model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-component-create-event',
  templateUrl: './component-create-event.component.html',
  styleUrls: ['./component-create-event.component.css']
})
export class ComponentCreateEventComponent implements OnInit {
  title = 'Create Event';
  eventModel: EventModel = new EventModel(null);
  public events: EventModel[];
  constructor(private http:HttpClient) {
    this.eventModel;
    this.events = [];
  }

  creatEvent() {
    
    this.events.push(new EventModel(this.eventModel));
    this.http.get('localhost:3000').subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {

  }
}
