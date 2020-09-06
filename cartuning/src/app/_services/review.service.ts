import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ReviewService {
   
    private environment : any;
    
    constructor(
        private http: HttpClient
    ) {
        this.environment = {};
        this.environment.apiUrl = 'http://localhost:44444/api/reviews';
    }

    getFacebookReviews(){
        return this.http.get<any[]>(`${this.environment.apiUrl}/facebook`);
    }
}