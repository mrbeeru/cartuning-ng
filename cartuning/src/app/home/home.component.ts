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

  brandCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    smartSpeed: 300,
    autoplayTimeout: 10000,
    navText: ['<', '>'],
    responsive: {
      1400: {
        items: 8
      },
      800: {
        items: 6
      }
    },
    nav: false
  }


carLogoPaths = ['../../assets/car-brands/alfaromeo_logo_thumbnail.png' ,
'../../assets/car-brands/audi_logo_thumbnail.png' ,
'../../assets/car-brands/bmw_logo_thumbnail.png' ,
'../../assets/car-brands/citroen_logo_thumbnail.png' ,
'../../assets/car-brands/dacia_logo_thumbnail.png' ,
'../../assets/car-brands/fiat_logo_thumbnail.png' ,
'../../assets/car-brands/ford_logo_thumbnail.png' ,
'../../assets/car-brands/lexus_logo_thumbnail.png' ,
'../../assets/car-brands/mazda_logo_thumbnail.png' ,
'../../assets/car-brands/mercedes_logo_thumbnail.png' ,
'../../assets/car-brands/mitsubishi_logo_thumbnail.png' ,
'../../assets/car-brands/nissan_logo_thumbnail.png' ,
'../../assets/car-brands/opel_logo_thumbnail.png' ,
'../../assets/car-brands/peugeot_logo_thumbnail.png' ,
'../../assets/car-brands/renault_logo_thumbnail.png' ,
'../../assets/car-brands/skoda_logo_thumbnail.png' ,
'../../assets/car-brands/volkswagen_logo_thumbnail.png' ,
'../../assets/car-brands/volvo_logo_thumbnail.png' ,]

          

}
