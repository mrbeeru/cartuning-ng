import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { CarBrand, CarEngine, CarGeneration, CarModel, TuningService } from '../_services/tuning.service';
import { TuningEditDialogComponent } from './tuning-edit-dialog/tuning-edit-dialog.component';

@Component({
  selector: 'app-tuning',
  templateUrl: './tuning.component.html',
  styleUrls: ['./tuning.component.css']
})


export class TuningComponent implements OnInit {

  displayedColumns: string[] = ['engineName', 'original', 'tuned', 'symbol', 'price'];
  dieselEngineSource : MatTableDataSource<any>;
  petrolEngineSource : MatTableDataSource<any>;

  selectedCar : CarBrand;
  selectedModel : CarModel;
  selectedGeneration : CarGeneration;

  @ViewChild('stepper') stepper:MatStepper;

  constructor(
    public dialog: MatDialog,
    private tuningService: TuningService
    ) { }

  ngOnInit(): void { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dieselEngineSource.filter = filterValue.trim().toLowerCase();
    this.petrolEngineSource.filter = filterValue.trim().toLowerCase();
  }

  selectCar(c){
    this.selectedCar = c;
    this.stepper.selected.completed = true;
    this.stepper.next();
  }

  selectModel(m){
    this.selectedModel = m;
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

//#region tuning_table_dialogs

  openAddCarBrandDialog(){
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"BRAND"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      this.carMap.cars.push(result);
    });
  }

  openEditCarBrandDialog(carBrand : CarBrand){
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method: "BRAND", originalObject: carBrand}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

        carBrand.name = result.name;
        carBrand.iconPath = result.iconPath;
    });
  }

  deleteCarBrand(carBrand: CarBrand)
  {
    const index = this.carMap.cars.indexOf(carBrand);
    this.carMap.cars.splice(index, 1);
  }

  openAddCarModelDialog(){
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"MODEL"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      this.selectedCar.models.push(result);
    });
  }

  openEditCarModelDialog(carModel: CarModel){
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"MODEL", originalObject: carModel}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

        carModel.name = result.name;
        carModel.iconPath = result.iconPath;
    });
  }

  deleteCarModel(carModel: CarModel)
  {
    const index = this.selectedCar.models.indexOf(carModel);
    this.selectedCar.models.splice(index, 1);
  }

  openAddCarMakeDialog()
  {
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"MAKE"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      this.selectedModel.generations.push(result);
    });
  }

  openEditCarMakeDialog(carMake: CarGeneration)
  {
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"MAKE", originalObject: carMake}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

        carMake.startYear = result.startYear;
        carMake.endYear = result.endYear;
        carMake.iconPath = result.iconPath;
    });
  }

  deleteCarMake(carMake: CarGeneration)
  {
    const index = this.selectedModel.generations.indexOf(carMake);
    this.selectedModel.generations.splice(index, 1);
  }

  openAddCarEngineDialog()
  {
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"ENGINE"}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      if (result.kind == "DIESEL")
        (this.selectedGeneration.dieselEngines = this.selectedGeneration.dieselEngines || []).push(result);
      else if (result.kind == "PETROL")
        (this.selectedGeneration.petrolEngines = this.selectedGeneration.petrolEngines || []).push(result);
      else
        throw new Error(`no such engine type: ${result.kind}`);

      this.dieselEngineSource.data = this.selectedGeneration.dieselEngines;
      this.petrolEngineSource.data = this.selectedGeneration.petrolEngines;
    });
  }

  openEditCarEngineDialog(carEngine: CarEngine)
  {
    const dialogRef = this.dialog.open(TuningEditDialogComponent, {data: {method:"ENGINE", originalObject: carEngine}});

    dialogRef.afterClosed().subscribe(result => {
      if (result == null)
        return;

      carEngine.kind = result.kind;
      carEngine.hp = result.hp;
      carEngine.nm = result.nm;
      carEngine.name = result.name;
      carEngine.stage1.price = result.stage1.price;
      carEngine.stage1.hp = result.stage1.hp;
      carEngine.stage1.nm = result.stage1.nm;
    });
  }

  deleteCarEngine(carEngine: CarEngine)
  {
    let index = this.selectedGeneration.dieselEngines?.indexOf(carEngine);

    if (index < 0){
      index = this.selectedGeneration.petrolEngines.indexOf(carEngine);
      this.selectedGeneration.petrolEngines.splice(index, 1);
      this.petrolEngineSource.data = this.petrolEngineSource.data;
      return;
    }

    this.selectedGeneration.dieselEngines.splice(index, 1);
    this.dieselEngineSource.data = this.dieselEngineSource.data;
  }

//#endregion


  updateTuningTable()
  {
    this.tuningService.f(this.carMap.cars)
  }

audi : CarBrand= 
{
  name: "Audi",
  iconPath: "assets/car-brands/audi_logo_thumbnail.png",
  models: [
    {
      name: "A2",
      iconPath: "assets/car-models/audi/audi_a2_small.png",
      generations: [
        {
          startYear: 1999,
          endYear: 2005,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.4 TDI ",
              hp: 90,
              nm: 230,
              stage1: {
                price: 75,
                hp: 110,
                nm: 280,
              }
            },
            {
              name: "1.4 TDI",
              hp: 75,
              nm: 195,
              stage1: {
                price: 75,
                hp: 100,
                nm: 250,
              }
            },
            {
              name: "1.2 TDI",
              hp: 61,
              nm: 140,
              stage1: {
                price: 75,
                hp: 85,
                nm: 170,
              }
            }
          ]
        }
      ]
    },
    
    {
      name: "A3",
      iconPath: "assets/car-models/audi/audi_a3_small.png",
      generations: [
        {
          startYear: 1996,
          endYear: 2003,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 90,
              nm: 210,
              stage1: {
                price: 75,
                hp: 120,
                nm: 260,
              }
            },
            {
              name: "1.9 TDI",
              hp: 100,
              nm: 240,
              stage1: {
                price: 75,
                hp: 130,
                nm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 110,
              nm: 235,
              stage1: {
                price: 75,
                hp: 140,
                nm: 310,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                hp: 160,
                nm: 380,
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
                hp: 180,
                nm: 280,
              }
            },
            {
              name: "1.8 T",
              hp: 180,
              nm: 235,
              stage1: {
                price: 250,
                hp: 210,
                nm: 310,
              }
            },
          ]
        },
        
        {
          startYear: 2003,
          endYear: 2008,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 120,
                hp: 140,
                nm: 320,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                hp: 180,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                hp: 200,
                nm: 420,
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
                hp: 240,
                nm: 340,
              }
            },
            {
              name: "S3 2.0 TFSI",
              hp: 265,
              nm: 350,
              stage1: {
                price: 350,
                hp: 300,
                nm: 420,
              }
            },
          ]
        },

        {
          startYear: 2008,
          endYear: 2012,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.6 TDI",
              hp: 90,
              nm: 230,
              stage1: {
                price: 180,
                hp: 140,
                nm: 300,
              }
            },
            {
              name: "1.6 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 180,
                hp: 140,
                nm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 120,
                hp: 140,
                nm: 320,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                hp: 200,
                nm: 420,
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
                hp: 130,
                nm: 215,
              }
            },
            {
              name: "1.4 TSI",
              hp: 125,
              nm: 200,
              stage1: {
                price: 300,
                hp: 145,
                nm: 250,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 300,
                hp: 200,
                nm: 300,
              }
            },
          ]
        },

        {
          startYear: 2012,
          endYear: 2016,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.6 TDI",
              hp: 105,
              nm: 250,
              stage1: {
                price: 180,
                hp: 140,
                nm: 300,
              }
            },
            {
              name: "1.6 TDI",
              hp: 110,
              nm: 250,
              stage1: {
                price: 250,
                hp: 140,
                nm: 300,
              }
            },
            {
              name: "2.0 TDI",
              hp: 110,
              nm: 250,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                hp: 190,
                nm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 184,
              nm: 380,
              stage1: {
                price: 250,
                hp: 220,
                nm: 440,
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
                hp: 130,
                nm: 215,
              }
            },
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                hp: 170,
                nm: 300,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 180,
              nm: 250,
              stage1: {
                price: 350,
                hp: 220,
                nm: 350,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 220,
              nm: 350,
              stage1: {
                price: 400,
                hp: 270,
                nm: 400,
              }
            },
          ]
        },
      ]
    },
    
    {
      name: "A4",
      iconPath: "assets/car-models/audi/audi_a4_small.png",
      generations: [
        {
          startYear: 2001,
          endYear: 2004,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 100,
              nm: 240,
              stage1: {
                price: 75,
                hp: 130,
                nm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 75,
                hp: 150,
                nm: 350,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                hp: 160,
                nm: 380,
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
                hp: 180,
                nm: 280,
              }
            },
            {
              name: "1.8 T",
              hp: 163,
              nm: 225,
              stage1: {
                price: 250,
                hp: 195,
                nm: 320,
              }
            },
            {
              name: "1.8 T",
              hp: 190,
              nm: 235,
              stage1: {
                price: 250,
                hp: 210,
                nm: 320,
              }
            },
          ]
        },
       
        {
          startYear: 2004,
          endYear: 2008,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 120,
                hp: 150,
                nm: 350,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                hp: 180,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                hp: 200,
                nm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 120,
                hp: 220,
                nm: 460,
              }
            },
            {
              name: "2.7 TDI",
              hp: 180,
              nm: 380,
              stage1: {
                price: 120,
                hp: 220,
                nm: 460,
              }
            },
            {
              name: "3.0 V6 TDI",
              hp: 204,
              nm: 450,
              stage1: {
                price: 120,
                hp: 275,
                nm: 540,
              }
            },
            {
              name: "3.0 V6 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 120,
                hp: 275,
                nm: 540,
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
                hp: 195,
                nm: 320,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 300,
                hp: 230,
                nm: 340,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 300,
                hp: 240,
                nm: 360,
              }
            },
            {
              name: "2.0 TFSI - DTM Eddition",
              hp: 220,
              nm: 300,
              stage1: {
                price: 300,
                hp: 240,
                nm: 360,
              }
            },
          ]
        },
        
        {
          startYear: 2008,
          endYear: 2012,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 120,
              nm: 290,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                hp: 200,
                nm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 180,
                hp: 230,
                nm: 480,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 180,
                hp: 230,
                nm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 200,
                hp: 290,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                hp: 300,
                nm: 600,
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
                hp: 200,
                nm: 300,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 350,
                hp: 200,
                nm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 420,
              stage1: {
                price: 400,
                hp: 400,
                nm: 500,
              }
            },
          ]
        
        },
        
        {
          startYear: 2012,
          endYear: 2015,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 120,
              nm: 290,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                hp: 220,
                nm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                hp: 270,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                hp: 290,
                nm: 600,
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
                hp: 145,
                nm: 250,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 170,
              nm: 320,
              stage1: {
                price: 350,
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "1.8 TFSI",
              hp: 170,
              nm: 320,
              stage1: {
                price: 350,
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TSI",
              hp: 225,
              nm: 350,
              stage1: {
                price: 400,
                hp: 300,
                nm: 440,
              }
            },
            {
              name: "3.0 V6 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2015,
          endYear: 2019,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 122,
              nm: 290,
              stage1: {
                price: 300,
                hp: 195,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 300,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 300,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                hp: 220,
                nm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 400,
              stage1: {
                price: 300,
                hp: 300,
                nm: 520,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 272,
              nm: 600,
              stage1: {
                price: 300,
                hp: 320,
                nm: 680,
              }
            },
          ]
        },
      ]
    },

    {
      name: "A5",
      iconPath: "assets/car-models/audi/audi_a5_small.png",
      generations: [
        {
          startYear: 2007,
          endYear: 2011,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 180,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 170,
              nm: 350,
              stage1: {
                price: 180,
                hp: 200,
                nm: 420,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 180,
                hp: 215,
                nm: 430,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 180,
                hp: 230,
                nm: 480,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 180,
                hp: 230,
                nm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 200,
                hp: 290,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                hp: 300,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                hp: 270,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                hp: 290,
                nm: 600,
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
                hp: 200,
                nm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
          ]
        },
        
        {
          startYear: 2011,
          endYear: 2016,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 136,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                hp: 220,
                nm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                hp: 270,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 245,
              nm: 500,
              stage1: {
                price: 250,
                hp: 290,
                nm: 600,
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
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TSI",
              hp: 225,
              nm: 350,
              stage1: {
                price: 400,
                hp: 300,
                nm: 440,
              }
            },
            {
              name: "3.0 V6 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2016,
          endYear: 2019,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI CR",
              hp: 150,
              nm: 320,
              stage1: {
                price: 300,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI CR",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                hp: 220,
                nm: 450,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 218,
              nm: 400,
              stage1: {
                price: 300,
                hp: 300,
                nm: 520,
              }
            },
            {
              name: "3.0 TDI CR",
              hp: 272,
              nm: 600,
              stage1: {
                price: 300,
                hp: 320,
                nm: 680,
              }
            },
          ],
        }
      ]
    },

    {
      name: "A6",
      iconPath: "assets/car-models/audi/audi_a6_small.png",
      generations: [
        {
          startYear: 1997,
          endYear: 2004,
          iconPath: "",
          dieselEngines: [
            {
              name: "1.9 TDI",
              hp: 110,
              nm: 235,
              stage1: {
                price: 75,
                hp: 140,
                nm: 300,
              }
            },
            {
              name: "1.9 TDI",
              hp: 115,
              nm: 285,
              stage1: {
                price: 75,
                hp: 150,
                nm: 350,
              }
            },
            {
              name: "1.9 TDI",
              hp: 130,
              nm: 310,
              stage1: {
                price: 75,
                hp: 160,
                nm: 380,
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
                hp: 190,
                nm: 320,
              }
            },
          ]
        },
        
        {
          startYear: 2004,
          endYear: 2008,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                hp: 180,
                nm: 380,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 120,
                hp: 220,
                nm: 460,
              }
            },
            {
              name: "2.7 TDI",
              hp: 180,
              nm: 380,
              stage1: {
                price: 120,
                hp: 220,
                nm: 460,
              }
            },
            {
              name: "3.0 TDI",
              hp: 225,
              nm: 450,
              stage1: {
                price: 120,
                hp: 275,
                nm: 540,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 120,
                hp: 275,
                nm: 540,
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
                hp: 240,
                nm: 360,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 250,
                hp: 240,
                nm: 360,
              }
            },
          ]
        },
        
        {
          startYear: 2008,
          endYear: 2011,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 120,
                hp: 180,
                nm: 380,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 150,
                hp: 200,
                nm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 450,
              stage1: {
                price: 150,
                hp: 230,
                nm: 520,
              }
            },
            {
              name: "2.7 TDI",
              hp: 190,
              nm: 450,
              stage1: {
                price: 150,
                hp: 230,
                nm: 520,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 180,
                hp: 290,
                nm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 180,
                hp: 290,
                nm: 580,
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
                hp: 240,
                nm: 360,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 420,
              stage1: {
                price: 300,
                hp: 400,
                nm: 520,
              }
            },
          ]
        },
        
        {
          startYear: 2011,
          endYear: 2018,
          iconPath: "",
          dieselEngines: [
            {
              name: "2.0 TDI",
              hp: 136,
              nm: 320,
              stage1: {
                price: 200,
                hp: 185,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 350,
              stage1: {
                price: 200,
                hp: 190,
                nm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 150,
              stage1: {
                price: 200,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 200,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 250,
                hp: 220,
                nm: 450,
              }
            },
            

            {
              name: "3.0 TDI",
              hp: 190,
              nm: 500,
              stage1: {
                price: 250,
                hp: 300,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                hp: 270,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                hp: 320,
                nm: 620,
              }
            },

            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 200,
                hp: 295,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 580,
              stage1: {
                price: 250,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 BI TDI",
              hp: 313,
              nm: 650,
              stage1: {
                price: 300,
                hp: 350,
                nm: 720,
              }
            },
            {
              name: "3.0 BI TDI Competition",
              hp: 326,
              nm: 650,
              stage1: {
                price: 300,
                hp: 400,
                nm: 740,
              }
            },
            {
              name: "3.0 TDI",
              hp: 320,
              nm: 650,
              stage1: {
                price: 300,
                hp: 400,
                nm: 750,
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
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                hp: 260,
                nm: 420,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 252,
              nm: 370,
              stage1: {
                price: 350,
                hp: 300,
                nm: 440,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 300,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
              }
            },
          ]
        },
      ]
    },

    {
      name: "A7",
      iconPath: "assets/car-models/audi/audi_a7_small.png",
      generations: [
        {
          startYear: 2010,
          endYear: 2018,
          iconPath: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 190,
              nm: 320,
              stage1: {
                price: 350,
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 252,
              nm: 370,
              stage1: {
                price: 350,
                hp: 300,
                nm: 440,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 300,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 500,
                hp: 400,
                nm: 520,
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
                hp: 300,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 204,
              nm: 400,
              stage1: {
                price: 250,
                hp: 270,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 250,
                hp: 320,
                nm: 620,
              }
            },

            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 200,
                hp: 295,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 580,
              stage1: {
                price: 250,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 BI TDI",
              hp: 313,
              nm: 650,
              stage1: {
                price: 300,
                hp: 350,
                nm: 720,
              }
            },
            {
              name: "3.0 BI TDI Competition",
              hp: 326,
              nm: 650,
              stage1: {
                price: 300,
                hp: 400,
                nm: 740,
              }
            },
            {
              name: "3.0 TDI",
              hp: 320,
              nm: 650,
              stage1: {
                price: 300,
                hp: 400,
                nm: 750,
              }
            },
          ],
          
        }
      ]
    },

    {
      name: "A8",
      iconPath: "assets/car-models/audi/audi_a8_small.png",
      generations: [
        {
          startYear: 2003,
          endYear: 2010,
          iconPath: "",
          petrolEngines: [
            
          ],
          dieselEngines: [
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 450,
              stage1: {
                price: 180,
                hp: 275,
                nm: 540,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 450,
              stage1: {
                price: 180,
                hp: 275,
                nm: 540,
              }
            },
            {
              name: "4.0 V8 TDI",
              hp: 275,
              nm: 650,
              stage1: {
                price: 200,
                hp: 330,
                nm: 670,
              }
            },
          ],
          
        },
        {
          startYear: 2010,
          endYear: 2016,
          iconPath: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 290,
              nm: 400,
              stage1: {
                price: 350,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 310,
              nm: 440,
              stage1: {
                price: 350,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "4.0 TFSI",
              hp: 420,
              nm: 550,
              stage1: {
                price: 350,
                hp: 540,
                nm: 800,
              }
            },
            {
              name: "4.0 TFSI",
              hp: 435,
              nm: 600,
              stage1: {
                price: 400,
                hp: 540,
                nm: 800,
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
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 250,
              nm: 550,
              stage1: {
                price: 300,
                hp: 310,
                nm: 650,
              },
            },
            {
              name: "3.0 TDI",
              hp: 258,
              nm: 580,
              stage1: {
                price: 300,
                hp: 310,
                nm: 650,
              }
            },
            {
              name: "3.0 TDI",
              hp: 262,
              nm: 580,
              stage1: {
                price: 300,
                hp: 310,
                nm: 650,
              }
            },
            {
              name: "3.0 V6 BI TDI",
              hp: 313,
              nm: 560,
              stage1: {
                price: 300,
                hp: 350,
                nm: 720,
              }
            },
            
            {
              name: "4.2 V8 TDI",
              hp: 350,
              nm: 800,
              stage1: {
                price: 300,
                hp: 400,
                nm: 900,
              }
            },
            {
              name: "4.0 V8 TDI",
              hp: 385,
              nm: 850,
              stage1: {
                price: 300,
                hp: 485,
                nm: 950,
              }
            },
          ],
        },
        {
          startYear: 2016,
          endYear: 2018,
          iconPath: "",
          petrolEngines: [
            {
              name: "4.0 TFSI",
              hp: 580,
              nm: 800,
              stage1: {
                price: 650,
                hp: 680,
                nm: 900,
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
                hp: 350,
                nm: 720,
              }
            },
          ],
		    }
      ]
    },

    {
      name: "Q3",
      iconPath: "assets/car-models/audi/audi_q3_small.png",
      generations: [
        {
          startYear: 2011,
          endYear: 2015,
          iconPath: "assets/car-models/audi/audi_q3_small.png",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                hp: 170,
                nm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 170,
              nm: 280,
              stage1: {
                price: 300,
                hp: 250,
                nm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 300,
                hp: 250,
                nm: 400,
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
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 140,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
			    ],
        },
        {
          startYear: 2015,
          endYear: 2018,
          iconPath: "",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 125,
              nm: 220,
              stage1: {
                price: 300,
                hp: 170,
                nm: 300,
              }
            },
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                hp: 170,
                nm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                hp: 260,
                nm: 440,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 220,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 440,
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
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 340,
              stage1: {
                price: 300,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 184,
              nm: 380,
              stage1: {
                price: 350,
                hp: 220,
                nm: 450,
              }
            },
          ]
        }
      ]
    },

    {
      name: "Q5",
      iconPath: "assets/car-models/audi/audi_q5_small.png",
      generations: [
        {
          startYear: 2008,
          endYear: 2012,
          iconPath: "",
          petrolEngines: [
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 280,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
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
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 143,
              nm: 320,
              stage1: {
                price: 250,
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 350,
              stage1: {
                price: 250,
                hp: 205,
                nm: 420,
              }
            },
            {
              name: "2.0 TDI",
              hp: 170,
              nm: 350,
              stage1: {
                price: 250,
                hp: 205,
                nm: 420,
              }
            },
            {
              name: "2.7 TDI",
              hp: 163,
              nm: 400,
              stage1: {
                price: 250,
                hp: 230,
                nm: 480,
              }
            },
            {
              name: "3.0 TDI",
              hp: 211,
              nm: 500,
              stage1: {
                price: 250,
                hp: 280,
                nm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 500,
              stage1: {
                price: 250,
                hp: 290,
                nm: 580,
              }
            },
			    ],
        },
        
        {
          startYear: 2012,
          endYear: 2016,
          iconPath: "",
          petrolEngines: [
            {
              name: "1.4 TFSI",
              hp: 150,
              nm: 250,
              stage1: {
                price: 300,
                hp: 180,
                nm: 300,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 180,
              nm: 320,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 230,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 400,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 354,
              nm: 470,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
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
                hp: 185,
                nm: 410,
              }
            },
            {
              name: "2.0 TDI",
              hp: 150,
              nm: 320,
              stage1: {
                price: 250,
                hp: 190,
                nm: 400,
              }
            },
            {
              name: "2.0 TDI",
              hp: 163,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 177,
              nm: 380,
              stage1: {
                price: 250,
                hp: 210,
                nm: 430,
              }
            },
            {
              name: "2.0 TDI",
              hp: 190,
              nm: 400,
              stage1: {
                price: 300,
                hp: 215,
                nm: 450,
              }
            },
            {
              name: "3.0 TDI",
              hp: 245,
              nm: 580,
              stage1: {
                price: 300,
                hp: 290,
                nm: 650,
              }
            },
            {
              name: "3.0 TDI",
              hp: 258,
              nm: 580,
              stage1: {
                price: 300,
                hp: 310,
                nm: 650,
              }
            },
          ]
        }
      ]
    },

    {
      name: "Q7",
      iconPath: "assets/car-models/audi/audi_q7_small.png",
      generations: [
        {
          startYear: 2006,
          endYear: 2010,
          iconPath: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
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
                hp: 280,
                nm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 233,
              nm: 500,
              stage1: {
                price: 200,
                hp: 280,
                nm: 580,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 550,
              stage1: {
                price: 200,
                hp: 290,
                nm: 600,
              }
            },
            {
              name: "4.2 TDI",
              hp: 326,
              nm: 760,
              stage1: {
                price: 250,
                hp: 375,
                nm: 880,
              }
            },
            {
              name: "6.0 TDI",
              hp: 500,
              nm: 1000,
              stage1: {
                price: 300,
                hp: 600,
                nm: 1200,
              }
            },
          ]
        },
        
        {
          startYear: 2010,
          endYear: 2015,
          iconPath: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 272,
              nm: 400,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
              }
            },
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 400,
                hp: 400,
                nm: 520,
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
                hp: 270,
                nm: 570,
              }
            },
            {
              name: "3.0 TDI",
              hp: 240,
              nm: 550,
              stage1: {
                price: 300,
                hp: 290,
                nm: 600,
              }
            },
            {
              name: "3.0 TDI",
              hp: 245,
              nm: 500,
              stage1: {
                price: 300,
                hp: 290,
                nm: 600,
              }
            },
            {
              name: "4.2 TDI",
              hp: 340,
              nm: 760,
              stage1: {
                price: 300,
                hp: 390,
                nm: 880,
              }
            },
            {
              name: "6.0 TDI",
              hp: 500,
              nm: 1000,
              stage1: {
                price: 350,
                hp: 600,
                nm: 1200,
              }
            },
          ]
        },

        {
          startYear: 2015,
          endYear: 2019,
          iconPath: "",
          petrolEngines: [
            {
              name: "3.0 TFSI",
              hp: 333,
              nm: 440,
              stage1: {
                price: 600,
                hp: 400,
                nm: 520,
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
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 218,
              nm: 500,
              stage1: {
                price: 350,
                hp: 320,
                nm: 680,
              }
            },
            {
              name: "3.0 TDI",
              hp: 272,
              nm: 600,
              stage1: {
                price: 350,
                hp: 320,
                nm: 680,
              }
            },
          ]
        }
      ]
    },

    {
      name: "TT",
      iconPath: "assets/car-models/audi/audi_tt_small.png",
      generations: [
        {
          startYear: 1997,
          endYear: 2006,
          iconPath: "assets/car-models/audi/audi_tt_small.png",
          petrolEngines: [
            {
              name: "1.8 T",
              hp: 150,
              nm: 210,
              stage1: {
                price: 200,
                hp: 190,
                nm: 320,
              }
            },
            {
              name: "1.8 T",
              hp: 180,
              nm: 235,
              stage1: {
                price: 200,
                hp: 210,
                nm: 340,
              }
            },
            {
              name: "1.8 T",
              hp: 225,
              nm: 280,
              stage1: {
                price: 250,
                hp: 250,
                nm: 350,
              }
            },
          ],
          dieselEngines: [
           
          ]
        },
        
        {
          startYear: 2006,
          endYear: 2014,
          iconPath: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 160,
              nm: 250,
              stage1: {
                price: 300,
                hp: 210,
                nm: 320,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 200,
              nm: 280,
              stage1: {
                price: 350,
                hp: 260,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 211,
              nm: 350,
              stage1: {
                price: 350,
                hp: 260,
                nm: 380,
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
                hp: 205,
                nm: 420,
              }
            },
          ]
        },

        {
          startYear: 2014,
          endYear: 2018,
          iconPath: "",
          petrolEngines: [
            {
              name: "1.8 TFSI",
              hp: 180,
              nm: 250,
              stage1: {
                price: 400,
                hp: 220,
                nm: 380,
              }
            },
            {
              name: "2.0 TFSI",
              hp: 230,
              nm: 370,
              stage1: {
                price: 400,
                hp: 300,
                nm: 440,
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
                hp: 220,
                nm: 450,
              }
            },
          ]
        }
      ]
    }
  ]
}

bmw : CarBrand= 
{
  name: "Bmw",
  iconPath: "assets/car-brands/bmw_logo_thumbnail.png",
  models: [
    {
      name: "Seria 1",
      iconPath: "assets/car-models/bmw/bmw_series1_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Seria 3",
      iconPath: "assets/car-models/bmw/bmw_series3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Seria 5",
      iconPath: "assets/car-models/bmw/bmw_series5.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Seria 7",
      iconPath: "assets/car-models/bmw/bmw_series7_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "X3",
      iconPath: "assets/car-models/bmw/bmw_x3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "X5",
      iconPath: "assets/car-models/bmw/bmw_x5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

renault : CarBrand= 
{
  name: "Renault",
  iconPath: "assets/car-brands/renault_logo_thumbnail.png",
  models: [
    {
      name: "Laguna",
      iconPath: "assets/car-models/renault/laguna_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Megane",
      iconPath: "assets/car-models/renault/megane_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Clio",
      iconPath: "assets/car-models/renault/clio_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Espace",
      iconPath: "assets/car-models/renault/espace_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Fluence",
      iconPath: "assets/car-models/renault/fluence_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Modus",
      iconPath: "assets/car-models/renault/modus_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Latitude",
      iconPath: "assets/car-models/renault/latitude_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Scenic",
      iconPath: "assets/car-models/renault/scenic_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Trafic",
      iconPath: "assets/car-models/renault/trafic_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Vel Satis",
      iconPath: "assets/car-models/renault/vel_satis_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
  
}

volkswagen : CarBrand= 
{
  name: "Volkswagen",
  iconPath: "assets/car-brands/volkswagen_logo_thumbnail.png"  ,
  models: [
    {
      name: "Bora",
      iconPath: "assets/car-models/vw/vw_bora_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Golf",
      iconPath: "assets/car-models/vw/vw_golf_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Passat",
      iconPath: "assets/car-models/vw/vw_passat_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Jetta",
      iconPath: "assets/car-models/vw/vw_jetta_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Caddy",
      iconPath: "assets/car-models/vw/vw_caddy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Sharan",
      iconPath: "assets/car-models/vw/vw_sharan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Tiguan",
      iconPath: "assets/car-models/vw/vw_tiguan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Touareg",
      iconPath: "assets/car-models/vw/vw_touareg_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Touran",
      iconPath: "assets/car-models/vw/vw_touran_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

ford : CarBrand= 
{
  name: "Ford",
  iconPath: "assets/car-brands/ford_logo_thumbnail.png",
  models: [
    {
      name: "Mondeo",
      iconPath: "assets/car-models/ford/ford_mondeo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Fiesta",
      iconPath: "assets/car-models/ford/ford_fiesta_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Focus",
      iconPath: "assets/car-models/ford/ford_focus_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Galaxy",
      iconPath: "assets/car-models/ford/ford_galaxy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C Max",
      iconPath: "assets/car-models/ford/ford_cmax_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "S Max",
      iconPath: "assets/car-models/ford/ford_smax_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

opel : CarBrand= 
{
  name: "Opel",
  iconPath: "assets/car-brands/opel_logo_thumbnail.png",
  models: [
    {
      name: "Astra",
      iconPath: "assets/car-models/opel/opel_astra_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Vectra",
      iconPath: "assets/car-models/opel/opel_vectra.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Insignia",
      iconPath: "assets/car-models/opel/opel_insignia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Corsa",
      iconPath: "assets/car-models/opel/opel_corsa_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Agila",
      iconPath: "assets/car-models/opel/opel_agila_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Antara",
      iconPath: "assets/car-models/opel/opel_antara_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Meriva",
      iconPath: "assets/car-models/opel/opel_meriva_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Vivaro",
      iconPath: "assets/car-models/opel/opel_vivaro_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Zafira",
      iconPath: "assets/car-models/opel/opel_zafira_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Signum",
      iconPath: "assets/car-models/opel/opel_signum_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

mercedes : CarBrand = 
{
  name: "Mercedes",
  iconPath: "assets/car-brands/mercedes_logo_thumbnail.png",
  models: [
    {
      name: "A Class",
      iconPath: "assets/car-models/mercedes/mercedes_aclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C Class",
      iconPath: "assets/car-models/mercedes/mercedes_cclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "E Class",
      iconPath: "assets/car-models/mercedes/mercedes_eclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "S Class",
      iconPath: "assets/car-models/mercedes/mercedes_sclass_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Vito",
      iconPath: "assets/car-models/mercedes/mercedes_vito_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

alfaromeo : CarBrand = 
{
  name: "Alfa Romeo",
  iconPath: "assets/car-brands/alfaromeo_logo_thumbnail.png",
  models: [
    {
      name: "147",
      iconPath: "assets/car-models/alfaromeo/alfaromeo_147_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "156",
      iconPath: "assets/car-models/alfaromeo/alfaromeo_156_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "159",
      iconPath: "assets/car-models/alfaromeo/alfaromeo_159_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

dacia : CarBrand = 
{
  name: "Dacia",
  iconPath: "assets/car-brands/dacia_logo_thumbnail.png",
  models: [
    {
      name: "Duster",
      iconPath: "assets/car-models/dacia/dacia_duster_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Logan",
      iconPath: "assets/car-models/dacia/dacia_logan_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Sandero",
      iconPath: "assets/car-models/dacia/dacia_sandero_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Lodgy",
      iconPath: "assets/car-models/dacia/dacia_lodgy_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Dokker",
      iconPath: "assets/car-models/dacia/dacia_dokker_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

peugeot : CarBrand = 
{
  name: "Peugeot",
  iconPath: "assets/car-brands/peugeot_logo_thumbnail.png",
  models: [
    {
      name: "206",
      iconPath: "assets/car-models/peugeot/peugeot_206_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "207",
      iconPath: "assets/car-models/peugeot/peugeot_207_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "307",
      iconPath: "assets/car-models/peugeot/peugeot_307_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "407",
      iconPath: "assets/car-models/peugeot/peugeot_407_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "508",
      iconPath: "assets/car-models/peugeot/peugeot_508_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "607",
      iconPath: "assets/car-models/peugeot/peugeot_607_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Partner",
      iconPath: "assets/car-models/peugeot/peugeot_partner_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

mazda : CarBrand = 
{
  name: "Mazda",
  iconPath: "assets/car-brands/mazda_logo_thumbnail.png",
  models: [
    {
      name: "3",
      iconPath: "assets/car-models/mazda/mazda_3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "5",
      iconPath: "assets/car-models/mazda/mazda_5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "6",
      iconPath: "assets/car-models/mazda/mazda_6.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

skoda : CarBrand = 
{
  name: "Skoda",
  iconPath: "assets/car-brands/skoda_logo_thumbnail.png",
  models: [
    {
      name: "Fabia",
      iconPath: "assets/car-models/skoda/skoda_fabia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Octavia",
      iconPath: "assets/car-models/skoda/skoda_octavia_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Superb",
      iconPath: "assets/car-models/skoda/skoda_superb_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

nissan : CarBrand = 
{
  name: "nissan",
  iconPath: "assets/car-brands/nissan_logo_thumbnail.png",
  models: [
    {
      name: "Almera",
      iconPath: "assets/car-models/nissan/nissan_almera_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Micra",
      iconPath: "assets/car-models/nissan/nissan_micra_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Qashqai",
      iconPath: "assets/car-models/nissan/nissan_qashqai_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

volvo : CarBrand = 
{
  name: "volvo",
  iconPath: "assets/car-brands/volvo_logo_thumbnail.png",
  models: [
    {
      name: "S40",
      iconPath: "assets/car-models/volvo/volvo_s40_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "S60",
      iconPath: "assets/car-models/volvo/volvo_s60_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "S80",
      iconPath: "assets/car-models/volvo/volvo_s80_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "V40",
      iconPath: "assets/car-models/volvo/volvo_s40_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "V50",
      iconPath: "assets/car-models/volvo/volvo_v50_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "V60",
      iconPath: "assets/car-models/volvo/volvo_v60_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

fiat : CarBrand = 
{
  name: "fiat",
  iconPath: "assets/car-brands/fiat_logo_thumbnail.png",
  models: [
    {
      name: "Albea",
      iconPath: "assets/car-models/fiat/fiat_albea.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Croma",
      iconPath: "assets/car-models/fiat/fiat_croma_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Bravo",
      iconPath: "assets/car-models/fiat/fiat_bravo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Doblo",
      iconPath: "assets/car-models/fiat/fiat_doblo_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Punto",
      iconPath: "assets/car-models/fiat/fiat_punto_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ] 
}

citroen : CarBrand = 
{
  name: "citroen",
  iconPath: "assets/car-brands/citroen_logo_thumbnail.png",
  models: [
    {
      name: "C1",
      iconPath: "assets/car-models/citroen/citroen_c1_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C2",
      iconPath: "assets/car-models/citroen/citroen_c2.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C3",
      iconPath: "assets/car-models/citroen/citroen_c3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C4",
      iconPath: "assets/car-models/citroen/citroen_c4_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C5",
      iconPath: "assets/car-models/citroen/citroen_c5_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C6",
      iconPath: "assets/car-models/citroen/citroen_c6_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "C8",
      iconPath: "assets/car-models/citroen/citroen_c8_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "Xsara",
      iconPath: "assets/car-models/citroen/citroen_xsara_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
    {
      name: "DS3",
      iconPath: "assets/car-models/citroen/citroen_ds3_small.png",
      generations: [
        {
          startYear: 2000,
          endYear: 2010,
          iconPath: "",
        }
      ]
    },
  ]
}

lexus : CarBrand = 
{
  name: "lexus",
  iconPath: "assets/car-brands/lexus_logo_thumbnail.png",
  models: [
    {
      name: "IS",
      iconPath: "assets/car-models/lexus/lexus_is_small.png",
      generations: [
        {
          startYear: 2005,
          endYear: 2013,
          iconPath: "assets/car-brands/lexus_logo_thumbnail.png",
          petrolEngines: [
       
          ],
          dieselEngines: [
            {
              name: "IS 200 D",
              hp: 150,
              nm: 340,
              stage1: {
                price: 300,
                hp: 190,
                nm: 440,
              }
            },
            {
              name: "IS 220 D",
              hp: 177,
              nm: 400,
              stage1: {
                price: 300,
                hp: 190,
                nm: 440,
              }
            },
          ]
        }
      ]
    },
  ]
}



carMap = {
  cars : [
    this.audi, this.bmw, this.renault, this.volkswagen, this.ford, this.opel, this.mercedes, this.alfaromeo,
    this.dacia, this.peugeot, this.mazda, this.skoda, this.nissan, this.volvo, this.fiat, this.citroen,
    this.lexus
  ],

}

//#endregion
}




