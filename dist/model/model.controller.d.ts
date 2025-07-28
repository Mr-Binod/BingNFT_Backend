import { ModelService } from './model.service';
import { IWallet } from 'src/wallet/wallet.interface';
export declare class ModelController {
    private readonly modelService;
    constructor(modelService: ModelService);
    createUser(body: {
        wallet: IWallet;
        Userbalance: number;
    }): Promise<import("./table/user.model").User | undefined>;
    getUser(id: string): Promise<{
        data: any;
    }>;
    getAllusers(): Promise<any[] | undefined>;
    patchBalance(body: {
        id: number;
        balance: number;
    }): Promise<any>;
}
