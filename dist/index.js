"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Block {
    constructor(index, hash, priviousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.priviousHash = priviousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
const genesisBlock = new Block(1, "12315646512", "", "Meody", 20211009);
let blockchain = [genesisBlock];
console.log(blockchain);
//# sourceMappingURL=index.js.map