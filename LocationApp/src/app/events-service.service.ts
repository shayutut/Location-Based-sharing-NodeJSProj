import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventModel } from '../Models/event-model';
import { NotificationService } from '../notification.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService implements OnInit {

  ngOnInit(): void {
      this.serverURL = 'https://pure-mountain-65179.herokuapp.com/';
    }

  serverURL: string

  constructor(private http: HttpClient, private notificationservice: NotificationService) { }

  SendEvent(eventModel) {
    this.http.post(this.serverURL + 'addEvent', eventModel).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log("Error occured-post-event " + err);
      });
  }

  GetAllEvents(): Promise<EventModel[]> {
    return new Promise(res => {
      this.http.get(this.serverURL + 'allEvents').subscribe(data => {
        console.log(data);
        res(data as EventModel[])
      });
    })
  }

  subscribeToEvent(user, event) {
    this.notificationservice.sendNewsletter(user);
    return new Promise(res => {
      this.http.post(this.serverURL+'subscribeToEvent', { 'user': user, 'event': event }).subscribe(data => {
        console.log(data);
        res(data)
      });
    })
  }

  GetEventsByUser(user): Promise<EventModel[]> {
    return new Promise(res => {
      this.http.post(this.serverURL + 'getEventsByUser', user).subscribe(data => {
        console.log(data);
        res(data as EventModel[])
      });
    })
  }

  DeleteEvent(event) {
    return new Promise(res => {
      this.http.post(this.serverURL+'DeleteEvent', event).subscribe(data => {
        console.log(data);
        res(data);
      });
    })
  }

  UpdateEvent(event) {
    return new Promise(res => {
      this.http.post(this.serverURL+'UpdateEvent', event).subscribe(data => {
        console.log(data);
        res(data);
      });
    })
  }
}
