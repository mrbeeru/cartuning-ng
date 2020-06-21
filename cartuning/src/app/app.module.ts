import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TuningComponent } from './tuning/tuning.component';
import { AlertComponent } from './_components/alert.component'
import { PageheaderComponent } from './pageheader/pageheader.component';
import { ScrambletextComponent } from './scrambletext/scrambletext.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';

import { fakeBackendProvider } from './_helpers/fake-backend';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule, MatButton } from '@angular/material/button'


import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TuningComponent,
    PageheaderComponent,
    ScrambletextComponent,
    AboutusComponent,
    FooterComponent,
    AlertComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,

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
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule ,
    CarouselModule,
  ],

  exports: [
    AlertComponent
  ],


  bootstrap: [AppComponent],
  
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    fakeBackendProvider,
  ],
})
export class AppModule { }
