import { Model } from "sequelize-typescript";
export declare class User extends Model {
    user: string;
    account: string;
    balance: number;
    privateKey: string;
    publicKey: string;
}
