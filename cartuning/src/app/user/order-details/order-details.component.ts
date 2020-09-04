import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { Order } from '../../_models/user'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;
  loading : boolean;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    let orderId = this.route.snapshot.paramMap.get('orderId');
    this.accountService.getOrderById(orderId).subscribe(x => this.order = x);
  }

}
