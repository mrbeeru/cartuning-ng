import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { PermissionFlags } from "../_models/user";
import { AccountService } from "./account.service";

@Injectable({ providedIn: 'root' })
export class TuningService {
    constructor(
        private http: HttpClient,
        private accountService: AccountService,
    ) {

    }

    async updateTuningTableAsync(cars : CarBrand[]) {
        var authHeader = this.addTokenToHeader(this.accountService.accountValue?.jwt)
        await this.http.post(`${environment.appUrl}/TuningCatalog`, cars, {headers: authHeader}).toPromise();
    }

    async getTuningTable() : Promise<CarBrand[]>
    {
        return await this.http.get<CarBrand[]>(`${environment.appUrl}/TuningCatalog`).toPromise();
    }

    canEditTuningTable(){
        return this.accountService.hasPermission(PermissionFlags.CanEditTuningTable);
    }

    addTokenToHeader(jwt) : HttpHeaders{
        return new HttpHeaders().set("Authorization", "Bearer " + jwt);
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