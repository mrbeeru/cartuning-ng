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

  carMap : CarBrand[] = [];

  @ViewChild('stepper') stepper:MatStepper;

  constructor(
    public dialog: MatDialog,
    private tuningService: TuningService
    ) { }

  async ngOnInit(): Promise<void> { 
    this.carMap = await this.tuningService.getTuningTable();
  }

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

      this.carMap.push(result);
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
    const index = this.carMap.indexOf(carBrand);
    this.carMap.splice(index, 1);
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
    this.tuningService.updateTuningTable(this.carMap)
  }

//#endregion
}




