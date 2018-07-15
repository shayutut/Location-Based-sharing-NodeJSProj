import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventModel } from '../Models/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {

  constructor(private http: HttpClient) { }

  SendEvent(eventModel) {
    //im not usinf the formdata yet...
    // const eventData=new FormData();
    // eventData.append("title",eventModel.title);
    // eventData.append("date",eventModel.date);
    // eventData.append("genre",eventModel.genre);
    // eventData.append("location",eventModel.location);
    // eventData.append("publisher",eventModel.publisher);
    // eventData.append("image",eventModel.image);
    // eventData.append("description",eventModel.description);

    // let headers = new HttpHeaders();
    // headers.set("Content-Type", "application/json");, { headers: headers }
      this.http.post('http://localhost:3000/addEvent', eventModel).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log("Error occured-post-event");
      });
  }

  GetAllEvents(): Promise<EventModel[]> {
    return new Promise(res=>{
      this.http.get('http://localhost:3000/allEvents').subscribe(data => {
        console.log(data);
        res(data as EventModel[])
      });
    })
    
  }
}
