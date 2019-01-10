
export class Packet {

    public Type : PacketType;
    public Data : any;

    public constructor(type : PacketType, data? : any) {
        this.Type = type;
        this.Data = data;
    }

}

export enum PacketType {
    QUERY_STATE = 0x00F,
    RESPONSE_STATE = 0x0E,
    KEEP_ALIVE = 0X0D
}