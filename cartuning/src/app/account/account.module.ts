import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { AccountRoutingModule } from './acccount-rooting.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent, 
    LayoutComponent, 
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,

    MatTabsModule,
    MatListModule,
  ]
})
export class AccountModule { }
