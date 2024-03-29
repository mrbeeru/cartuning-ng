import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
    { path: '', component: LayoutComponent, 
        children: [
            { path: 'profile', component: ProfileComponent},
            { path: 'place-order', component: PlaceOrderComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'orders/:orderId', component: OrderDetailsComponent },
    ]}
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }