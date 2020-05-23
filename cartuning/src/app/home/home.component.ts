import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { faCar, faMicrochip, faTachometerAlt, faCalendarCheck, faTools, faChartLine, faStar, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  faCar = faCar;
  faMicrochip = faMicrochip;
  faTachometerAlt = faTachometerAlt;
  faCalendarCheck = faCalendarCheck;
  faTools = faTools;
  faChartLine = faChartLine;
  faStar = faStar;
  faExclamationCircle = faExclamationCircle;
  
  constructor() { }

  ngOnInit(): void {
 
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
