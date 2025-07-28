import { Model } from "sequelize";
export declare class SmartAccInfo extends Model {
    user: string;
    UserAddress: string;
    smartAcc: string;
    privateKey: string;
    checkWhitelist: boolean;
}
