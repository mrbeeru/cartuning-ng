import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class User {
    _id: any;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    avatar: string;
    orders?: Order[];
}

export class Order {
    _id: any;
    createdAt: Date;
    status: string;

    brand: string;
    model: string;
    year: number;
    engine: string;
    clutch: string;
    ecu: string;
    ownerId: any;
    file: File;
}