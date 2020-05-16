import { Component, OnInit, HostListener } from '@angular/core';
import { AirportsService } from 'src/app/services/airports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'list-airports',
  templateUrl: './list-airports.component.html',
  styleUrls: ['./list-airports.component.scss']
})
export class ListAirportsComponent implements OnInit {

  allAirports: any;
  showButton: boolean = false;
  loader: boolean = false;
  constructor(private readonly _airportsService: AirportsService, private _router: Router) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.loader = true;
     await this._airportsService.getAllAirports().toPromise().then((res)=>{
       this.allAirports = res;
       setTimeout(()=>{
        this.loader = false;
      },250);
    });
    console.dir(this.allAirports);
  }

  goToAirport(id){
    this._router.navigate(["airport/"], {
      queryParams: { airportID: id }
    });
  }

}
