import { Component, OnInit, HostListener } from '@angular/core';
import { AirportsService } from 'src/app/services/airports.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'list-airports',
  templateUrl: './list-airports.component.html',
  styleUrls: ['./list-airports.component.scss']
})
export class ListAirportsComponent implements OnInit {

  allAirports: any;
  showButton: boolean = false;
  loader: boolean = false;
  constructor(private readonly _airportsService: AirportsService, private _router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.onActivate(); 
    this.init();
  }

  onActivate() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  async init() {
    this.loader = true;
    this.spinner.show();
     await this._airportsService.getAllAirports().toPromise().then((res)=>{
       this.allAirports = res;
       setTimeout(()=>{
         this.spinner.hide();
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
