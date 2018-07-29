import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventModel } from '../Models/event-model';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient,private notificationservice:NotificationService) { }

  SendEvent(eventModel) {
    this.http.post('http://localhost:3000/addEvent', eventModel).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log("Error occured-post-event " + err);
      });
  }

  GetAllEvents(): Promise<EventModel[]> {
    return new Promise(res => {
      this.http.get('http://localhost:3000/allEvents').subscribe(data => {
        console.log(data);
        res(data as EventModel[])
      });
    })
  }

  subscribeToEvent(user, event) {
    this.notificationservice.sendNewsletter(user);
    return new Promise(res => {
      this.http.post('http://localhost:3000/subscribeToEvent', { 'user': user, 'event': event }).subscribe(data => {
        console.log(data);
        res(data)
      });
    })
  }

  GetEventsByUser(user): Promise<EventModel[]> {
    return new Promise(res => {
      this.http.post('http://localhost:3000/getEventsByUser', user).subscribe(data => {
        console.log(data);
        res(data as EventModel[])
      });
    })
  }

  DeleteEvent(event) {
    return new Promise(res => {
      this.http.post('http://localhost:3000/DeleteEvent', event).subscribe(data => {
        console.log(data);
        res(data);
      });
    })
  }

  UpdateEvent(event) {
    return new Promise(res => {
      this.http.post('http://localhost:3000/UpdateEvent', event).subscribe(data => {
        console.log(data);
        res(data);
      });
    })
  }
}
