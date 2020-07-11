import { Component, OnInit } from '@angular/core';
import { AircraftService } from 'src/app/services/aircraft.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-airplanes',
  templateUrl: './list-airplanes.component.html',
  styleUrls: ['./list-airplanes.component.scss']
})
export class ListAirplanesComponent implements OnInit {

  allAirplanes: any = [];
  loader: boolean = false;

  constructor(private _aircraftService: AircraftService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllAirplanes();
  }

  async getAllAirplanes(){
  this.spinner.show();
    await this._aircraftService.getAllAircrafts().toPromise().then((res)=>{
      this.allAirplanes =res;
      setTimeout(()=>{
        this.spinner.hide();
      this.loader = false;
    },250);
   }).catch((err)=>{
     console.log(err);
   }); 
  }

}
