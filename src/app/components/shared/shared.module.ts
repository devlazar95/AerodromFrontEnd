import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ListAirportsComponent } from './airports/list-airports/list-airports.component';
import { AirportComponent } from './airports/airport/airport.component';
import { DetailedAirportComponent } from './airports/detailed-airport/detailed-airport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ListAirportsComponent,
    AirportComponent,
    DetailedAirportComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
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
