/**
 * @class Block
 * @classdesc This class represents a block contained in a blockchain.
 */
export declare class Block {
    /**
     *
     * @param block
     */
    static IsValidStructure(block: Block): boolean;
    index: number;
    timestamp: number;
    previousHash: string;
    data: object;
    hash: string;
    /**
     *
     * @param index
     * @param timestamp
     * @param previousHash
     * @param data
     * @param hash
     */
    constructor(index: number, timestamp: number, previousHash: string, data: object, hash: string);
}
