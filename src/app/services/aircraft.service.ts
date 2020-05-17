import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { ApiService } from './api.service';
@Injectable()
export class AircraftService {

    constructor(private readonly _httpClient: HttpClient, private _apiService: ApiService) { }
  
    getAllAircrafts(): Observable<any>{
      return this._apiService.get('api/aircrafts');
    }
  }