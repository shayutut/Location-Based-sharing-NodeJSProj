import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { EventModel } from '../../Models/event-model';
import { } from '@types/googlemaps';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { marker } from '../../Models/marker';

@Component({
  selector: 'app-component-location',
  templateUrl: './component-location.component.html',
  styleUrls: ['./component-location.component.css']
})
export class ComponentLocationComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @Output() locationEvent = new EventEmitter<any>();
  @Input() events: marker[] = [];
  @Input() radiusValue: number = 5000;
  public searchControl: FormControl;
  lat: number = 32.109333;
  lng: number = 34.855499;
  locationChosen = false;
  zoom: number = 7;
  //show: boolean = false;


  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    // this.findMe();
    // if (this.events) this.show=true;
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
  }

  //   onChoseLocation(event) {
  //   console.log(event);
  //   this.lat = event.coords.lat;
  //   this.lng = event.coords.lng;
  //   this.locationChosen = true;
  //   this.locationEvent.emit({ lat: this.lat,
  //     lng: this.lng});
  // }
  clickedMarker(label, index) {
    console.log(`clicked the marker: ${label || index}`)
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

  showPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
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

  mapClicked($event) {
    let loc = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };
    this.events.push(loc);
    this.locationEvent.emit(loc);
    console.log(loc);
  }

}


