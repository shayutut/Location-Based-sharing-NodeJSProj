import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventModel, location } from '../../Models/event-model';
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
  ngOnDestroy(): void {
    if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  }

  title = 'Create Event';
  eventModel: EventModel = new EventModel(null);
  public events: EventModel[];
  form: FormGroup;

  profileSubscription: Subscription;
  userProfile: any;

  constructor(public authService: AuthService, public eventsServiceService: EventsServiceService, public fb: FormBuilder) {
    this.eventModel.location = new location;
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
    this.profileSubscription = this.authService.GetProfileObservable()
      .subscribe(profile => {
        if (profile) {
          this.userProfile = profile;
          console.log(profile);
        } else {
          this.userProfile = null;
        }
      })
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
    this.eventModel.publisher = this.userProfile;
    this.events.push(this.eventModel);
    console.log(this.eventModel);
    // this.eventModel.image = null;
    this.eventsServiceService.SendEvent(this.eventModel);
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

