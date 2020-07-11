import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.scss']
})
export class ListPeopleComponent implements OnInit {

  allPeople: any = [];
  constructor(private _passengerService: PassengerService, private _router: Router) { }

  ngOnInit() {
    this.getAllPeople();
  }

  async getAllPeople(){
    this.allPeople = await this._passengerService.getAllPassengers().toPromise();
  }

  specificAirport(airportID: any){
    this._router.navigate(["airport/"], {
      queryParams: { airportID: airportID }
    });
  }

}
