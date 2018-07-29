import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'My Location Map';
  readonly VAPID_PUBLIC_KEY ="BEI0Gi-vvZjw5tVZKeXNNOjHPMlQ_nF3_vgD_p8yyntVK51mo1ayG1zaJntWvCMkm-EcSWlXlkHwUPZM3in_05w";
  
  
  constructor(private authService: AuthService,  
    // private swPush: SwPush,
   // private newsletterService: NewsletterService
  ) {
      // authService.handleLoginCallback();
      // authService.scheduleRenewal();
    }
    
    // ngOnInit(): void {
    //   if (this.swUpdate.isEnabled) {
  
    //     this.swUpdate.available.subscribe(() => {
  
    //         if(confirm("New version available. Load New Version?")) {
  
    //             window.location.reload();
    //         }
    //     });
    // }   
    //   this.subscribeToNotifications();
    // }

  
//   subscribeToNotifications() {

//     this.swPush.requestSubscription({
//         serverPublicKey: this.VAPID_PUBLIC_KEY
//     })
//     .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
//     .catch(err => console.error("Could not subscribe to notifications", err));
// }
}


