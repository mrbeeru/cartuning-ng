import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TuningService {
    constructor(
        private http: HttpClient
    ) {

    }

    async f(cars : CarBrand[]) {
        await this.http.post(`${environment.appUrl}/TuningCatalog`, cars).toPromise();
    }
}


//#region exported_interfaces

export interface CarBrand {
    name: string;
    iconPath: string;
    models: CarModel[];
}

export interface CarModel {
    name: string;
    iconPath: string;
    generations: CarGeneration[];
}

export interface CarGeneration {
    startYear: number;
    endYear: number;
    iconPath: string;
    dieselEngines?: CarEngine[];
    petrolEngines?: CarEngine[];
}

export interface CarEngine {
    kind?: string;
    name: string;
    hp: number;
    nm: number;
    stage1: CarEngineStage;
    // stage2: CarEngineStage;
    // stage3: CarEngineStage;
}

export interface CarEngineStage {
    price: number;
    hp: number;
    nm: number;
}

//#endregion