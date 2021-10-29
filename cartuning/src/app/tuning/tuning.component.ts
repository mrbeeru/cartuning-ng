import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { TuningEditDialogComponent } from './tuning-edit-dialog/tuning-edit-dialog.component';


export interface CarBrand {
  name: string;
  icon: string;
  models:CarModel[];
}

interface CarModel {
  name: string;
  icon: string;
  generations: CarGeneration[];
}

interface CarGeneration {
  startYear: number;
  endYear : number;
  icon: string;
  dieselEngines?: CarEngine[];
  petrolEngines?: CarEngine[];
}

interface CarEngine{
  name: string;
  hp: number;
  nm: number;
  stage1: CarEngineStage;
  // stage2: CarEngineStage;
  // stage3: CarEngineStage;
}

interface CarEngineStage {
  price: number;
  stageHp: number;
  stageNm: number;
}

@Component({
  selector: 'app-tuning',
  templateUrl: './tuning.component.html',
  styleUrls: ['./tuning.component.css']
})


export class TuningComponent implements OnInit {

  //#region  properties
  
  displayedColumns: string[] = ['engineName', 'original', 'tuned', 'symbol', 'price'];
  dieselEngineSource : any;
  petrolEngineSource : any;

  carBrandTable = [];
  carModelTable = [];
  carGenerationTable = [];
  carEnginesTable = [];

  selectedCar : CarBrand;
  selectedModel : CarModel;
  selectedGeneration : CarGeneration;

  myCarMap: any;

  @ViewChild('stepper') stepper:MatStepper;
  //#endregion

  constructor(public dialog: MatDialog) { 
    this.myCarMap = carMap;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dieselEngineSource.filter = filterValue.trim().toLowerCase();
    this.petrolEngineSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.buildCarBrandTable();
   
  }

  selectCar(c){
    this.selectedCar = c;
    this.buildCarModelTable();
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  selectModel(m){
    this.selectedModel = m;
    this.buildCarGenerationTable();
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  selectGeneration(g){
    this.selectedGeneration = g;
    this.stepper.selected.completed = true;
    this.stepper.next();
    this.dieselEngineSource = new MatTableDataSource(g.dieselEngines);
    this.petrolEngineSource = new MatTableDataSource(g.petrolEngines);

    this.applyFilters();
  }

  setIndex(event) {
    this.stepper.steps.forEach((x,idx) => {
      if (idx >= event.selectedIndex){
        x.completed = false;
      }

      idx++;
    });

    if (event.selectedIndex < 3)
      this.selectedGeneration = null;

    if (event.selectedIndex < 2){
      this.selectedModel = null;
    }

    if (event.selectedIndex < 1){
      this.selectedCar = null;
    }

  }

  applyFilters(){
    this.dieselEngineSource.filterPredicate = (data, filter) => {
      const dataStr = data.name  + data.hp + data.nm + data.stage1.price + data.stage1.stageHp + data.stage1.stageNm;
      return dataStr.indexOf(filter) != -1; 
    }

    this.petrolEngineSource.filterPredicate = (data, filter) => {
      const dataStr = data.name  + data.hp + data.nm + data.stage1.price + data.stage1.stageHp + data.stage1.stageNm;
      return dataStr.indexOf(filter) != -1; 
    }
  }

  //#region table builder

  buildCarBrandTable(){
    var colLen = 4;
    var rowLen = Math.ceil(carMap.cars.length/colLen);
    
    for (var i = 0; i < rowLen; i++){
      this.carBrandTable[i] = [];

      for (var j = 0; j < colLen; j++){

        if (i * colLen + j >= carMap.cars.length )
          continue;

        var currentCar = carMap.cars[i * colLen + j];


        var test : CarBrand = {
          name : currentCar.name,
          icon : currentCar.icon,
          models: currentCar.models,
        }

        this.carBrandTable[i][j] = test;
      }
    }
  }

  buildCarModelTable(){
    var context = this.selectedCar.models;
    this.carModelTable = [];
    
    var colLen = 3;
    var rowLen = Math.ceil(context.length/colLen);
    
    for (var i = 0; i < rowLen; i++){
      this.carModelTable[i] = [];

      for (var j = 0; j < colLen; j++){

        if (i * colLen + j >= context.length )
          continue;

        var currentModel = context[i * colLen + j];

        var test : CarModel = {
          name : currentModel.name,
          icon : currentModel.icon,
          generations: currentModel.generations,
        }

        this.carModelTable[i][j] = test;
      }
    }
  }

  buildCarGenerationTable(){
    var context = this.selectedModel.generations;
    this.carGenerationTable = [];
    
    var colLen = 4;
    var rowLen = Math.ceil(context.length/colLen);
    
    for (var i = 0; i < rowLen; i++){
      this.carGenerationTable[i] = [];

      for (var j = 0; j < colLen; j++){

        if (i * colLen + j >= context.length )
          continue;

        var currentCar = context[i * colLen + j];

        var test : CarGeneration = {
          startYear : currentCar.startYear,
          endYear : currentCar.endYear,
          icon : this.selectedModel.icon,
          dieselEngines: currentCar.dieselEngines,
          petrolEngines: currentCar.petrolEngines,
        }

        this.carGenerationTable[i][j] = test;
      }
    }
  }

  openAddCarDialog(){
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"ADD BRAND"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog Result:", result);

      if (result != null)
      {
        carMap.cars.push(result);
        this.buildCarBrandTable();
      }


    });
  }

  //#endregion
}


//#region  cars

var audi = 
{
  name: "Audi",
  icon: "../../assets/car-brands/audi_logo_thumbnail.png",
  models: [
    {
      name: "A2",
      icon: "../../assets/car-models/audi/audi_a2_small.png",
      generations: [
        {
          startYear: 1999,
          endYear: 2005,
          icon: "",
          dieselEngines: [
            {
              name: "1.4 TDI ",
              hp: 90,
              nm: 230,
              stage1: {
                price: 75,
                stageHp: 110,
                stageNm: 280,
              }
            },
            {
              name: "1.4 TDI",
              hp: 75,
              nm: 195,
              stage1: {
                price: 75,
                stageHp: 100,
                stageNm: 250,
              }
            },
            {
              name: "1.2 TDI",
              hp: 61,
              nm: 140,
              stage1: {
                price: 75,
                stageHp: 85,
                stageNm: 170,
              }
            }
          ]
        }
      ]
    },
    
    {
      name: "A3",
      icon: "../../assets/car-models/audi/audi_a3_small.png",
      generations: [
        {
          startYear: 1996,
          endYear: 2003,
          icon: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 90,
              nm: 210,
              stage1: {
                price: 75,
                stageHp: 120,
                stageNm: 260,
              }
            },
            {
              name: "1.9 TDI",
              hp: 100,
              nm: 240,
              stage1: {
                price: 75,
                stageHp: 130,
                stageNm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 110,
              nm: 235,
              stage1: {
                price: 75,
                stageHp: 140,
                stageNm: 310,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                stageHp: 160,
                stageNm: 380,
              }
            },
          ],

          petrolEngines: [
            {
              name: "1.8 T",
              hp: 150,
              nm: 210,
              stage1: {
                price: 250,
                stageHp: 180,
                stageNm: 280,
              }
            },
            {
              name: "1.8 T",
              hp: 180,
              nm: 235,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 310,
              }
            },
          ]
        },
        
        {
          startYear: 2003,
          endYear: 2008,
          icon: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 120,
                stageHp: 140,
                stageNm: 320,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                stageHp: 180,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                stageHp: 200,
                stageNm: 420,
              }
            },
            
          ],

          petrolEngines: [
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 300,
                stageHp: 240,
                stageNm: 340,
              }
            },
            {
              name: "S3 2.0 TFSI",
              hp: 265,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 300,
                stageNm: 420,
              }
            },
          ]
        },

        {
          startYear: 2008,
          endYear: 2012,
          icon: "",
          dieselEngines: [
            {
              name: "1.6 TDI",
              hp: 90,
              nm: 230,
              stage1: {
                price: 180,
                stageHp: 140,
                stageNm: 300,
              }
            },
            {
              name: "1.6 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 180,
                stageHp: 140,
                stageNm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 120,
                stageHp: 140,
                stageNm: 320,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                stageHp: 200,
                stageNm: 420,
              }
            },
          ],

          petrolEngines: [
            {
              name: "1.2 TSI",
              hp: 105,
              nm: 175,
              stage1: {
                price: 300,
                stageHp: 130,
                stageNm: 215,
              }
            },
            {
              name: "1.4 TSI",
              hp: 125,
              nm: 200,
              stage1: {
                price: 300,
                stageHp: 145,
                stageNm: 250,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 200,
                stageNm: 300,
              }
            },
          ]
        },

        {
          startYear: 2012,
          endYear: 2016,
          icon: "",
          dieselEngines: [
            {
              name: "1.6 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 180,
                stageHp: 140,
                stageNm: 300,
              }
            },
            {
              name: "1.6 TDI",
              hp: 110,
              nm: 250,
              stage1: {
                price: 250,
                stageHp: 140,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TDI",
              hp: 110,
              nm: 250,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 190,
                stageNm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 184,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 220,
                stageNm: 440,
              }
            },
          ],

          petrolEngines: [
            {
              name: "1.2 TSI",
              hp: 110,
              nm: 175,
              stage1: {
                price: 300,
                stageHp: 130,
                stageNm: 215,
              }
            },
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 170,
                stageNm: 300,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 180,
              nm: 250,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 350,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 220,
              nm: 350,
              stage1: {
                price: 400,
                stageHp: 270,
                stageNm: 400,
              }
            },
          ]
        },
      ]
    },
    
    {
      name: "A4",
      icon: "../../assets/car-models/audi/audi_a4_small.png",
      generations: [
        {
          startYear: 2001,
          endYear: 2004,
          icon: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 100,
              nm: 240,
              stage1: {
                price: 75,
                stageHp: 130,
                stageNm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 75,
                stageHp: 150,
                stageNm: 350,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                stageHp: 160,
                stageNm: 380,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 T",
              hp: 150,
              nm: 210,
              stage1: {
                price: 250,
                stageHp: 180,
                stageNm: 280,
              }
            },
            {
              name: "1.8 T",
              hp: 163,
              nm: 225,
              stage1: {
                price: 250,
                stageHp: 195,
                stageNm: 320,
              }
            },
            {
              name: "1.8 T",
              hp: 190,
              nm: 235,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 320,
              }
            },
          ]
        },
       
        {
          startYear: 2004,
          endYear: 2008,
          icon: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 120,
                stageHp: 150,
                stageNm: 350,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                stageHp: 180,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                stageHp: 200,
                stageNm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 120,
                stageHp: 220,
                stageNm: 460,
              }
            },
            {
              name: "2.7 TDI",
              hp: 180,
              nm: 380,
              stage1: {
                price: 120,
                stageHp: 220,
                stageNm: 460,
              }
            },
            {
              name: "3.0 V6 TDI",
              hp: 204,
              nm: 450,
              stage1: {
                price: 120,
                stageHp: 275,
                stageNm: 540,
              }
            },
            {
              name: "3.0 V6 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 120,
                stageHp: 275,
                stageNm: 540,
              }
            },
          ],

          petrolEngines: [
            {
              name: "1.8 T",
              hp: 163,
              nm: 225,
              stage1: {
                price: 250,
                stageHp: 195,
                stageNm: 320,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 300,
                stageHp: 230,
                stageNm: 340,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 300,
                stageHp: 240,
                stageNm: 360,
              }
            },
            {
              name: "2.0 TFSI - DTM Eddition",
              hp: 220,
              nm: 300,
              stage1: {
                price: 300,
                stageHp: 240,
                stageNm: 360,
              }
            },
          ]
        },
        
        {
          startYear: 2008,
          endYear: 2012,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 120,
              nm: 290,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                stageHp: 200,
                stageNm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 180,
                stageHp: 230,
                stageNm: 480,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 180,
                stageHp: 230,
                stageNm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 290,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                stageHp: 300,
                stageNm: 600,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 120,
              nm: 230,
              stage1: {
                price: 350,
                stageHp: 200,
                stageNm: 300,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 350,
                stageHp: 200,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 420,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 500,
              }
            },
          ]
        
        },
        
        {
          startYear: 2012,
          endYear: 2015,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 120,
              nm: 290,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 220,
                stageNm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 270,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 290,
                stageNm: 600,
              }
            },
          ],
          
          petrolEngines: [
            {
              name: "1.4 TSI",
              hp: 125,
              nm: 200,
              stage1: {
                price: 300,
                stageHp: 145,
                stageNm: 250,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 170,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 170,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TSI",
              hp: 225,
              nm: 350,
              stage1: {
                price: 400,
                stageHp: 300,
                stageNm: 440,
              }
            },
            {
              name: "3.0 V6 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2015,
          endYear: 2019,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 122,
              nm: 290,
              stage1: {
                price: 300,
                stageHp: 195,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 300,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 300,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 220,
                stageNm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 300,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 272,
              nm: 600,
              stage1: {
                price: 300,
                stageHp: 320,
                stageNm: 680,
              }
            },
          ]
        },
      ]
    },

    {
      name: "A5",
      icon: "../../assets/car-models/audi/audi_a5_small.png",
      generations: [
        {
          startYear: 2007,
          endYear: 2011,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                stageHp: 200,
                stageNm: 420,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 180,
                stageHp: 215,
                stageNm: 430,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 180,
                stageHp: 230,
                stageNm: 480,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 180,
                stageHp: 230,
                stageNm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 290,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                stageHp: 300,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 270,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 290,
                stageNm: 600,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 350,
                stageHp: 200,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
          ]
        },
        
        {
          startYear: 2011,
          endYear: 2016,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 220,
                stageNm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 270,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 290,
                stageNm: 600,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 170,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TSI",
              hp: 225,
              nm: 350,
              stage1: {
                price: 400,
                stageHp: 300,
                stageNm: 440,
              }
            },
            {
              name: "3.0 V6 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2016,
          endYear: 2019,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 300,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 220,
                stageNm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 300,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 272,
              nm: 600,
              stage1: {
                price: 300,
                stageHp: 320,
                stageNm: 680,
              }
            },
          ],
        }
      ]
    },

    {
      name: "A6",
      icon: "../../assets/car-models/audi/audi_a6_small.png",
      generations: [
        {
          startYear: 1997,
          endYear: 2004,
          icon: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 110,
              nm: 235,
              stage1: {
                price: 75,
                stageHp: 140,
                stageNm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 75,
                stageHp: 150,
                stageNm: 350,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                stageHp: 160,
                stageNm: 380,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 T",
              hp: 150,
              nm: 210,
              stage1: {
                price: 200,
                stageHp: 190,
                stageNm: 320,
              }
            },
          ]
        },
        
        {
          startYear: 2004,
          endYear: 2008,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                stageHp: 180,
                stageNm: 380,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 120,
                stageHp: 220,
                stageNm: 460,
              }
            },
            {
              name: "2.7 TDI",
              hp: 180,
              nm: 380,
              stage1: {
                price: 120,
                stageHp: 220,
                stageNm: 460,
              }
            },
            {
              name: "3.0 TDI",
              hp: 225,
              nm: 450,
              stage1: {
                price: 120,
                stageHp: 275,
                stageNm: 540,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 120,
                stageHp: 275,
                stageNm: 540,
              }
            },
          ],
          petrolEngines: [
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 250,
                stageHp: 240,
                stageNm: 360,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 250,
                stageHp: 240,
                stageNm: 360,
              }
            },
          ]
        },
        
        {
          startYear: 2008,
          endYear: 2011,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                stageHp: 180,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                stageHp: 200,
                stageNm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 450,
              stage1: {
                price: 150,
                stageHp: 230,
                stageNm: 520,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 450,
              stage1: {
                price: 150,
                stageHp: 230,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 180,
                stageHp: 290,
                stageNm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                stageHp: 290,
                stageNm: 580,
              }
            },
          ],
          petrolEngines: [
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 250,
                stageHp: 240,
                stageNm: 360,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 420,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2011,
          endYear: 2018,
          icon: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 136,
              nm: 320,
              stage1: {
                price: 200,
                stageHp: 185,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 350,
              stage1: {
                price: 200,
                stageHp: 190,
                stageNm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 150,
              stage1: {
                price: 200,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 200,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 220,
                stageNm: 450,
              }
            },
            

            {
              name: "3.0 TDI",
              hp: 190,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 300,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 270,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 620,
              }
            },

            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 295,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 580,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 BI TDI",
              hp: 313,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 350,
                stageNm: 720,
              }
            },
            {
              name: "3.0 BI TDI Competition",
              hp: 326,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 740,
              }
            },
            {
              name: "3.0 TDI",
              hp: 320,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 750,
              }
            },
          ],
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 190,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 420,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 252,
              nm: 370,
              stage1: {
                price: 350,
                stageHp: 300,
                stageNm: 440,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 300,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ]
        },
      ]
    },

    {
      name: "A7",
      icon: "../../assets/car-models/audi/audi_a7_small.png",
      generations: [
        {
          startYear: 2010,
          endYear: 2018,
          icon: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 190,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 252,
              nm: 370,
              stage1: {
                price: 350,
                stageHp: 300,
                stageNm: 440,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 300,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 500,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 190,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 300,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 270,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 620,
              }
            },

            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 295,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 580,
              stage1: {
                price: 250,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 BI TDI",
              hp: 313,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 350,
                stageNm: 720,
              }
            },
            {
              name: "3.0 BI TDI Competition",
              hp: 326,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 740,
              }
            },
            {
              name: "3.0 TDI",
              hp: 320,
              nm: 650,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 750,
              }
            },
          ],
          
        }
      ]
    },

    {
      name: "A8",
      icon: "../../assets/car-models/audi/audi_a8_small.png",
      generations: [
        {
          startYear: 2003,
          endYear: 2010,
          icon: "",
          petrolEngines: [
            
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 450,
              stage1: {
                price: 180,
                stageHp: 275,
                stageNm: 540,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 180,
                stageHp: 275,
                stageNm: 540,
              }
            },
            {
              name: "4.0 V8 TDI",
              hp: 275,
              nm: 650,
              stage1: {
                price: 200,
                stageHp: 330,
                stageNm: 670,
              }
            },
          ],
          
        },
        {
          startYear: 2010,
          endYear: 2016,
          icon: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 400,
              stage1: {
                price: 350,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 350,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "4.0 TFSI",
              hp: 420,
              nm: 550,
              stage1: {
                price: 350,
                stageHp: 540,
                stageNm: 800,
              }
            },
            {
              name: "4.0 TFSI",
              hp: 435,
              nm: 600,
              stage1: {
                price: 400,
                stageHp: 540,
                stageNm: 800,
              }
            },
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 550,
              stage1: {
                price: 300,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 250,
              nm: 550,
              stage1: {
                price: 300,
                stageHp: 310,
                stageNm: 650,
              },
            },
            {
              name: "3.0 TDI",
              hp: 258,
              nm: 580,
              stage1: {
                price: 300,
                stageHp: 310,
                stageNm: 650,
              }
            },
            {
              name: "3.0 TDI",
              hp: 262,
              nm: 580,
              stage1: {
                price: 300,
                stageHp: 310,
                stageNm: 650,
              }
            },
            {
              name: "3.0 V6 BI TDI",
              hp: 313,
              nm: 560,
              stage1: {
                price: 300,
                stageHp: 350,
                stageNm: 720,
              }
            },
            
            {
              name: "4.2 V8 TDI",
              hp: 350,
              nm: 800,
              stage1: {
                price: 300,
                stageHp: 400,
                stageNm: 900,
              }
            },
            {
              name: "4.0 V8 TDI",
              hp: 385,
              nm: 850,
              stage1: {
                price: 300,
                stageHp: 485,
                stageNm: 950,
              }
            },
          ],
        },
        {
          startYear: 2016,
          endYear: 2018,
          icon: "",
          petrolEngines: [
            {
              name: "4.0 TFSI",
              hp: 580,
              nm: 800,
              stage1: {
                price: 650,
                stageHp: 680,
                stageNm: 900,
              }
            },
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 286,
              nm: 600,
              stage1: {
                price: 450,
                stageHp: 350,
                stageNm: 720,
              }
            },
          ],
		    }
      ]
    },

    {
      name: "Q3",
      icon: "../../assets/car-models/audi/audi_q3_small.png",
      generations: [
        {
          startYear: 2011,
          endYear: 2015,
          icon: "../../assets/car-models/audi/audi_q3_small.png",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 170,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 300,
                stageHp: 250,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 300,
                stageHp: 250,
                stageNm: 400,
              }
            },
            
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
			    ],
        },
        {
          startYear: 2015,
          endYear: 2018,
          icon: "",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 125,
              nm: 220,
              stage1: {
                price: 300,
                stageHp: 170,
                stageNm: 300,
              }
            },
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 170,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 440,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 220,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 440,
              }
            },
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 120,
              nm: 290,
              stage1: {
                price: 300,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 340,
              stage1: {
                price: 300,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 184,
              nm: 380,
              stage1: {
                price: 350,
                stageHp: 220,
                stageNm: 450,
              }
            },
          ]
        }
      ]
    },

    {
      name: "Q5",
      icon: "../../assets/car-models/audi/audi_q5_small.png",
      generations: [
        {
          startYear: 2008,
          endYear: 2012,
          icon: "",
          petrolEngines: [
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 280,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 350,
              stage1: {
                price: 250,
                stageHp: 205,
                stageNm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 250,
                stageHp: 205,
                stageNm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 250,
                stageHp: 230,
                stageNm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 280,
                stageNm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 250,
                stageHp: 290,
                stageNm: 580,
              }
            },
			    ],
        },
        
        {
          startYear: 2012,
          endYear: 2016,
          icon: "",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 180,
                stageNm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 230,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 400,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 354,
              nm: 470,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 185,
                stageNm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                stageHp: 190,
                stageNm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                stageHp: 210,
                stageNm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 215,
                stageNm: 450,
              }
            },
            {
              name: "3.0 TDI",
              hp: 245,
              nm: 580,
              stage1: {
                price: 300,
                stageHp: 290,
                stageNm: 650,
              }
            },
            {
              name: "3.0 TDI",
              hp: 258,
              nm: 580,
              stage1: {
                price: 300,
                stageHp: 310,
                stageNm: 650,
              }
            },
          ]
        }
      ]
    },

    {
      name: "Q7",
      icon: "../../assets/car-models/audi/audi_q7_small.png",
      generations: [
        {
          startYear: 2006,
          endYear: 2010,
          icon: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 280,
                stageNm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 500,
              stage1: {
                price: 200,
                stageHp: 280,
                stageNm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 550,
              stage1: {
                price: 200,
                stageHp: 290,
                stageNm: 600,
              }
            },
            {
              name: "4.2 TDI",
              hp: 326,
              nm: 760,
              stage1: {
                price: 250,
                stageHp: 375,
                stageNm: 880,
              }
            },
            {
              name: "6.0 TDI",
              hp: 500,
              nm: 1000,
              stage1: {
                price: 300,
                stageHp: 600,
                stageNm: 1200,
              }
            },
          ]
        },
        
        {
          startYear: 2010,
          endYear: 2015,
          icon: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 400,
                stageHp: 400,
                stageNm: 520,
              }
            },
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 204,
              nm: 450,
              stage1: {
                price: 300,
                stageHp: 270,
                stageNm: 570,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 550,
              stage1: {
                price: 300,
                stageHp: 290,
                stageNm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 300,
                stageHp: 290,
                stageNm: 600,
              }
            },
            {
              name: "4.2 TDI",
              hp: 340,
              nm: 760,
              stage1: {
                price: 300,
                stageHp: 390,
                stageNm: 880,
              }
            },
            {
              name: "6.0 TDI",
              hp: 500,
              nm: 1000,
              stage1: {
                price: 350,
                stageHp: 600,
                stageNm: 1200,
              }
            },
          ]
        },

        {
          startYear: 2015,
          endYear: 2019,
          icon: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 600,
                stageHp: 400,
                stageNm: 520,
              }
            },
            
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 350,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 350,
                stageHp: 320,
                stageNm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 600,
              stage1: {
                price: 350,
                stageHp: 320,
                stageNm: 680,
              }
            },
          ]
        }
      ]
    },

    {
      name: "TT",
      icon: "../../assets/car-models/audi/audi_tt_small.png",
      generations: [
        {
          startYear: 1997,
          endYear: 2006,
          icon: "../../assets/car-models/audi/audi_tt_small.png",
          petrolEngines: [
            {
              name: "1.8 T",
              hp: 150,
              nm: 210,
              stage1: {
                price: 200,
                stageHp: 190,
                stageNm: 320,
              }
            },
            {
              name: "1.8 T",
              hp: 180,
              nm: 235,
              stage1: {
                price: 200,
                stageHp: 210,
                stageNm: 340,
              }
            },
            {
              name: "1.8 T",
              hp: 225,
              nm: 280,
              stage1: {
                price: 250,
                stageHp: 250,
                stageNm: 350,
              }
            },
          ],
          dieselEngines: [
           
          ]
        },
        
        {
          startYear: 2006,
          endYear: 2014,
          icon: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 300,
                stageHp: 210,
                stageNm: 320,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                stageHp: 260,
                stageNm: 380,
              }
            },
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                stageHp: 205,
                stageNm: 420,
              }
            },
          ]
        },

        {
          startYear: 2014,
          endYear: 2018,
          icon: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 180,
              nm: 250,
              stage1: {
                price: 400,
                stageHp: 220,
                stageNm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 230,
              nm: 370,
              stage1: {
                price: 400,
                stageHp: 300,
                stageNm: 440,
              }
            },
            
          ],
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 184,
              nm: 380,
              stage1: {
                price: 300,
                stageHp: 220,
                stageNm: 450,
              }
            },
          ]
        }
      ]
    }
  ]
}

var bmw = 
{
  name: "Bmw",
  icon: "../../assets/car-brands/bmw_logo_thumbnail.png",
  models: [
    {
      name: "Seria 1",
      icon: "../../assets/car-models/bmw/bmw_series1_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Seria 3",
      icon: "../../assets/car-models/bmw/bmw_series3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Seria 5",
      icon: "../../assets/car-models/bmw/bmw_series5.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Seria 7",
      icon: "../../assets/car-models/bmw/bmw_series7_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "X3",
      icon: "../../assets/car-models/bmw/bmw_x3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "X5",
      icon: "../../assets/car-models/bmw/bmw_x5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var renault = 
{
  name: "Renault",
  icon: "../../assets/car-brands/renault_logo_thumbnail.png",
  models: [
    {
      name: "Laguna",
      icon: "../../assets/car-models/renault/laguna_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Megane",
      icon: "../../assets/car-models/renault/megane_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Clio",
      icon: "../../assets/car-models/renault/clio_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Espace",
      icon: "../../assets/car-models/renault/espace_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Fluence",
      icon: "../../assets/car-models/renault/fluence_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Modus",
      icon: "../../assets/car-models/renault/modus_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Latitude",
      icon: "../../assets/car-models/renault/latitude_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Scenic",
      icon: "../../assets/car-models/renault/scenic_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Trafic",
      icon: "../../assets/car-models/renault/trafic_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Vel Satis",
      icon: "../../assets/car-models/renault/vel_satis_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
  
}

var volkswagen = 
{
  name: "Volkswagen",
  icon: "../../assets/car-brands/volkswagen_logo_thumbnail.png"  ,
  models: [
    {
      name: "Bora",
      icon: "../../assets/car-models/vw/vw_bora_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Golf",
      icon: "../../assets/car-models/vw/vw_golf_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Passat",
      icon: "../../assets/car-models/vw/vw_passat_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Jetta",
      icon: "../../assets/car-models/vw/vw_jetta_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Caddy",
      icon: "../../assets/car-models/vw/vw_caddy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Sharan",
      icon: "../../assets/car-models/vw/vw_sharan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Tiguan",
      icon: "../../assets/car-models/vw/vw_tiguan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Touareg",
      icon: "../../assets/car-models/vw/vw_touareg_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Touran",
      icon: "../../assets/car-models/vw/vw_touran_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var ford = 
{
  name: "Ford",
  icon: "../../assets/car-brands/ford_logo_thumbnail.png",
  models: [
    {
      name: "Mondeo",
      icon: "../../assets/car-models/ford/ford_mondeo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Fiesta",
      icon: "../../assets/car-models/ford/ford_fiesta_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Focus",
      icon: "../../assets/car-models/ford/ford_focus_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Galaxy",
      icon: "../../assets/car-models/ford/ford_galaxy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C Max",
      icon: "../../assets/car-models/ford/ford_cmax_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "S Max",
      icon: "../../assets/car-models/ford/ford_smax_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var opel = 
{
  name: "Opel",
  icon: "../../assets/car-brands/opel_logo_thumbnail.png",
  models: [
    {
      name: "Astra",
      icon: "../../assets/car-models/opel/opel_astra_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Vectra",
      icon: "../../assets/car-models/opel/opel_vectra.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Insignia",
      icon: "../../assets/car-models/opel/opel_insignia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Corsa",
      icon: "../../assets/car-models/opel/opel_corsa_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Agila",
      icon: "../../assets/car-models/opel/opel_agila_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Antara",
      icon: "../../assets/car-models/opel/opel_antara_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Meriva",
      icon: "../../assets/car-models/opel/opel_meriva_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Vivaro",
      icon: "../../assets/car-models/opel/opel_vivaro_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Zafira",
      icon: "../../assets/car-models/opel/opel_zafira_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Signum",
      icon: "../../assets/car-models/opel/opel_signum_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var mercedes = 
{
  name: "Mercedes",
  icon: "../../assets/car-brands/mercedes_logo_thumbnail.png",
  models: [
    {
      name: "A Class",
      icon: "../../assets/car-models/mercedes/mercedes_aclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C Class",
      icon: "../../assets/car-models/mercedes/mercedes_cclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "E Class",
      icon: "../../assets/car-models/mercedes/mercedes_eclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "S Class",
      icon: "../../assets/car-models/mercedes/mercedes_sclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Vito",
      icon: "../../assets/car-models/mercedes/mercedes_vito_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var alfaromeo = 
{
  name: "Alfa Romeo",
  icon: "../../assets/car-brands/alfaromeo_logo_thumbnail.png",
  models: [
    {
      name: "147",
      icon: "../../assets/car-models/alfaromeo/alfaromeo_147_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "156",
      icon: "../../assets/car-models/alfaromeo/alfaromeo_156_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "159",
      icon: "../../assets/car-models/alfaromeo/alfaromeo_159_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var dacia = 
{
  name: "Dacia",
  icon: "../../assets/car-brands/dacia_logo_thumbnail.png",
  models: [
    {
      name: "Duster",
      icon: "../../assets/car-models/dacia/dacia_duster_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Logan",
      icon: "../../assets/car-models/dacia/dacia_logan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Sandero",
      icon: "../../assets/car-models/dacia/dacia_sandero_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Lodgy",
      icon: "../../assets/car-models/dacia/dacia_lodgy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Dokker",
      icon: "../../assets/car-models/dacia/dacia_dokker_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var peugeot = 
{
  name: "Peugeot",
  icon: "../../assets/car-brands/peugeot_logo_thumbnail.png",
  models: [
    {
      name: "206",
      icon: "../../assets/car-models/peugeot/peugeot_206_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "207",
      icon: "../../assets/car-models/peugeot/peugeot_207_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "307",
      icon: "../../assets/car-models/peugeot/peugeot_307_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "407",
      icon: "../../assets/car-models/peugeot/peugeot_407_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "508",
      icon: "../../assets/car-models/peugeot/peugeot_508_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "607",
      icon: "../../assets/car-models/peugeot/peugeot_607_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Partner",
      icon: "../../assets/car-models/peugeot/peugeot_partner_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var mazda = 
{
  name: "Mazda",
  icon: "../../assets/car-brands/mazda_logo_thumbnail.png",
  models: [
    {
      name: "3",
      icon: "../../assets/car-models/mazda/mazda_3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "5",
      icon: "../../assets/car-models/mazda/mazda_5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "6",
      icon: "../../assets/car-models/mazda/mazda_6.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var skoda = 
{
  name: "Skoda",
  icon: "../../assets/car-brands/skoda_logo_thumbnail.png",
  models: [
    {
      name: "Fabia",
      icon: "../../assets/car-models/skoda/skoda_fabia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Octavia",
      icon: "../../assets/car-models/skoda/skoda_octavia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Superb",
      icon: "../../assets/car-models/skoda/skoda_superb_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var nissan = 
{
  name: "nissan",
  icon: "../../assets/car-brands/nissan_logo_thumbnail.png",
  models: [
    {
      name: "Almera",
      icon: "../../assets/car-models/nissan/nissan_almera_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Micra",
      icon: "../../assets/car-models/nissan/nissan_micra_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Qashqai",
      icon: "../../assets/car-models/nissan/nissan_qashqai_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var volvo = 
{
  name: "volvo",
  icon: "../../assets/car-brands/volvo_logo_thumbnail.png",
  models: [
    {
      name: "S40",
      icon: "../../assets/car-models/volvo/volvo_s40_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "S60",
      icon: "../../assets/car-models/volvo/volvo_s60_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "S80",
      icon: "../../assets/car-models/volvo/volvo_s80_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "V40",
      icon: "../../assets/car-models/volvo/volvo_s40_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "V50",
      icon: "../../assets/car-models/volvo/volvo_v50_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "V60",
      icon: "../../assets/car-models/volvo/volvo_v60_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var fiat = 
{
  name: "fiat",
  icon: "../../assets/car-brands/fiat_logo_thumbnail.png",
  models: [
    {
      name: "Albea",
      icon: "../../assets/car-models/fiat/fiat_albea.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Croma",
      icon: "../../assets/car-models/fiat/fiat_croma_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Bravo",
      icon: "../../assets/car-models/fiat/fiat_bravo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Doblo",
      icon: "../../assets/car-models/fiat/fiat_doblo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Punto",
      icon: "../../assets/car-models/fiat/fiat_punto_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ] 
}

var citroen = 
{
  name: "citroen",
  icon: "../../assets/car-brands/citroen_logo_thumbnail.png",
  models: [
    {
      name: "C1",
      icon: "../../assets/car-models/citroen/citroen_c1_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C2",
      icon: "../../assets/car-models/citroen/citroen_c2.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C3",
      icon: "../../assets/car-models/citroen/citroen_c3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C4",
      icon: "../../assets/car-models/citroen/citroen_c4_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C5",
      icon: "../../assets/car-models/citroen/citroen_c5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C6",
      icon: "../../assets/car-models/citroen/citroen_c6_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "C8",
      icon: "../../assets/car-models/citroen/citroen_c8_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "Xsara",
      icon: "../../assets/car-models/citroen/citroen_xsara_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
    {
      name: "DS3",
      icon: "../../assets/car-models/citroen/citroen_ds3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          icon: "",
          engines: [
            {
              price: 69,
              hp: 150,
            }
          ]
        }
      ]
    },
  ]
}

var lexus = 
{
  name: "lexus",
  icon: "../../assets/car-brands/lexus_logo_thumbnail.png",
  models: [
    {
      name: "IS",
      icon: "../../assets/car-models/lexus/lexus_is_small.png",
      generations: [
        {
          startYear: 2005,
          endYear: 2013,
          icon: "../../assets/car-brands/lexus_logo_thumbnail.png",
          petrolEngines: [
       
          ],
          dieselEngines: [
            {
              name: "IS 200 D",
              hp: 150,
              nm: 340,
              stage1: {
                price: 300,
                stageHp: 190,
                stageNm: 440,
              }
            },
            {
              name: "IS 220 D",
              hp: 177,
              nm: 400,
              stage1: {
                price: 300,
                stageHp: 190,
                stageNm: 440,
              }
            },
          ]
        }
      ]
    },
  ]
}



var carMap = {
  cars : [
    audi, bmw, renault, volkswagen, ford, opel, mercedes, alfaromeo,
    dacia, peugeot, mazda, skoda, nissan, volvo, fiat, citroen,
    lexus
  ],

}

//#endregion
  



