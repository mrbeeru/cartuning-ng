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
    brand: string;
    model: string;
    year: string;
    engine: string;
    clutch: string;
    ecu: string;
}