import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


import { faCar, faMicrochip, faTachometerAlt, faCalendarCheck, faTools, faChartLine, faStar, 
         faExclamationCircle, faCheckCircle, faArrowCircleRight, faQuoteLeft, faQuoteRight, faDumbbell } from '@fortawesome/free-solid-svg-icons'

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
  faCheckCircle = faCheckCircle;
  faQuoteLeft = faQuoteLeft;
  faQuoteRight = faQuoteRight;
  faArrowRight = faArrowCircleRight;
  faDumbbell = faDumbbell;

  constructor() { }

  ngOnInit(): void {
 
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    smartSpeed: 800,
    autoplayTimeout: 5000,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  }

}
