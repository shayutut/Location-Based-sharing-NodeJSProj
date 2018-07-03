import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-location',
  templateUrl: './component-location.component.html',
  styleUrls: ['./component-location.component.css']
})
export class ComponentLocationComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor() { }

  ngOnInit() {
  }

}
