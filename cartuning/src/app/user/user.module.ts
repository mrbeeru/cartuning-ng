import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { UserRoutingModule } from './user-rooting.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersComponent } from './orders/orders.component';
import { from } from 'rxjs';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    LayoutComponent,
    PlaceOrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule
  ]
})
export class UserModule { }
