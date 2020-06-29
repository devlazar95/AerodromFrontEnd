import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpResponse, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { ApiService } from './api.service';
import { ITicket } from '../models/ticket.model';
@Injectable()
export class TicketService {

    constructor(private readonly _httpClient: HttpClient, private _apiService: ApiService) { }
  
    getAllTickets(){
      return this._apiService.get('api/tickets');
    }

    saveNewTicket(ticketDataObject: ITicket){
        return this._apiService.post('api/tickets/', ticketDataObject);
    }

    deleteTicket(tickettID: string){
      return this._apiService.delete('api/tickets', tickettID);
    }
   
  }