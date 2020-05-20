import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

import { faCar, faMicrochip, faTachometerAlt, faCalendarCheck, faTools, faChartLine } from '@fortawesome/free-solid-svg-icons'

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

  constructor() { }

  ngOnInit(): void {
  }

}
