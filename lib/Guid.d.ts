export declare class Guid {
    static validator: RegExp;
    static EMPTY: string;
    static IsGuid(guid: any): boolean;
    static create(): Guid;
    static createEmpty(): Guid;
    static parse(guid: string): Guid;
    static raw(): string;
    private static gen;
    private readonly value;
    private constructor();
    equals(other: Guid): boolean;
    isEmpty(): boolean;
    toString(): string;
    toJSON(): any;
}
