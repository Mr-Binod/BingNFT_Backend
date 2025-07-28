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
exports.ModelService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./table/user.model");
const ethers_1 = require("ethers");
let ModelService = class ModelService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
        console.log(' service');
    }
    async createUser(user, account, balance, privateKey, publicKey) {
        try {
            const check = await this.userModel.create({ user, account, balance, privateKey, publicKey });
            return check;
        }
        catch (error) {
            console.log(error, '123');
        }
    }
    async getUser(id) {
        try {
            const data = await this.userModel.findOne({
                where: { user: id }
            });
            console.log(data?.dataValues, 'findone');
            const Data = data?.dataValues;
            return { data: Data };
        }
        catch (error) {
            return ({ data: error });
        }
    }
    async getAllusers() {
        try {
            const data = await this.userModel.findAll();
            const result = data.map((el) => el.dataValues);
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(ethers_1.isError);
        }
    }
    async Update(id, balance) {
        try {
            const data = await this.userModel.update({ balance }, { where: { id } });
            return data;
        }
        catch (error) {
            return error;
        }
    }
};
exports.ModelService = ModelService;
exports.ModelService = ModelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], ModelService);
//# sourceMappingURL=model.service.js.map