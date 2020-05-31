import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TuningComponent } from './tuning/tuning.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';

import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PageheaderComponent } from './pageheader/pageheader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TuningComponent,
    PageheaderComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,

    FontAwesomeModule ,
    CarouselModule,
  ],

  bootstrap: [AppComponent],
  
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
})
export class AppModule { }
