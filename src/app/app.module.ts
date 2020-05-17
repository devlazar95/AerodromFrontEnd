import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from './components/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { AirportsService } from './services/airports.service';
import { FlightService } from './services/flight.service';
import { AircraftService } from './services/aircraft.service';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [ApiService, AirportsService, FlightService, AircraftService],
  bootstrap: [AppComponent]
})
export class AppModule { }
