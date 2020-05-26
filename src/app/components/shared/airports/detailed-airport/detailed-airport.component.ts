import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AirportsService } from 'src/app/services/airports.service';
import { FlightService } from 'src/app/services/flight.service';
import { FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import {NgbDateStruct,  NgbModal, ModalDismissReasons, NgbDate, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { AircraftService } from 'src/app/services/aircraft.service';
import { IFlight } from 'src/app/models/flight.model';
import {Location} from '@angular/common';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';

@Component({
  selector: 'app-detailed-airport',
  templateUrl: './detailed-airport.component.html',
  styleUrls: ['./detailed-airport.component.scss']
})
export class DetailedAirportComponent implements OnInit {

  airportID: number;
  
  specificAirport: any = {};
  
  allAircrafts: any = [];
  flights: any = [];
  
  model: NgbDateStruct;
  model2: NgbDateStruct;
  time: NgbTimeStruct;
  time2: NgbTimeStruct;
  
  newFlightDataObject: IFlight;
  newFlightRecord: FormGroup;
  
  id: string;
  closeResult:string = '';
  
  successAddingFlight: boolean = false;
  successDeletingFlight: boolean = false;
  loader: boolean = false;
  errorAddingFlight: boolean = false;
  formInvalid: boolean = false;
  uniqueFlightNumber: boolean = false;
  readbool: boolean = false;
  flightToDelete: string;

  constructor(private route: ActivatedRoute,
    private readonly _airportsService: AirportsService,
    private readonly _flightService: FlightService,
    private readonly _aircraftService: AircraftService,
    private _fb: FormBuilder,
    private modalService: NgbModal,
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
        if (this.id == item.airport.id) {
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
      },4500)
    }).catch((err)=>{
      console.log(err);
    })
  }

  submitData(fg: FormGroup){
    if(fg.valid){
      this.loader = true;
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
        this.uniqueFlightNumber = false;
        this.loader = false;
        fg.reset();
        this.getAllFlights();
      }).catch((err)=>{
        if(err['error'].flightNumber == fg.controls.flightNumberFormControl.value){
          this.uniqueFlightNumber = true;
          this.loader = false;
        }
        
        this.errorAddingFlight = true;
        setTimeout(()=>{
          this.errorAddingFlight = false;
        },300)
      })
    }else{
      this.formInvalid = true;
    }  
  }
  
  deleteFlightFirstStep(flightID, content){
    this.flightToDelete = flightID;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  async deleteFlight(){
    await this._flightService.deleteFlight(this.flightToDelete).toPromise().then((res)=>{
      this.successAddingFlight = false;
      this.successDeletingFlight = true;
      this.modalService.dismissAll();
      this.getAllFlights();
      setTimeout(() => {
        this.loader = false;
      }, 250);
      setTimeout(()=>{
        this.successDeletingFlight = false;
      },4500)
    }).catch((err)=>{
      console.log(err);
    })
  }

  ngbDate: any;
  ngbTime: any;
  editSpecificFlight(flight: IFlight){
    this.readbool = true;
    var departureDateTime = flight.departureDateTime.split("T");
    var departureDate = departureDateTime[0];
    var departureTime = departureDateTime[1];
    const [year, month, day] = departureDate.split('-');
    const [hour, minute, second] = departureTime.split(':');
    const obj = { year: parseInt(year), month: parseInt(month), day: 
      parseInt(day.split(' ')[0].trim()) };
    
    const objtime = {hour: parseInt(hour), minute: parseInt(minute), second: parseInt(second.substr(0, 3))}

    this.ngbDate = new NgbDate(obj.year, obj.month, obj.day);
    this.time = objtime;
    this.newFlightRecord.patchValue({
      flightNumberFormControl: flight.flightNumber,
      departureDateFormControl: this.ngbDate,
        departureTimeFormControl: this.time,
        toWhereFormControl: flight.toWhere,
        aircraftFormControl: flight.aircraft['id']
    })
  }

  dismissDeletion(){
    this.modalService.dismissAll();
  }
  
  goBack(){
    this._location.back();
  }

}
