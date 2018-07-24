import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { EventModel } from '../../Models/event-model';
import { } from '@types/googlemaps';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { marker } from '../../Models/marker';
import { Subscription } from 'rxjs';
import { RadiusService } from '../radius.service';

@Component({
  selector: 'app-component-location',
  templateUrl: './component-location.component.html',
  styleUrls: ['./component-location.component.css']
})
export class ComponentLocationComponent implements OnInit,OnDestroy {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @Output() locationEvent = new EventEmitter<any>();
  @Output() SubscriptionEvent = new EventEmitter<any>();
  @Input() events: marker[] = [];
  @Input() radiusValue: number = 5000;
  radiusSubscription: Subscription;
  originalEvents: marker[];
  public searchControl: FormControl;
  lat: number = 32.109333;
  lng: number = 34.855499;
  locationChosen = false;
  zoom: number = 7;
  //show: boolean = false;
  
  
  constructor(private radiusService: RadiusService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }
    
    ngOnInit() {
      this.searchControl = new FormControl();
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.events.push({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              draggable: false
            });
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 13;
            this.locationEvent.emit({
              lat: this.lat,
              lng: this.lng
            });
          });
        });
      });
      
      this.radiusSubscription = this.radiusService.getRadiusObservable().subscribe(value=>{
        this.changeTheRadius(value);
      });
    }
    
    ngOnDestroy(): void {
      this.radiusSubscription.unsubscribe();
    }

    clickedMarker(label, index) {
      console.log(`clicked the marker: ${label || index}`)
    }
    
    subscribeToEvent(m) {
      this.SubscriptionEvent.emit(m);
    }
    
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  changeTheRadius(value) {
    if(!this.originalEvents)
    this.originalEvents = this.events;
    this.radiusValue=value;
    this.findMe();
    this.mapsAPILoader.load().then(() => {
      const center = new google.maps.LatLng(this.lat, this.lng);
      this.events = this.originalEvents.filter(m => {
        const markerLoc = new google.maps.LatLng(m.lat, m.lng);
        const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center);
        if (distanceInKm < value) {
          return m;
        }
      });
    });
  }

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    if(!this.events)
    this.events.push({
      lat: this.lat,
      lng: this.lng,
      draggable: false,
      label: 'got you!'
    });
    this.zoom = 11;
    this.locationEvent.emit({
      lat: this.lat,
      lng: this.lng
    });
  }

  mapClicked($event) {
    let loc = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };
    // if(!this.events)
    this.events.push(loc);

    this.locationEvent.emit(loc);
    console.log(loc);
  }

}

// addAllEvents() {
  //   this.events.forEach(element => {
    //     this.addMarker(element);
    //   });
    // }

    // addMarker(m: marker) {
      //   this.markers.push(m);
      // var marker = new google.maps.Marker({});
      // marker.
      //}

      //   onChoseLocation(event) {
      //   console.log(event);
      //   this.lat = event.coords.lat;
      //   this.lng = event.coords.lng;
      //   this.locationChosen = true;
      //   this.locationEvent.emit({ lat: this.lat,
      //     lng: this.lng});
      // }

