import { Component, OnInit, ɵConsole } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list-passengers',
  templateUrl: './list-passengers.component.html',
  styleUrls: ['./list-passengers.component.scss']
})
export class ListPassengersComponent implements OnInit {
  allTickets: any = [];
  constructor(private _ticketService: TicketService) { }

  ngOnInit() {
    this.getAllTickets();
  }

  async getAllTickets(){
    this.allTickets = await this._ticketService.getAllTickets().toPromise();
  }

}
