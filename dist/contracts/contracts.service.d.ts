import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Repository } from 'typeorm';
import { NftUriEntity } from './entities/nft-uri.entity';
import { UserNftEntity } from './entities/user-nft.entity';
import { SellNftDto } from './dto/sellnft.dto';
import { SellNftEntity } from './entities/sell-nft.entity';
import { BuyCancelNftDto } from './dto/buy-cancel.dto';
import { NftUriDto } from './dto/nft-uri.dto';
import { createNftUriDto } from './dto/createnft.dto';
import { BuynftDto } from './dto/Buynft.dto';
export declare class ContractsService {
    private readonly userNftEntity;
    private readonly sellNftEntity;
    private readonly nftUriEntity;
    private readonly provider;
    private readonly PayMasterprivateKey;
    private readonly paymasterWallet;
    private readonly PayMasterNftContract;
    constructor(userNftEntity: Repository<UserNftEntity>, sellNftEntity: Repository<SellNftEntity>, nftUriEntity: Repository<NftUriEntity>);
    create(_data: CreateContractDto): Promise<{
        state: number;
        message: any;
    }>;
    ContractCreateSell(_data: SellNftDto): Promise<{
        state: number;
        message: any;
    }>;
    CancelContractNft(data: BuyCancelNftDto): Promise<{
        state: number;
        message: any;
    }>;
    ContractBuyNft(data: BuynftDto): Promise<{
        state: number;
        message: any;
    }>;
    createSell(_data: SellNftDto): Promise<{
        state: number;
        message: any;
    }>;
    getUserNfts(userid: string): Promise<{
        state: number;
        message: any;
    }>;
    CreateNFT(_data: createNftUriDto): Promise<{
        state: number;
        message: any;
    }>;
    CreateNftdb(_data: NftUriDto): Promise<{
        state: number;
        message: any;
    }>;
    createUserNft(_data: CreateContractDto): Promise<{
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
    update(id: number, _data: UpdateContractDto): string;
    delete(data: BuyCancelNftDto): Promise<{
        state: number;
        message: any;
    }>;
    PatchSubNft(data: SellNftDto): Promise<any>;
    CancelSellNft(data: CreateContractDto): Promise<{
        state: number;
        message: any;
    }>;
    UpdateNft(data: BuynftDto): Promise<{
        state: number;
        message: any;
        messate?: undefined;
    } | {
        state: number;
        messate: string;
        message?: undefined;
    }>;
    CheckZero(): Promise<any>;
}
