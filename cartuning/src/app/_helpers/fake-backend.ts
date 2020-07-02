import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { getLocaleDateTimeFormat } from '@angular/common';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/account/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api/account/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.match('/api/user/orders') && method === 'GET':
                    return getOrders();
                case url.match('/api/user/place-order') && method === 'POST':
                    return placeOrder();
                case url.match(/\/orders\/\d+$/) && method === 'DELETE':
                    return deleteOrder();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token',
                avatar: user.avatar,
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getOrders(){
            if (isLoggedIn()){
                let user = users.find(x => x.id.toString() === headers.get('id'));
                return of(new HttpResponse({ status: 200, body: user.orders }));
            }

            return unauthorized();
        }

        function placeOrder(){
            if (!isLoggedIn())
                return unauthorized();

            let user = users.find(x => x.id.toString() === headers.get('id'));

            let order = JSON.parse(JSON.stringify(body));

            order.id = user.orders?.length > 0 ?  Math.max(...user.orders.map(x => x.id)) + 1 : 1;
            order.createdAt = Date.now();
            order.status = 'New';
            (user.orders = user.orders || []).push(order);
            
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function deleteOrder(){
            if (!isLoggedIn()) 
                return unauthorized();

            let user = users.find(x => x.id.toString() === headers.get('id'));

            const orderId = idFromUrl();
            const idx = user.orders.findIndex(x => x.id == orderId);

            if (idx >= 0){
                user.orders.splice(idx, 1);
                localStorage.setItem('users', JSON.stringify(users));
                return ok();
            }

            return notFound();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function notFound() {
            return throwError({ status: 404, error: {message: 'Not found'} });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

      
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};