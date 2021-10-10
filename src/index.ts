import { timeStamp } from "console";
import * as CryptoJS from "crypto-js";

class Block {
    
    static calculateBlockHash = (
            index:number, 
            previousHash:string, 
            timestamp:number, 
            data:string
        ): string => 
            CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
        
    static validateBlock = (ablock:Block):boolean => 
        typeof ablock.index        === "number" &&
        typeof ablock.hash         === "string" &&
        typeof ablock.priviousHash === "string" &&
        typeof ablock.data         === "string" &&
        typeof ablock.timestamp    === "number"; 
            
    public index        : number;
    public hash         : string;
    public priviousHash : string;
    public data         : string;
    public timestamp    : number;
        
    constructor (
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


const genesisBlock: Block = new Block(0, "12315646512", "", "Meody", 20211009);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = ():Block[] => blockchain;

const getLatesBlock = ():Block => blockchain[blockchain.length -1];

const getNewTimeStamp =():number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string):Block => {
    const previousBlock:Block  = getLatesBlock();
    const newIndex: number     = previousBlock.index + 1; 
    const newTimeStamp: number = getNewTimeStamp(); 
    const newHash: string      = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash,
        newTimeStamp, 
        data
    ); 
        
    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash,
        data, 
        newTimeStamp
    );
    addBlock(newBlock);
    return newBlock;
}
    
    
const getHashforBlock = (aBlock:Block):string => 
    Block.calculateBlockHash(
        aBlock.index, 
        aBlock.priviousHash, 
        aBlock.timestamp, 
        aBlock.data
    );
        
        
const isValidateBlock = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateBlock(candidateBlock)){
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.priviousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    };
};
        
    
const addBlock = (cadidateBlock:Block):void => {
    if (isValidateBlock(cadidateBlock, getLatesBlock())) {
        blockchain.push(cadidateBlock);
    };
};

createNewBlock("Melody1");
createNewBlock("Melody2");
createNewBlock("Melody3");
createNewBlock("Melody4");

console.log(blockchain);


export{};