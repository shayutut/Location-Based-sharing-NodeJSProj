import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Location Map';
  // profileSubscription: Subscription;
  // public userProfile: any;

  constructor(public authService: AuthService) { }

  // ngOnInit() {
  //   this.profileSubscription = this.authService.GetProfileObservable()
  //     .subscribe(profile => {
  //       if (profile) {
  //         this.userProfile = profile;
  //         console.log(profile);
  //       } else {
  //         this.userProfile = null;
  //       }
  //     })
  // }

  // ngOnDestroy() {
  //   if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  // }
}


