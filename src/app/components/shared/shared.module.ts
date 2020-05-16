import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ListAirportsComponent } from './airports/list-airports/list-airports.component';
import { AirportComponent } from './airports/airport/airport.component';
import { DetailedAirportComponent } from './airports/detailed-airport/detailed-airport.component';



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ListAirportsComponent,
    AirportComponent,
    DetailedAirportComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    ListAirportsComponent,
    AirportComponent,
    DetailedAirportComponent
  ]
})
export class SharedModule { }
