// auth.service.ts
import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';
import { Profile } from 'selenium-webdriver/firefox';
// import { of } from 'rxjs';
// import { timer } from 'rxjs';
// import { map } from "rxjs/operators";
(window as any).global = window;

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: 'rMtV0gLFSniVEzEGdi1BMfAFaNjW11tR',
    domain: 'shayutut.auth0.com',
    responseType: 'token',
    redirectUri: 'https://location-6e87e.firebaseapp.com/callback',
    audience: 'http://localhost:3001',
    scope: 'openid profile email'
  });
  // Store authentication data
  // timer = timer(2000,1000);
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean;
  // refreshSubscription: any;

  private subject = new BehaviorSubject<any>(this.userProfile);

  constructor(private userService: UserService) {
    // auth0.handleAuthentication();
  }

  GetProfileObservable() {
    return this.subject.asObservable();
  }

  // GetUserProfile() {
  //   if (this.userProfile)
  //     return this.userProfile;
  // }

  //   public scheduleRenewal() {
  //     if (!this.isLoggedIn()) { return; }
  //     this.unscheduleRenewal();

  //     const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

  //     const expiresIn$ = of(expiresAt).pipe(
  //       map(
  //         expiresAt => {
  //           const now = Date.now();
  //           // Use timer to track delay until expiration
  //           // to run the refresh at the proper time
  //           return timer(Math.max(1, expiresAt - now));
  //         }
  //       )
  //     );
  //  // Once the delay time from above is
  //     // reached, get a new JWT and schedule
  //     // additional refreshes
  //     this.refreshSubscription = expiresIn$.subscribe(
  //       () => {
  //         this.getAccessToken();
  //         this.scheduleRenewal();
  //       }
  //     );
  //   }

  // public unscheduleRenewal() {
  //   if (this.refreshSubscription) {
  //     this.refreshSubscription.unsubscribe();
  //   }
  // }


  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
       //  this.router.navigate(['/']);
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
    this.subject.next(profile);
    this.userService.FindUserByMail(profile);
    localStorage.setItem('currentUser', JSON.stringify(profile));
    // localStorage.setItem('expires_at',JSON.stringify(this.expiresAt));
    // this.scheduleRenewal();
  }

  logout() {
    // debugger;
    localStorage.removeItem('currentUser');
    // localStorage.removeItem('expires_at');
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.expiresAt = 0;
    this.auth0.logout({
      returnTo: 'https://location-6e87e.firebaseapp.com',   
      clientID: 'rMtV0gLFSniVEzEGdi1BMfAFaNjW11tR'
    });
    this.subject.next(null);
    // this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    //|| localStorage.getItem('currentUser')
    // if (Profile )
    //   return true;
    // else return false;
    // return true;
    return Date.now() < this.expiresAt && this.authenticated;
  }

}