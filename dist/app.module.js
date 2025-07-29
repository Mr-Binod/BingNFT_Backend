"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const account_module_1 = require("./account/account.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("./account/entities/account.entity");
const bundler_module_1 = require("./bundler/bundler.module");
const contracts_module_1 = require("./contracts/contracts.module");
const nft_uri_entity_1 = require("./contracts/entities/nft-uri.entity");
const sell_nft_entity_1 = require("./contracts/entities/sell-nft.entity");
const user_nft_entity_1 = require("./contracts/entities/user-nft.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'myid',
                password: '1994!BDs',
                database: 'B3project',
                entities: [account_entity_1.SmartAccInfoEntity, user_nft_entity_1.UserNftEntity, nft_uri_entity_1.NftUriEntity, sell_nft_entity_1.SellNftEntity],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.SmartAccInfoEntity, user_nft_entity_1.UserNftEntity, nft_uri_entity_1.NftUriEntity, sell_nft_entity_1.SellNftEntity]),
            account_module_1.AccountModule,
            bundler_module_1.BundlerModule,
            contracts_module_1.ContractsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map