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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const PvtKeyGen_1 = require("./utils/PvtKeyGen");
const SmartFactory_json_1 = __importDefault(require("../abi/SmartFactory.json"));
const PayMaster_json_1 = __importDefault(require("../abi/PayMaster.json"));
const config_1 = require("@nestjs/config");
const account_entity_1 = require("./entities/account.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AccountService = class AccountService {
    configService;
    smartAccInfoEntity;
    logger = new common_1.Logger('AccountService');
    provider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e7468d2d517b4aa28ba51a6e589558e2");
    FactoryAcc = "0x5FB0dD09111636f5847a70e915fC118c3a796E95";
    PayMasterAcc = "0xbA56212Ab76Fe56F99351103B17432C1D7EEd608";
    constructor(configService, smartAccInfoEntity) {
        this.configService = configService;
        this.smartAccInfoEntity = smartAccInfoEntity;
    }
    async createAcc(data) {
        const PaymasterPvtkey = this.configService.get('PRIVATE_KEY');
        console.log(PaymasterPvtkey, 'paymaster');
        if (!PaymasterPvtkey) {
            throw new Error('PRIVATE_KEY is not set in environment variables');
        }
        const user = data.id;
        const userpw = data.userpw;
        const privateKey = (0, PvtKeyGen_1.createPvtKey)(data);
        const wallet = new ethers_1.ethers.Wallet(privateKey, this.provider);
        const PaymasterWallet = new ethers_1.ethers.Wallet(PaymasterPvtkey, this.provider);
        const FactoryContract = new ethers_1.ethers.Contract(this.FactoryAcc, SmartFactory_json_1.default.abi, PaymasterWallet);
        const PayMasterContract = new ethers_1.ethers.Contract(this.PayMasterAcc, PayMaster_json_1.default.abi, PaymasterWallet);
        const owner = wallet.address;
        try {
            let checkWhitelist = false;
            console.log('GG', PaymasterPvtkey);
            const tx = await FactoryContract.createAcc(wallet);
            const result = await tx.wait();
            const smartAcc = await FactoryContract.getAccount(owner);
            if (result) {
                const tx = await PayMasterContract.whiteListAdd(smartAcc);
                const result = await tx.wait();
                const CheckWhitelist = await PayMasterContract.whiteList(smartAcc);
                if (CheckWhitelist) {
                    checkWhitelist = true;
                }
            }
            const address = wallet.address;
            const privateKey = wallet.privateKey;
            const data = this.smartAccInfoEntity.create({
                user,
                userpw,
                UserAddress: address,
                smartAcc,
                privateKey,
                checkWhitelist
            });
            await this.smartAccInfoEntity.save(data);
            console.log(`Transaction hash : ${result.hash}`);
            console.log(`Smart Account : ${smartAcc}`);
            return ({ state: 200, message: 'createAcc successful' });
        }
        catch (error) {
            return ({ state: 401, message: 'createAcc Failed' + error });
        }
    }
    async getFindAll() {
        try {
            const data = await this.smartAccInfoEntity.find();
            if (data)
                return data;
            return data;
        }
        catch (error) {
            return error;
        }
    }
    async getFindOne(user) {
        try {
            const data = await this.smartAccInfoEntity.findOne({ where: { user } });
            console.log(data);
            if (data)
                return ({ state: 201, message: data });
            return ({ state: 402, message: data });
        }
        catch (error) {
            return ({ state: 402, message: error });
        }
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(account_entity_1.SmartAccInfoEntity)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map