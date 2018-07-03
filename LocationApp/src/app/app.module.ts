import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ComponentCreateEventComponent } from './component-create-event/component-create-event.component';
import { ComponentEventsComponent } from './component-create-event/component-events/component-events.component';
import { ComponentLocationComponent } from './component-location/component-location.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';

@NgModule({
  declarations: [
    AppComponent,
    ComponentCreateEventComponent,
    ComponentEventsComponent,
    ComponentLocationComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,
    FormsModule,AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIX4oDo6cwyhBTNBTHjw_brHERJAQUrs8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
