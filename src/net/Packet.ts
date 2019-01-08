
export class Packet {

    public Type : PacketType;
    public Data : any;

    public constructor(type : PacketType, data : any) {
        this.Type = type;
        this.Data = data;
    }

}

export enum PacketType {
    QUERY_LATEST_BLOCK = 0,
    QUERY_ALL_BLOCKS = 1,
    RESPONSE_BLOCKCHAIN = 2,
    QUERY_PEERS = 3,
    RESPONSE_PEERS = 4
}