import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

interface CarBrand {
  name: string;
  icon: string;
  models:CarModel[];
}

interface CarModel {
  name: string;
}

@Component({
  selector: 'app-tuning',
  templateUrl: './tuning.component.html',
  styleUrls: ['./tuning.component.css']
})

export class TuningComponent implements OnInit {
  array = [];

  selectedCar : CarBrand;

  @ViewChild('stepper') stepper:MatStepper;

  constructor() { 
    
    
  }

  ngOnInit(): void {
    this.buildTable();
  }

  log(r, c){
    console.log(c);
    this.selectedCar = c;
    this.stepper.next();
  }

  buildTable(){
    var colLen = 4;
    var rowLen = Math.ceil(carMap.cars.length/colLen);
    
    for (var i = 0; i < rowLen; i++){
      this.array[i] = [];

      for (var j = 0; j < colLen; j++){

        if (i * colLen + j >= carMap.cars.length )
          continue;

        var currentCar = carMap.cars[i * colLen + j];
        var test : CarBrand = {
          name : currentCar.name,
          icon : currentCar.icon,
          models: null,
        }

        this.array[i][j] = test;
      }
    }
  }
}


var audi = 
{
  name: "Audi",
  icon: "../../assets/car-brands/audi_logo_thumbnail.png"
}

var renault = 
{
  name: "Bmw",
  icon: "../../assets/car-brands/renault_logo_thumbnail.png"
}

var bmw = 
{
  name: "Renault",
  icon: "../../assets/car-brands/bmw_logo_thumbnail.png"
}

var volkswagen = 
{
  name: "Volkswagen",
  icon: "../../assets/car-brands/volkswagen_logo_thumbnail.png"  
}

var ford = 
{
  name: "Ford",
  icon: "../../assets/car-brands/ford_logo_thumbnail.png"  
}

var opel = 
{
  name: "Opel",
  icon: "../../assets/car-brands/opel_logo_thumbnail.png"  
}

var mercedes = 
{
  name: "Mercedes",
  icon: "../../assets/car-brands/mercedes_logo_thumbnail.png"  
}

var alfaromeo = 
{
  name: "Alfa Romeo",
  icon: "../../assets/car-brands/alfaromeo_logo_thumbnail.png"  
}

var dacia = 
{
  name: "Dacia",
  icon: "../../assets/car-brands/dacia_logo_thumbnail.png"  
}

var peugeot = 
{
  name: "Peugeot",
  icon: "../../assets/car-brands/peugeot_logo_thumbnail.png"  
}

var mazda = 
{
  name: "Mazda",
  icon: "../../assets/car-brands/mazda_logo_thumbnail.png"  
}

var skoda = 
{
  name: "Skoda",
  icon: "../../assets/car-brands/skoda_logo_thumbnail.png"  
}

var nissan = 
{
  name: "nissan",
  icon: "../../assets/car-brands/nissan_logo_thumbnail.png"  
}

var volvo = 
{
  name: "volvo",
  icon: "../../assets/car-brands/volvo_logo_thumbnail.png"  
}

var fiat = 
{
  name: "fiat",
  icon: "../../assets/car-brands/fiat_logo_thumbnail.png"  
}

var citroen = 
{
  name: "citroen",
  icon: "../../assets/car-brands/citroen_logo_thumbnail.png"  
}




var carMap = {
  cars : [
    audi, bmw, renault, volkswagen, ford, opel, mercedes, alfaromeo,
    dacia, peugeot, mazda, skoda, nissan, volvo, fiat, citroen
  ],

  findCar: function (){

  }
}
  



