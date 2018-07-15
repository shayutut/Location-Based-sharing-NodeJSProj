// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ComponentCreateEventComponent } from './component-create-event/component-create-event.component';
import { AuthGuard } from './auth/auth.guard';
import { ShowEventsComponent } from './show-events/show-events.component';

const routes: Routes = [
    { path: '', component: ComponentCreateEventComponent },
    { path: 'creatEvent', component: ComponentCreateEventComponent },
    { path: 'showEvents', component: ShowEventsComponent },
    { path: 'callback', component: CallbackComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }