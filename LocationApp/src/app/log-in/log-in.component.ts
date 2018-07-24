import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  profileSubscription: Subscription;
  userProfile: any;

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
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

  ngOnDestroy() {
    if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  }
}
