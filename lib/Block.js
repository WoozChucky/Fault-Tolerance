/**
 * @class Block
 * @classdesc This class represents a block contained in a blockchain.
 */
export class Block {
    /**
     *
     * @param block
     */
    static IsValidStructure(block) {
        return block
            && typeof block.index === 'number'
            && typeof block.hash === 'string'
            && typeof block.previousHash === 'string'
            && typeof block.timestamp === 'number'
            && typeof block.data === 'object';
    }
    /**
     *
     * @param index
     * @param timestamp
     * @param previousHash
     * @param data
     * @param hash
     */
    constructor(index, timestamp, previousHash, data, hash) {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = hash;
    }
}
//# sourceMappingURL=Block.js.map