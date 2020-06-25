import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    avatar: string;
    orders?: Order[];
}

export class Order {
    id: number;
    createdAt: Date;
    status: string;

    brand: string;
    model: string;
    year: string;
    engine: string;
    clutch: string;
    ecu: string;
}