import { Component, OnInit } from '@angular/core';

import {AlertService} from '../_services/alert.service'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
  }

}
