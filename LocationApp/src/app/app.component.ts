import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Location Map';


  constructor(public authService: AuthService) {
    // authService.handleLoginCallback();
    // authService.scheduleRenewal();
  }

}


