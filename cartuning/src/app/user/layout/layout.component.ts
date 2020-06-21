import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../_services/account.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    public accountService : AccountService,
  ){}

  ngOnInit(): void {

  }

}
