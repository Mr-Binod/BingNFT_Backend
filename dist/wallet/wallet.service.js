"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WalletService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const elliptic_1 = require("elliptic");
const crypto_1 = require("crypto");
const dir = path.join(__dirname, "..", "./walletdata");
const ec = new elliptic_1.ec("secp256k1");
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
let WalletService = WalletService_1 = class WalletService {
    user;
    account;
    privateKey;
    publicKey;
    balance;
    constructor() {
        this.privateKey = this.setPrivateKey();
        this.publicKey = this.setPublicKey();
        this.account = this.setAccount();
        this.balance = 0;
        if (this.user) {
            WalletService_1.createWallet(this);
        }
    }
    init(user) {
        this.user = user;
    }
    static createWallet(wallet) {
        const filepath = path.join(dir, wallet.account);
        fs.writeFileSync(filepath, wallet.privateKey);
        console.log('created');
    }
    getWallets() {
        const Wallets = fs.readdirSync(dir);
        return Wallets;
    }
    getWallet() {
        const Wallets = fs.readdirSync(dir);
        const userWallet = Wallets.filter(el => this.account);
        return userWallet;
    }
    setPrivateKey() {
        return (0, crypto_1.randomBytes)(32).toString("hex");
    }
    setPublicKey() {
        const keyPair = ec.keyFromPrivate(this.privateKey);
        const newkeyPair = keyPair.getPublic().encode("hex", true);
        return newkeyPair;
    }
    setAccount() {
        return this.publicKey.slice(26);
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = WalletService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WalletService);
//# sourceMappingURL=wallet.service.js.map