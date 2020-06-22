import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from './components/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { AirportsService } from './services/airports.service';
import { FlightService } from './services/flight.service';
import { AircraftService } from './services/aircraft.service';
import { TranslateModule, TranslateLoader, LangChangeEvent } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomTranslateService } from './services/custom-translate-service.service';
import { CookieService } from 'ngx-cookie-service';
// use this factory function to setRtl in localstorage.
export function setIsRTL(customTranslateService: CustomTranslateService) {
  return () => {
    // if set before, just remove it
    localStorage.removeItem("isRtl");
    customTranslateService.translateService.onLangChange.subscribe(
      (x: LangChangeEvent) => {
        localStorage.removeItem("isRtl");
        localStorage.removeItem("locale");
      }
    );
  };
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
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
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'sr'
    })
  ],
  providers: [ApiService, AirportsService, FlightService, AircraftService, CustomTranslateService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
