import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirportsService } from 'src/app/services/airports.service';
import { FlightService } from 'src/app/services/flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { AircraftService } from 'src/app/services/aircraft.service';
import { IFlight } from 'src/app/models/flight.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detailed-airport',
  templateUrl: './detailed-airport.component.html',
  styleUrls: ['./detailed-airport.component.scss']
})
export class DetailedAirportComponent implements OnInit {

  id: string;
  airportID: number;
  specificAirport: any = {};
  allAircrafts: any = [];
  flights: any = [];
  loader: boolean = false;
  model: NgbDateStruct;
  model2: NgbDateStruct;
  time: NgbTimeStruct;
  time2: NgbTimeStruct;
  newFlightDataObject: IFlight;
  newFlightRecord: FormGroup;
  successAddingFlight: boolean = false;
  errorAddingFlight: boolean = false;
  formInvalid: boolean = false;
  constructor(private route: ActivatedRoute,
    private readonly _airportsService: AirportsService,
    private readonly _flightService: FlightService,
    private readonly _aircraftService: AircraftService,
    private _fb: FormBuilder,
    private _location: Location) {
      this.newFlightRecord = this._fb.group({
        flightNumberFormControl: ['', Validators.required],
        departureDateFormControl: ['', Validators.required],
        departureTimeFormControl: ['', Validators.required],
        arrivalDateFormControl: ['', Validators.required],
        arrivalTimeFormControl: ['', Validators.required],
        toWhereFormControl: ['',Validators.required],
        aircraftFormControl: ['',Validators.required],
      })
  }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('airportID')) {
      this.id = this.route.snapshot.queryParamMap.get('airportID');
      this.airportID = parseInt(this.id);
      this.init();
    }
  }

  init() {
    this.loader = true;
    this.getAirportWithID();
  }

  async getAirportWithID(){
    await this._airportsService.getAirportById(this.airportID).toPromise().then((res) => {
      this.specificAirport = res;
      this.getAllFlights();
    }).catch((err) => {
      console.log(err);
    });
  }

  async getAllFlights(){
   this.flights = [];
    await this._flightService.getFlights().toPromise().then((res) => {
      res.forEach((item) => {
        if (this.id == item.airport) {
          this.flights.push(item);
        }
      });
      this.getAircrafts();
    });
  }

  async getAircrafts(){
    await this._aircraftService.getAllAircrafts().toPromise().then((res)=>{
      this.allAircrafts = res;
      setTimeout(() => {
        this.loader = false;
      }, 250);
      setTimeout(()=>{
        this.successAddingFlight = false;
      },2000)
    }).catch((err)=>{
      console.log(err);
    })
  }

  submitData(fg: FormGroup){
    if(fg.valid){
      this.formInvalid = false;
      var dateDep = fg.controls.departureDateFormControl.value['year'].toString()+'-'+fg.controls.departureDateFormControl.value['month'].toString()+'-'+fg.controls.departureDateFormControl.value['day'].toString();
      var timeDep = 'T'+fg.controls.departureTimeFormControl.value['hour']+':'+fg.controls.departureTimeFormControl.value['minute']+':'+fg.controls.departureTimeFormControl.value['second'];
      var dateTimeDep = dateDep+timeDep;
      var dateArr = fg.controls.arrivalDateFormControl.value['year'].toString()+'-'+fg.controls.arrivalDateFormControl.value['month'].toString()+'-'+fg.controls.arrivalDateFormControl.value['day'].toString();
      var timeArr = 'T'+fg.controls.arrivalTimeFormControl.value['hour']+':'+fg.controls.arrivalTimeFormControl.value['minute']+':'+fg.controls.arrivalTimeFormControl.value['second'];
      var dateTimeArr = dateArr+timeArr;
      this.newFlightDataObject = {
        flightNumber: fg.controls.flightNumberFormControl.value,
        departureDateTime: dateTimeDep,
        arrivalDateTime: dateTimeArr,
        toWhere: fg.controls.toWhereFormControl.value,
        airport: this.airportID,
        aircraft: parseInt(fg.controls.aircraftFormControl.value)
      }
      this._flightService.saveNewFlight(this.newFlightDataObject).toPromise().then((res)=>{
        this.successAddingFlight = true;
        this.getAllFlights();
      }).catch((err)=>{
        this.errorAddingFlight = true;
        setTimeout(()=>{
          this.errorAddingFlight = false;
        },300)
      })
    }else{
      this.formInvalid = true;
    }  
  }

  goBack(){
    this._location.back();
  }

}
