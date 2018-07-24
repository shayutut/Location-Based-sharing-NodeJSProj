import { Component, OnInit, OnDestroy, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { EventModel, locationModel } from '../../Models/event-model';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { filterQueryId } from '@angular/core/src/view/util';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventsServiceService } from '../events-service.service';
import { AuthService } from '../auth/auth.service';
import { AppModule } from '../app.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-component-create-event',
  templateUrl: './component-create-event.component.html',
  styleUrls: ['./component-create-event.component.css']
})
export class ComponentCreateEventComponent implements OnInit, OnDestroy {
  @Input() updateEvent: EventModel;
  title = 'Create Event';
  public eventModel: EventModel = new EventModel(null);
  public events: EventModel[];
  form: FormGroup;

  profileSubscription: Subscription;
  userProfile: any;

  constructor(public authService: AuthService, public eventsServiceService: EventsServiceService, public fb: FormBuilder) {
    this.eventModel.location = new locationModel;
    this.eventModel.subscribers = [];
    this.events = [];
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'date': new FormControl(null, { validators: [Validators.required] }),
      'file': new FormControl(null, { validators: [Validators.nullValidator] }),
      'genre': new FormControl(null, { validators: [Validators.required] }),
      'description': new FormControl(null, { validators: [Validators.required] }),
    })
  }
  ngOnInit() {
    if (this.updateEvent)
      this.eventModel = this.updateEvent;
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
  }
  ngOnChanges(changes: SimpleChanges) {
    this.eventModel = changes.updateEvent.currentValue;
    // const name: SimpleChange = changes.name;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    // this._name = name.currentValue.toUpperCase();
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  }

  reciveLocation(loc) {
    this.eventModel.location.lat = loc.lat;
    this.eventModel.location.lng = loc.lng;
  }

  onCreatEvent(form) {
    this.eventModel.title = form.value.title;
    this.eventModel.date = form.value.date;
    this.eventModel.genre = form.value.genre;
    this.eventModel.description = form.value.description;
    this.eventModel.publisher = { 'email': this.userProfile.email, 'name': this.userProfile.name };
    this.events.push(this.eventModel);
    console.log(this.eventModel);
    if (this.updateEvent) {
      this.eventsServiceService.UpdateEvent(this.eventModel);
    } else {
      this.eventsServiceService.SendEvent(this.eventModel);
    }
    location.reload();
  }


  omImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.eventModel.image = reader.result;
      }
    }
  }
  onSubmit({ value, valid }) {
    console.log(value);
  }
}

