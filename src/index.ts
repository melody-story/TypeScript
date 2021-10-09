var CryptoJS = require("crypto-js");


class Block {
    public index        : number;
    public hash         : string;
    public priviousHash : string;
    public data         : string;
    public timestamp    : number;
    constructor(
        index        : number,
        hash         : string,
        priviousHash : string,
        data         : string,
        timestamp    : number
    ) {
        this.index        = index;
        this.hash         = hash;
        this.priviousHash = priviousHash
        this.data         = data;
        this.timestamp    = timestamp;
    }
}

const genesisBlock : Block = new Block(1, "12315646512", "", "Meody", 20211009);

let blockchain: [Block] = [genesisBlock]

console.log(blockchain)

export{};
