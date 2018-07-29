import { Injectable, OnChanges, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = "BEI0Gi-vvZjw5tVZKeXNNOjHPMlQ_nF3_vgD_p8yyntVK51mo1ayG1zaJntWvCMkm-EcSWlXlkHwUPZM3in_05w";
  sub: PushSubscription;
  constructor(private swPush: SwPush, private http: HttpClient) { }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {

        this.sub = sub;

        debugger;
        console.log("Notification Subscription: ", sub);

        this.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err => console.log('Could not send subscription object to server, reason: ', err)
        );

      })
      .catch(err => console.error("Could not subscribe to notifications", err));

  }


  sendNewsletter(user) {


    console.log("Sending Newsletter to all Subscribers ...");

    this.send(user).subscribe();
  }

  addPushSubscriber(sub: any) {
    return this.http.post('http://localhost:3000/addPushSubscriber', sub);
  }

  send(user) {
    console.log(user.name)
    return this.http.post('http://localhost:3000/sendNewsletter', user);
  }

}
