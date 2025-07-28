"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBundlerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bundler_dto_1 = require("./create-bundler.dto");
class UpdateBundlerDto extends (0, mapped_types_1.PartialType)(create_bundler_dto_1.CreateBundlerDto) {
}
exports.UpdateBundlerDto = UpdateBundlerDto;
//# sourceMappingURL=update-bundler.dto.js.map