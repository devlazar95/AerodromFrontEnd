import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ListAirportsComponent } from './airports/list-airports/list-airports.component';
import { AirportComponent } from './airports/airport/airport.component';
import { DetailedAirportComponent } from './airports/detailed-airport/detailed-airport.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlightsComponent } from './flights/flights.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PassengersComponent } from './passengers/passengers.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModifyPassengerComponent } from './modify-passenger/modify-passenger.component';
import { ListPassengersComponent } from './list-passengers/list-passengers.component';
import { ListPeopleComponent } from './list-people/list-people.component';
import { ListAirplanesComponent } from './airplanes/list-airplanes/list-airplanes.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    ListAirportsComponent,
    AirportComponent,
    DetailedAirportComponent,
    FlightsComponent,
    PassengersComponent,
    ModifyPassengerComponent,
    ListPassengersComponent,
    ListPeopleComponent,
    ListAirplanesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateModule,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'sr'
    })
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    ListAirportsComponent,
    AirportComponent,
    DetailedAirportComponent,
    FlightsComponent,
    PassengersComponent,
  ]
})
export class SharedModule { }
