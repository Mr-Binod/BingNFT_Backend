"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPvtKey = void 0;
const ethers_1 = require("ethers");
const createPvtKey = (data) => {
    const idKey = `${data.domain}:${data.id}`;
    const value = (0, ethers_1.solidityPacked)(["string", "string"], [data.salt, idKey]).slice(0, 64);
    const privateKey = (0, ethers_1.keccak256)(value).replace("0x", "").slice(0, 64);
    return `0x${privateKey}`;
};
exports.createPvtKey = createPvtKey;
//# sourceMappingURL=PvtKeyGen.js.map