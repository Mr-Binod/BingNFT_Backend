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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsController = void 0;
const common_1 = require("@nestjs/common");
const contracts_service_1 = require("./contracts.service");
const create_contract_dto_1 = require("./dto/create-contract.dto");
const sellnft_dto_1 = require("./dto/sellnft.dto");
const buy_cancel_dto_1 = require("./dto/buy-cancel.dto");
const nft_uri_dto_1 = require("./dto/nft-uri.dto");
const createnft_dto_1 = require("./dto/createnft.dto");
const Buynft_dto_1 = require("./dto/Buynft.dto");
let ContractsController = class ContractsController {
    contractsService;
    constructor(contractsService) {
        this.contractsService = contractsService;
    }
    create(data) {
        return this.contractsService.create(data);
    }
    createSell(data) {
        return this.contractsService.createSell(data);
    }
    ContractCreateSell(data) {
        return this.contractsService.ContractCreateSell(data);
    }
    CreateNFT(data) {
        console.log('GG1', data);
        return this.contractsService.CreateNFT(data);
    }
    async CreateNftdb(data) {
        return this.contractsService.CreateNftdb(data);
    }
    async createUserNft(data) {
        console.log('connected1');
        return this.contractsService.createUserNft(data);
    }
    PostBuyNft(data) {
        console.log(data, 'buynft');
        return this.contractsService.UpdateNft(data);
    }
    ContractBuyNft(data) {
        console.log(data, 'buynft22');
        return this.contractsService.ContractBuyNft(data);
    }
    getUserNft(user) {
        return this.contractsService.getUserNfts(user);
    }
    getSellNft() {
        return this.contractsService.getSellNft();
    }
    findOneSellitem(userid, nftid) {
        return this.contractsService.findOneSellitem(userid, nftid);
    }
    CancelSellNft(data) {
        console.log(data, 'patchdd');
        return this.contractsService.CancelSellNft(data);
    }
    delete(data) {
        return this.contractsService.delete(data);
    }
    CancelContractNft(data) {
        return this.contractsService.CancelContractNft(data);
    }
    CheckZero() {
        return this.contractsService.CheckZero();
    }
};
exports.ContractsController = ContractsController;
__decorate([
    (0, common_1.Post)('nft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('sellnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sellnft_dto_1.SellNftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "createSell", null);
__decorate([
    (0, common_1.Post)('contractsellnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sellnft_dto_1.SellNftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "ContractCreateSell", null);
__decorate([
    (0, common_1.Post)('createnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createnft_dto_1.createNftUriDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "CreateNFT", null);
__decorate([
    (0, common_1.Post)('createnftdb'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_uri_dto_1.NftUriDto]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "CreateNftdb", null);
__decorate([
    (0, common_1.Post)('createusernft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", Promise)
], ContractsController.prototype, "createUserNft", null);
__decorate([
    (0, common_1.Post)('buynft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buynft_dto_1.BuynftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "PostBuyNft", null);
__decorate([
    (0, common_1.Post)('contractbuynft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Buynft_dto_1.BuynftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "ContractBuyNft", null);
__decorate([
    (0, common_1.Get)('user/:user'),
    __param(0, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "getUserNft", null);
__decorate([
    (0, common_1.Get)('sellnft'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "getSellNft", null);
__decorate([
    (0, common_1.Get)('sellnft/:userid/:nftid'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Param)('nftid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "findOneSellitem", null);
__decorate([
    (0, common_1.Patch)('sellnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "CancelSellNft", null);
__decorate([
    (0, common_1.Delete)('sellnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_cancel_dto_1.BuyCancelNftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('contractsellnft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_cancel_dto_1.BuyCancelNftDto]),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "CancelContractNft", null);
__decorate([
    (0, common_1.Delete)('checkzero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractsController.prototype, "CheckZero", null);
exports.ContractsController = ContractsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [contracts_service_1.ContractsService])
], ContractsController);
//# sourceMappingURL=contracts.controller.js.map