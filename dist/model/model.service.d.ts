import { User } from './table/user.model';
export declare class ModelService {
    private userModel;
    constructor(userModel: typeof User);
    createUser(user: string, account: string, balance: number, privateKey: string, publicKey: string): Promise<any>;
    getUser(id: string): Promise<{
        data: any;
    }>;
    getAllusers(): Promise<any>;
    Update(id: number, balance: number): Promise<any>;
}
