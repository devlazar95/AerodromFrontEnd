import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListAirportsComponent } from './components/shared/airports/list-airports/list-airports.component';
import { AirportComponent } from './components/shared/airports/airport/airport.component';
import { DetailedAirportComponent } from './components/shared/airports/detailed-airport/detailed-airport.component';
import { FlightsComponent } from './components/shared/flights/flights.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: 'full'
      
  },
  {
    path: "welcome", component: LandingPageComponent
  },
  {
    path: "airports",
    component: AirportComponent
  },
  {
    path: "airport",
    component: DetailedAirportComponent
  },
  {
    path: "flights",
    component: FlightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
