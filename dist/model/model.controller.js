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
exports.ModelController = void 0;
const common_1 = require("@nestjs/common");
const model_service_1 = require("./model.service");
let ModelController = class ModelController {
    modelService;
    constructor(modelService) {
        this.modelService = modelService;
    }
    async createUser(body) {
        const { wallet, Userbalance } = body;
        const { user, account, privateKey, publicKey } = wallet;
        console.log(wallet, 'model', user, account, privateKey, publicKey);
        return await this.modelService.createUser(user, account, Userbalance, privateKey, publicKey);
    }
    async getUser(id) {
        console.log(id, 'id11');
        return await this.modelService.getUser(id);
    }
    async getAllusers() {
        return await this.modelService.getAllusers();
    }
    async patchBalance(body) {
        const { balance, id } = body;
        console.log(body, '1111');
        return await this.modelService.Update(id, balance);
    }
};
exports.ModelController = ModelController;
__decorate([
    (0, common_1.Post)('model'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)("model/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("models"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "getAllusers", null);
__decorate([
    (0, common_1.Patch)('model'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "patchBalance", null);
exports.ModelController = ModelController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [model_service_1.ModelService])
], ModelController);
//# sourceMappingURL=model.controller.js.map