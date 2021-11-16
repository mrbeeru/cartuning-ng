import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { User, Order, Account } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public onLogin: EventEmitter<any> = new EventEmitter();
    public onLogout: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    async loginNew(email, password) : Promise<string>
    {
        return await this.http.post<string>(`${environment.apiUrl}/account/auth/default`, { "email": email, "password": password }).toPromise();
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/account/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.onLogin.emit(user);
                console.log(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.onLogout.emit();
        //this.router.navigate(['/account/login']);
    }

    register(user: User) {
        console.log(user);
        return this.http.post(`${environment.apiUrl}/account/register`, user);
    }

    getOrders(){
        const options = {
            headers: new HttpHeaders().append('ownerid', this.userValue._id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')
        }

        return this.http.get<any>(`${environment.apiUrl}/user/orders`, options);
    }

    getOrderById(orderId: string){
        const options = {
            headers: new HttpHeaders().append('ownerid', this.userValue._id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')
        }

        return this.http.get<Order>(`${environment.apiUrl}/user/orders/${orderId}`, options);
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

        order.ownerId = this.userValue._id;
        return this.http.post(`${environment.apiUrl}/user/place-order`, order, {
            headers: new HttpHeaders().append('Authorization', 'Bearer fake-jwt-token'),
            reportProgress: true,
            observe: 'events',
        });
    }

    deleteOrder(order: Order){
        const options = {
            headers: new HttpHeaders().append('id', this.userValue._id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')}

        return this.http.delete(`${environment.apiUrl}/user/orders/${order._id}`, options);
    }


  
}