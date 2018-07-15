import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../Models/event-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventsServiceService } from '../events-service.service';
import { marker } from '../../Models/marker';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit {
  public allEvents: marker[] = [];
  public radius: number;

  constructor(private http: HttpClient, public eventsServiceService: EventsServiceService) { }

  ngOnInit() {
    this.eventsServiceService.GetAllEvents()
      .then(data => {
        if (data) {
          this.allEvents = this.eventsToMarkers(data);
        }
      })
  }
  changeRadius(value) {
    this.radius = value.target.valueAsNumber;
  }
  //ToDo extentions
  eventsToMarkers(data: EventModel[]): marker[] {
    let markers: marker[] = [];
    data.forEach(element => {
      markers.push({
        event: element,
        lat: element.location.lat,
        lng: element.location.lng,
        draggable: false,
      })
    });
    return markers;
  }
}
