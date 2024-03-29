import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { LayoutComponent } from './layout/layout.component';
import { UserRoutingModule } from './user-rooting.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersComponent } from './orders/orders.component';

import { from } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule} from '@angular/material/table';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    LayoutComponent,
    PlaceOrderComponent,
    OrdersComponent,
    ProfileComponent,
    OrderDetailsComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class UserModule { }
