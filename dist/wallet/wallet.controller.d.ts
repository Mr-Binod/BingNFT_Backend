import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    createWallet(data: {
        user: string;
        Userbalance: number;
    }): Promise<WalletService>;
    getWallet(): {
        data: string;
    };
    getWallets(): {
        data: string[];
    };
}
