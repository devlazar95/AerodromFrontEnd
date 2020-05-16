import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { ApiService } from './api.service';
@Injectable()
export class AirportsService {

    constructor(private readonly _httpClient: HttpClient, private _apiService: ApiService) { }
  
    getAllAirports(): Observable<any>{
      return this._apiService.get('api/airports');
    }

    getAirportById(id:number): Observable<any>{
      return this._apiService.getById('api/airport',id);
    }
  }