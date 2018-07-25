import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MessagingService } from './shared/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'My Location Map';

  message;


  constructor(private authService: AuthService,private messagingService: MessagingService) {
    // authService.handleLoginCallback();
    // authService.scheduleRenewal();
  }

  ngOnInit() {
    // const userId = 'user001';
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

}


