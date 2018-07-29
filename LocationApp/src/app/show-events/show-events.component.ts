import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EventModel } from '../../Models/event-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventsServiceService } from '../events-service.service';
import { marker } from '../../Models/marker';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ComponentLocationComponent } from '../component-location/component-location.component';
import { RadiusService } from '../radius.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit, OnDestroy {
  @ViewChild('content') public contentModal;

  edittedEvent:EventModel = new EventModel(null);
  show(m) {
    this.edittedEvent={...m};
    this.contentModal.show();
  }

  public allEvents: marker[] = [];
  public radius: number;
  myEvents = [];
  public updateEvent: EventModel;
  profileSubscription: Subscription;
  userProfile: any;


  constructor(private radiusService:RadiusService, private authService: AuthService, private http: HttpClient, private eventsServiceService: EventsServiceService) { }

  ngOnInit() {
    this.profileSubscription = this.authService.GetProfileObservable()
    .subscribe(profile => {
      if (profile) {
        console.log(profile);
        this.userProfile = profile;
      } else if (localStorage.getItem('currentUser')) {
        this.userProfile=JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.userProfile);
      }
      else {
        this.userProfile = null;
      }
    })
    this.eventsServiceService.GetAllEvents()
      .then(data => {
        if (data) {
          this.allEvents = this.eventsToMarkers(data);
        }
      })
    this.eventsServiceService.GetEventsByUser(this.userProfile)
      .then(data => {
        if (data) {
          this.myEvents = data;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  }

  changeRadius(value) {
    this.radius = value.target.valueAsNumber;
  }

  emitRadiusChange(value) {
   this.radiusService.updateRadius(value.target.valueAsNumber)
  }

  DeleteEvent(m) {
    this.eventsServiceService.DeleteEvent(m);
    location.reload();
  }

  subscribeToEvent(m) {
    this.eventsServiceService.subscribeToEvent(this.userProfile, m);
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
