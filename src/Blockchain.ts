import {Block} from "./Block";

export type Blockchain = Block[];

export class BlockchainManager {

    private readonly chain : Blockchain;

    public constructor() {
        this.chain = [];
    }

    public async addBlock(block: Block) {
        this.chain.push(block);
    }

    public async getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    public async getChain() : Promise<Blockchain> {
        return this.chain;
    }
}