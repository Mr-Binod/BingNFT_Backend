import { IWallet } from 'src/wallet/wallet.interface';
export declare class WalletService implements IWallet {
    user: string;
    account: string;
    privateKey: string;
    publicKey: string;
    balance: number;
    constructor();
    init(user: string): void;
    static createWallet(wallet: WalletService): void;
    getWallets(): string[];
    getWallet(): string[];
    setPrivateKey(): string;
    setPublicKey(): string;
    setAccount(): string;
}
