import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { SellNftDto } from './dto/sellnft.dto';
import { BuyCancelNftDto } from './dto/buy-cancel.dto';
import { NftUriDto } from './dto/nft-uri.dto';
import { createNftUriDto } from './dto/createnft.dto';
import { BuynftDto } from './dto/Buynft.dto';
export declare class ContractsController {
    private readonly contractsService;
    constructor(contractsService: ContractsService);
    create(data: CreateContractDto): Promise<{
        state: number;
        message: any;
    }>;
    createSell(data: SellNftDto): Promise<{
        state: number;
        message: any;
    }>;
    ContractCreateSell(data: SellNftDto): Promise<{
        state: number;
        message: any;
    }>;
    CreateNFT(data: createNftUriDto): Promise<{
        state: number;
        message: any;
    }>;
    CreateNftdb(data: NftUriDto): Promise<{
        state: number;
        message: any;
    }>;
    createUserNft(data: CreateContractDto): Promise<{
        state: number;
        message: any;
    }>;
    PostBuyNft(data: BuynftDto): Promise<{
        state: number;
        message: any;
        messate?: undefined;
    } | {
        state: number;
        messate: string;
        message?: undefined;
    }>;
    ContractBuyNft(data: BuynftDto): Promise<{
        state: number;
        message: any;
    }>;
    getUserNft(user: string): Promise<{
        state: number;
        message: any;
    }>;
    getSellNft(): Promise<{
        state: number;
        message: any;
    }>;
    findOneSellitem(userid: string, nftid: number): Promise<{
        state: number;
        message: any;
    }>;
    CancelSellNft(data: CreateContractDto): Promise<{
        state: number;
        message: any;
    }>;
    delete(data: BuyCancelNftDto): Promise<{
        state: number;
        message: any;
    }>;
    CancelContractNft(data: BuyCancelNftDto): Promise<{
        state: number;
        message: any;
    }>;
    CheckZero(): Promise<any>;
}
