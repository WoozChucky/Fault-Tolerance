/**
 * @class Block
 * @classdesc This class represents a block contained in a blockchain.
 */
export class Block {

    /**
     *
     * @param block
     */
    public static IsValidStructure(block: Block) : boolean {
        return block
            && typeof block.index === 'number'
            && typeof block.hash === 'string'
            && typeof block.previousHash === 'string'
            && typeof block.timestamp === 'number'
            && typeof block.data === 'object';
    }

    public readonly index : number;
    public readonly timestamp : number;
    public readonly previousHash : string;
    public readonly data : object;
    public readonly hash : string;

    /**
     *
     * @param index
     * @param timestamp
     * @param previousHash
     * @param data
     * @param hash
     */
    public constructor(index: number, timestamp: number, previousHash : string, data: object, hash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = hash
    }

    /**
     *
     */
    public IsValidStructure() : boolean {
        return Block.IsValidStructure(this);
    }

}