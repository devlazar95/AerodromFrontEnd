import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ListAirportsComponent } from './components/shared/airports/list-airports/list-airports.component';
import { AirportComponent } from './components/shared/airports/airport/airport.component';
import { DetailedAirportComponent } from './components/shared/airports/detailed-airport/detailed-airport.component';
import { FlightsComponent } from './components/shared/flights/flights.component';
import { PassengersComponent } from './components/shared/passengers/passengers.component';
import { ListPassengersComponent } from './components/shared/list-passengers/list-passengers.component';
import { ModifyPassengerComponent } from './components/shared/modify-passenger/modify-passenger.component';
import { ListPeopleComponent } from './components/shared/list-people/list-people.component';
import { ListAirplanesComponent } from './components/shared/airplanes/list-airplanes/list-airplanes.component';


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
  },
  {
    path: "tickets",
    component: ListPassengersComponent
  },
  {
    path: "modify-passengers",
    component: ModifyPassengerComponent
  },
  {
    path: "passengers",
    component: ListPeopleComponent
  },
  {
    path: "airplanes",
    component: ListAirplanesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
