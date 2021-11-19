import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import jwt_decode from 'jwt-decode'

// import { environment } from '@environments/environment';
import { User, Order, Account } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;

    public onLogin: EventEmitter<any> = new EventEmitter();
    public onLogout: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('account')));
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    async loginNewAsync(email: string, password: string) : Promise<Account>
    {
        const response = await this.http.post<{jwt: string}>(`${environment.authUrl}/account/auth/default`, { "email": email, "password": password }).toPromise();
        const decodedJwt : {email: string, id: string} = jwt_decode(response.jwt);

        let account: Account = {
            email: decodedJwt.email,
            id: decodedJwt.id,
            jwt: response.jwt,
        }

        localStorage.setItem('account', JSON.stringify(account));

        this.accountSubject.next(account);
        this.onLogin.emit(account);

        return account;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('account');
        this.accountSubject.next(null);
        this.onLogout.emit();
        this.router.navigate(['/auth/login']);
    }

    async registerNewAsync(email: string, username: string, password: string)
    {
        await this.http.post(`${environment.authUrl}/account/register`, {email: email, username: username, password: password}).toPromise();
    }

    getOrders(){
        const options = {
            headers: new HttpHeaders().append('ownerid', this.accountValue.id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')
        }

        return this.http.get<any>(`${environment.authUrl}/user/orders`, options);
    }

    getOrderById(orderId: string){
        const options = {
            headers: new HttpHeaders().append('ownerid', this.accountValue.id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')
        }

        return this.http.get<Order>(`${environment.authUrl}/user/orders/${orderId}`, options);
    }

    placeOrder(order: Order){
        
        // Typescript needs to be able to infer the observe and responseType values statically, 
        // in order to choose the correct return type for get(). 
        // If you pass in an improperly typed options object, it can't infer the right return type.
        
        // const options = {
        //     headers: new HttpHeaders().append('Authorization', 'Bearer fake-jwt-token'),
        //     reportProgress: true,
        //     observe: 'events',
        // }

        order.ownerId = this.accountValue.id;
        return this.http.post(`${environment.authUrl}/user/place-order`, order, {
            headers: new HttpHeaders().append('Authorization', 'Bearer fake-jwt-token'),
            reportProgress: true,
            observe: 'events',
        });
    }

    deleteOrder(order: Order){
        const options = {
            headers: new HttpHeaders().append('id', this.accountValue.id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')}

        return this.http.delete(`${environment.authUrl}/user/orders/${order._id}`, options);
    }


  
}