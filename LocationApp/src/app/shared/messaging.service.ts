import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { take } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessagingService implements OnInit{
    ngOnInit(): void {
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

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
  profileSubscription: Subscription;
  userProfile: any;
  
  constructor(
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
private authService:AuthService) { }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(() => {
      const data = new Object;
      data[this.userProfile] = token
      this.afDB.object('fcmTokens/').update(data)
    })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission() {
      debugger;
    this.messaging.requestPermission()
      .then(() => {
        console.log('notification permission granted.');
        return firebase.messaging().getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  /**
   * hook method when new notification received
   */
  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload)
    });
  }
}