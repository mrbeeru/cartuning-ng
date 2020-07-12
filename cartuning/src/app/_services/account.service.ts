import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
import { User, Order } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public onLogin: EventEmitter<any> = new EventEmitter();
    public onLogout: EventEmitter<any> = new EventEmitter();
    
    private environment : any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();

        this.environment = {};
        this.environment.apiUrl = 'http://localhost:44444';
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<User>(`${this.environment.apiUrl}/api/account/authenticate`, { username, password })
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
        return this.http.post(`${this.environment.apiUrl}/api/account/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${this.environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${this.environment.apiUrl}/users/${id}`);
    }

    getOrders(){
        const options = {
            headers: new HttpHeaders().append('ownerid', this.userValue._id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')
        }

        return this.http.get<any>(`${this.environment.apiUrl}/api/user/orders`, options);
    }

    placeOrder(order: Order){
        const options = {
            headers: new HttpHeaders().append('Authorization', 'Bearer fake-jwt-token'),
            reportProgress: true,
        }
        
        order.ownerId = this.userValue._id;
        return this.http.post(`${this.environment.apiUrl}/api/user/place-order`, order, options);
    }

    deleteOrder(order: Order){
        const options = {
            headers: new HttpHeaders().append('id', this.userValue._id.toString())
                                    .append('Authorization', 'Bearer fake-jwt-token')}

        return this.http.delete(`${this.environment.apiUrl}/api/user/orders/${order._id}`, options);
    }

    update(id, params) {
        return this.http.put(`${this.environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue._id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${this.environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue._id) {
                    this.logout();
                }
                return x;
            }));
    }
}