"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nft_uri_entity_1 = require("./entities/nft-uri.entity");
const user_nft_entity_1 = require("./entities/user-nft.entity");
const sell_nft_entity_1 = require("./entities/sell-nft.entity");
const ethers_1 = require("ethers");
const BingNFT_json_1 = __importDefault(require("../abi/BingNFT.json"));
const config_1 = require("@nestjs/config");
let ContractsService = class ContractsService {
    configService;
    userNftEntity;
    sellNftEntity;
    nftUriEntity;
    paymasterWallet;
    PayMasterNftContract;
    constructor(configService, userNftEntity, sellNftEntity, nftUriEntity) {
        this.configService = configService;
        this.userNftEntity = userNftEntity;
        this.sellNftEntity = sellNftEntity;
        this.nftUriEntity = nftUriEntity;
        const provider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/c36ac18d957a4f46aa6b893c058c4bbd");
        const PayMasterprivateKey = this.configService.get('PRIVATE_KEY');
        console.log(PayMasterprivateKey, 'll');
        this.paymasterWallet = new ethers_1.ethers.Wallet(PayMasterprivateKey, provider);
        this.PayMasterNftContract = new ethers_1.ethers.Contract("0xb8A197035894A4d4d8a98f7F183eC291D83b2914", BingNFT_json_1.default.abi, this.paymasterWallet);
    }
    async create(_data) {
        const { nftid, nftidToken, nftUridata } = _data;
        try {
            const result = this.nftUriEntity.create({ nftid, TotalNftidTokenAmt: nftidToken, nftUridata });
            await this.nftUriEntity.save(result);
            const data = this.userNftEntity.create(_data);
            return { state: 200, message: await this.userNftEntity.save(data) };
        }
        catch (error) {
            throw new Error('failed to create contracts');
        }
    }
    async ContractCreateSell(_data) {
        console.log(_data);
        const { smartAccAddress: sender, nftid, nftidTokenAmt: token, price } = _data;
        console.log('GG', sender, nftid, token, price);
        const data = await this.PayMasterNftContract.SellNFT(sender, BigInt(nftid), BigInt(token), BigInt(price));
        await data.wait();
        return { state: 201, message: data };
    }
    async CancelContractNft(data) {
        try {
            console.log('connected', data);
            const { smartAccAddress, nftid } = data;
            const result = await this.PayMasterNftContract.cancelSale(BigInt(nftid), smartAccAddress);
            await result.wait();
            return { state: 200, message: result };
        }
        catch (error) {
            throw new Error('Failed to delete from sellnft contract' + error);
        }
    }
    async ContractBuyNft(data) {
        try {
            const { userid, sender, receiver, nftid, nftUridata, nftidToken, price } = data;
            const result = await this.PayMasterNftContract.BuyNFT(sender, receiver, nftid, price);
            await result.wait();
            return { state: 201, message: result };
        }
        catch (error) {
            return { state: 405, message: error };
        }
    }
    async createSell(_data) {
        try {
            const result = this.sellNftEntity.create(_data);
            await this.sellNftEntity.save(result);
            console.log(result);
            const result2 = await this.PatchSubNft(_data);
            return { state: 200, message: result };
        }
        catch (error) {
            throw new Error('failed creating sell request');
        }
    }
    async getUserNfts(userid) {
        try {
            const data = await this.userNftEntity.find({ where: { userid } });
            console.log(data);
            return { state: 200, message: data };
        }
        catch (error) {
            return { state: 405, message: 'usernft' + error };
        }
    }
    async CreateNFT(_data) {
        const { Uri, address } = _data;
        try {
            const data = await this.PayMasterNftContract.settokenURI(Uri, address);
            console.log('GG3', data);
            await data.wait();
            console.log('GG3', data);
            return { state: 200, message: 'successfuly minted nft' };
        }
        catch (error) {
            return { state: 404, message: error };
        }
    }
    async CreateNftdb(_data) {
        try {
            const data = this.nftUriEntity.create(_data);
            return { state: 200, message: data };
        }
        catch (error) {
            return { state: 405, message: error };
        }
    }
    async createUserNft(_data) {
        try {
            console.log('GGG');
            const data = this.userNftEntity.create(_data);
            const result = await this.userNftEntity.save(data);
            return { state: 200, message: { data: result } };
        }
        catch (error) {
            return { state: 405, message: error };
        }
    }
    async getSellNft() {
        try {
            return { state: 200, message: await this.sellNftEntity.find() };
        }
        catch (error) {
            return { state: 405, message: 'getsellnft Error' + error };
        }
    }
    async findOneSellitem(userid, nftid) {
        try {
            return {
                state: 200, message: await this.sellNftEntity.findOne({
                    where: {
                        userid,
                        nftid
                    }
                })
            };
        }
        catch (error) {
            return { state: 405, message: 'findonesellitem error ' + error };
        }
    }
    update(id, _data) {
        try {
            const data = user_nft_entity_1.UserNftEntity;
        }
        catch (error) {
        }
        return `This action updates a #${id} contract`;
    }
    async delete(data) {
        try {
            return { state: 200, message: await this.sellNftEntity.delete(data) };
        }
        catch (error) {
            throw new Error('Failed to delete from sellnft');
        }
    }
    async PatchSubNft(data) {
        try {
            console.log(data);
            const { userid, nftid, nftidTokenAmt: amt } = data;
            console.log(userid, nftid, amt, 'patch');
            const result = await this.userNftEntity.decrement({ userid, nftid }, 'nftidToken', amt);
            return result;
        }
        catch (error) {
            throw new Error('error patching sellnft');
        }
    }
    async CancelSellNft(data) {
        const { userid, nftid, nftidToken, nftUridata } = data;
        try {
            const result = await this.userNftEntity.increment({ userid, nftid }, 'nftidToken', nftidToken);
            console.log(result, 'cancel', data);
            if (result.affected === 0) {
                const result = this.userNftEntity.create({ userid, nftid, nftidToken, nftUridata });
                await this.userNftEntity.save(result);
                console.log(result, 'zz');
                return { state: 203, message: result };
            }
            return { state: 202, message: result };
        }
        catch (error) {
            throw new Error(407 + error);
        }
    }
    async UpdateNft(data) {
        const { userid, nftid, nftidToken, nftUridata } = data;
        try {
            console.log(data);
            console.log(userid, nftid, nftidToken, nftUridata, 'patch');
            const result = await this.userNftEntity.increment({ userid, nftid }, 'nftidToken', nftidToken);
            if (result.affected && result.affected > 0) {
                console.log(result, 'ss');
                return { state: 202, message: result };
            }
            else {
                const result = this.userNftEntity.create({ userid, nftid, nftidToken, nftUridata });
                await this.userNftEntity.save(result);
                console.log(result, 'zz');
                return { state: 203, message: result };
            }
        }
        catch (error) {
            return ({ state: 405, messate: 'error patching sellnft' + error });
        }
    }
    async CheckZero() {
        try {
            const result = await this.userNftEntity.delete({ nftidToken: 0 });
            console.log('delete rows checkzero', result);
            return result;
        }
        catch (error) {
            throw new Error(407 + error);
        }
    }
};
exports.ContractsService = ContractsService;
exports.ContractsService = ContractsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_nft_entity_1.UserNftEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(sell_nft_entity_1.SellNftEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(nft_uri_entity_1.NftUriEntity)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ContractsService);
//# sourceMappingURL=contracts.service.js.map