import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirportsService } from 'src/app/services/airports.service';
import {Location} from '@angular/common';
import { ITicket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { IFlight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import { IPassenger } from 'src/app/models/passengers.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss']
})
export class PassengersComponent implements OnInit {

  airportID: number;
  flightNumber: string;
  newPassengerRecord: FormGroup;
  ticketFormGroup: FormGroup;
  addPassengers: boolean = false;
  specificAirport: any = {};
  ticketNumber: string = '';
  newTicket: ITicket;
  newPassenger: IPassenger;
  successAddingPassenger: boolean = false;
  successDeletingPassenger: boolean = false;
  errorAddingPassenger: boolean = false;
  currentFlight: IFlight;
  allTickets: ITicket;
  formInvalid: boolean = false;

  constructor(private route: ActivatedRoute,
    private _location: Location,
    private readonly _airportsService: AirportsService,
    private _passengerService: PassengerService,
    private _ticketService: TicketService,
    private _flightService: FlightService,
    private _fb: FormBuilder) {
    this.newPassengerRecord = this._fb.group({
      passengerName: ['', Validators.required],
      passengerLastName: ['', Validators.required],
      ticketNumber: ['', Validators.required],
      seatNumber: ['', Validators.required],
      gateNumber: ['', Validators.required]
    })
    this.ticketFormGroup = this._fb.group({
      name: [''],
      flightNumber: [''],
      gateNumber: [''],
      seatNumber: [''],
      boardinTime: [''],
      flightNumberSlipo: [''],
      seatNumberSlip: [''],
      nameSlip: ['']
    })
  }

  
  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('airportID')) {
      this.airportID = parseInt(this.route.snapshot.queryParamMap.get('airportID'));
    }
    if (this.route.snapshot.queryParamMap.get('flightID')) {
      this.flightNumber = this.route.snapshot.queryParamMap.get('flightID');
      this.getSpecificFlight(this.flightNumber);
    }
    if (this.route.snapshot.queryParamMap.get('addPassengers')) {
      if (this.route.snapshot.queryParamMap.get('addPassengers') == 'true') {
        this.addPassengers = true;
      } else {
        this.addPassengers = false;
      }
    }

    if (this.route.snapshot.queryParamMap.get('airportID')){
      this.getAirportWithID(this.airportID);
    }
    this.ticketFormGroup.controls.flightNumber.setValue(this.flightNumber);
    this.ticketFormGroup.controls.flightNumberSlipo.setValue(this.flightNumber);

    this.newPassengerRecord.valueChanges.subscribe(x => {
      this.ticketNumber = x.ticketNumber;
      this.ticketFormGroup.controls.name.setValue(x.passengerName +' '+    x.passengerLastName);
      this.ticketFormGroup.controls.nameSlip.setValue(x.passengerName +' '+ x.passengerLastName);
      this.ticketFormGroup.controls.seatNumber.setValue(x.seatNumber);
      this.ticketFormGroup.controls.seatNumberSlip.setValue(x.seatNumber);
      this.ticketFormGroup.controls.gateNumber.setValue(x.gateNumber);
    })
    this.getAllTickets();

  }
  
  async submitData(fg: FormGroup){
    if(fg.valid){
      this.newPassenger = {
        name: fg.controls.passengerName.value +' '+ fg.controls.passengerLastName.value
      }
      await this._passengerService.saveNewPassenger(this.newPassenger).toPromise().then((res)=>{
        this.successAddingPassenger = true;
        debugger
        this.submitTickeetData(res, fg, this.newPassenger);
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      this.formInvalid  = true;
    }
  }

  async submitTickeetData(res: any, fg: FormGroup, newPassenger){
    this.newTicket = {
      number: fg.controls.ticketNumber.value,
      passenger: res.id,
      seatNum: fg.controls.seatNumber.value,
      gateNum: parseInt(fg.controls.gateNumber.value),
      flight: this.currentFlight.flightNumber
    }
    await this._ticketService.saveNewTicket(this.newTicket).toPromise().then((res)=>{
      this.getAllTickets();
      fg.reset();
    }).catch((err)=>{
      debugger
    });
  }

  async getAllTickets(){
    this.allTickets = await this._ticketService.getAllTickets().toPromise();
  }

  async getSpecificFlight(flightID: string){
    await this._flightService.getFlightByID(this.flightNumber).toPromise().then((res)=>{
      this.currentFlight = {
        flightNumber: this.flightNumber,
        departureDateTime: res.departureDateTime,
        arrivalDateTime: res.rarivalDateTime,
        toWhere: res.toWhere,
        airport: res.airport.id,
        aircraft: res.aircraft.id
      }
    }).catch((err)=>{

    });
  }

  goBack(){
    this._location.back();
  }

  async getAirportWithID(airportID: number) {
    await this._airportsService.getAirportById(this.airportID).toPromise().then((res) => {
      this.specificAirport = res;
      console.log(this.specificAirport);
    }).catch((err) => {
      console.log(err);
    });
  }

}
