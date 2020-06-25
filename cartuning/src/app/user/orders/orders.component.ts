import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
// import {MatTableModule} from '@angular/material/table';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { MatChipsModule } from '@angular/material/chips'
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading;

  displayedColumns: string[] = ['order', 'status', 'summary', 'date',  'actions'];
  dataSource;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.accountService.getOrders().subscribe(x => {this.dataSource = x; this.loading = false});
  }




}
