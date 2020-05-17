import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { ApiService } from './api.service';
import { IFlight } from '../models/flight.model';
@Injectable()
export class FlightService {

    constructor(private readonly _httpClient: HttpClient, private _apiService: ApiService) { }
  
    getFlights(){
      return this._apiService.get('api/flights');
    }

    saveNewFlight(flighDataObject: IFlight){
        return this._apiService.post('api/flights/', flighDataObject);
    }
   
  }