import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-location',
  templateUrl: './component-location.component.html',
  styleUrls: ['./component-location.component.css']
})
export class ComponentLocationComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  locationChosen=false;
  zoom: number = 8;
  constructor() { }

  onChoseLocation(event) {
    console.log(event);
    this.lat= event.coords.lat;
    this.lng= event.coords.lng;
    this.locationChosen=true;
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  ngOnInit() {
  }
  markers: marker[] = [];
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

