import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ComponentCreateEventComponent } from './component-create-event/component-create-event.component';
import { ComponentLocationComponent } from './component-location/component-location.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { CallbackComponent } from './callback/callback.component';
import { ShowEventsComponent } from './show-events/show-events.component';
import { APP_ROOT } from '@angular/core/src/di/scope';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NotificationService } from '../notification.service';

@NgModule({
  declarations: [
    AppComponent,
    ComponentCreateEventComponent,
    ComponentLocationComponent,
    CallbackComponent,
    ShowEventsComponent,
    LogInComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AgmCoreModule.forRoot({ apiKey: 'AIzaSyDIX4oDo6cwyhBTNBTHjw_brHERJAQUrs8' ,libraries: ["places","geometry"]}), 
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCtYIoCMJs7fvKYh0PXLKmeUS1a_MwkHHY', libraries: ["places", "geometry"] }),
    // RouterModule.forRoot([
    //   { path: 'creatEvent', component: ComponentCreateEventComponent },
    //   { path: 'showEvents', component: ShowEventsComponent },
    //   { path: 'callback', component: CallbackComponent },
    //   // {
    //   //   canActivate: [
    //   //     AuthGuard
    //   //   ]
    //   // }
    // ]),
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService,NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
