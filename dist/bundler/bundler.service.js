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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var BundlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const EntryPoint_json_1 = __importDefault(require("../abi/EntryPoint.json"));
let BundlerService = BundlerService_1 = class BundlerService {
    configService;
    logger = new common_1.Logger(BundlerService_1.name);
    provider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/9ec09659de844985bf4990794e85cf98");
    mempool = [];
    paymasterWallet;
    PayMasterEntryPoint;
    privateKey;
    constructor(configService) {
        this.configService = configService;
    }
    async addMempool(userop) {
        const privateKey = this.configService.get('PRIVATE_KEY');
        this.paymasterWallet = new ethers_1.ethers.Wallet(privateKey, this.provider);
        const entryPointCA = `${this.configService.get('ENTRY_POINT')}`;
        this.PayMasterEntryPoint = new ethers_1.ethers.Contract(entryPointCA, EntryPoint_json_1.default.abi, this.paymasterWallet);
        this.mempool.push(userop);
        this.startProcessingLoop(10000);
        return ({ state: 200, message: 'successfully minted' });
    }
    getMempool() {
        return this.mempool;
    }
    toTuple(userOp) {
        return [
            userOp.sender,
            BigInt(userOp.nonce),
            userOp.initCode,
            userOp.callData,
            BigInt(userOp.callGasLimit),
            BigInt(userOp.verificationGasLimit),
            BigInt(userOp.preverificationGas),
            BigInt(userOp.maxFeePerGas),
            BigInt(userOp.maxPrioityFeePerGas),
            userOp.paymasterAndData,
            userOp.signature
        ];
    }
    startProcessingLoop(intervalMs) {
        const loop = async () => {
            const now = Date.now();
            const delay = intervalMs - (now % intervalMs);
            console.log('GG2', delay);
            setTimeout(async () => {
                await this.processMempool();
                loop();
            }, delay);
        };
        loop();
    }
    async processMempool() {
        if (this.mempool.length === 0) {
            return;
        }
        const ops = this.mempool.splice(0);
        try {
            const tx = await this.PayMasterEntryPoint.handleOps(ops.map((op) => this.toTuple(op)));
            this.logger.log(`Processed transactions, tx hash: ${tx.hash}`);
        }
        catch (error) {
            this.logger.error('Error processing transactions:', error);
        }
    }
};
exports.BundlerService = BundlerService;
exports.BundlerService = BundlerService = BundlerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BundlerService);
//# sourceMappingURL=bundler.service.js.map