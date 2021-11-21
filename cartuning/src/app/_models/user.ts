import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Account {
    id: string;
    jwt: string;
    email: string;

    permission: Permission
}

export class Permission {
    flags: PermissionFlags;
}

export enum PermissionFlags {
    None = 0,
    CanEditTuningTable = 1,
}

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
    ownerId: any;

    createdAt: Date;
    status: string;
    brand: string;
    model: string;
    year: number;
    engine: string;
    clutch: string;
    ecu: string;
    ecuFile: EcuFile;
}

export class EcuFile {
    fileId: any;
    metadata: {
        name: string,
        size: number,
        type: string,        
    };
    content: any;
}