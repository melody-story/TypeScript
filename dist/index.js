"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, priviousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.priviousHash = priviousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateBlock = (ablock) => typeof ablock.index === "number" &&
    typeof ablock.hash === "string" &&
    typeof ablock.priviousHash === "string" &&
    typeof ablock.data === "string" &&
    typeof ablock.timestamp === "number";
const genesisBlock = new Block(0, "12315646512", "", "Meody", 20211009);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatesBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatesBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.priviousHash, aBlock.timestamp, aBlock.data);
const isValidateBlock = (candidateBlock, previousBlock) => {
    if (!Block.validateBlock(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.priviousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
    ;
};
const addBlock = (cadidateBlock) => {
    if (isValidateBlock(cadidateBlock, getLatesBlock())) {
        blockchain.push(cadidateBlock);
    }
    ;
};
createNewBlock("Melody1");
createNewBlock("Melody2");
createNewBlock("Melody3");
createNewBlock("Melody4");
console.log(blockchain);
//# sourceMappingURL=index.js.map