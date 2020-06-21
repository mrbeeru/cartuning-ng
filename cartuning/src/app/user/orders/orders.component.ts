import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading;

  displayedColumns: string[] = ['brand', 'model', 'year', 'engine', 'clutch', 'ecu'];
  dataSource;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.accountService.getOrders().subscribe(x => {this.dataSource = x; this.loading = false});
  }




}
