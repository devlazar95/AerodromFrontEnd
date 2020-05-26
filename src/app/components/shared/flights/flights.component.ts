import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  loader: boolean = false;
  allFlights: any = {};
  constructor(private readonly _flightService: FlightService, private _router: Router) { }

  ngOnInit() {
    this.init();
  }

  async init(){
    this.loader = true;
    await this._flightService.getFlights().toPromise().then((res)=>{
      this.allFlights = res;
      console.log(this.allFlights); 
      setTimeout(()=>{
        this.loader = false;
      },250);
    }).catch((err)=>{
      console.log(err);
    });
  }

  goToSpecificAirport(airportId: number){
    this._router.navigate(["airport/"], {
      queryParams: { airportID: airportId }
    });
  }

}
