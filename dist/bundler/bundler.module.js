"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundlerModule = void 0;
const common_1 = require("@nestjs/common");
const bundler_service_1 = require("./bundler.service");
const bundler_controller_1 = require("./bundler.controller");
let BundlerModule = class BundlerModule {
};
exports.BundlerModule = BundlerModule;
exports.BundlerModule = BundlerModule = __decorate([
    (0, common_1.Module)({
        controllers: [bundler_controller_1.BundlerController],
        providers: [bundler_service_1.BundlerService],
    })
], BundlerModule);
//# sourceMappingURL=bundler.module.js.map