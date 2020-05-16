import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirportsService } from 'src/app/services/airports.service';

@Component({
  selector: 'app-detailed-airport',
  templateUrl: './detailed-airport.component.html',
  styleUrls: ['./detailed-airport.component.scss']
})
export class DetailedAirportComponent implements OnInit {

  id: string;
  airportID: number;
  specificAirport: any = {};
  loader: boolean = false;
  constructor(private route: ActivatedRoute,
    private readonly _airportsService: AirportsService) { }

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get('airportID')){
      this.id = this.route.snapshot.queryParamMap.get('airportID');
      this.airportID = parseInt(this.id);
      this.init();
    }
  }


  async init(){
    this.loader = true;
    await this._airportsService.getAirportById(this.airportID).toPromise().then((res)=>{
      this.specificAirport = res;
      setTimeout(()=>{
        this.loader = false;
      },250);
    }).catch((err)=>{
      console.log(err);
    });
    console.log(this.specificAirport);
  }

}
