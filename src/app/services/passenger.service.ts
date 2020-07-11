import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { ApiService } from './api.service';
import { ITicket } from '../models/ticket.model';
import { IPassenger } from '../models/passengers.model';
@Injectable()
export class PassengerService {

    constructor(private readonly _httpClient: HttpClient, private _apiService: ApiService) { }
  
    getAllPassengers(){
      return this._apiService.get('api/tickets');
    }

    getPassengers(){
      return this._apiService.get('api/passengers');
    }

    saveNewPassenger(passengerDataObject: IPassenger){
        return this._apiService.post('api/passengers/', passengerDataObject);
    }

    deletePassenger(passengertID: any){
      return this._apiService.delete('api/passengers', passengertID);
    }
   
  }