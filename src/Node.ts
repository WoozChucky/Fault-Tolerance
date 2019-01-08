import WebSocket from 'ws';
import {Guid} from "./Guid";
import {Packet} from "./net/Packet";
import {JSONtoObject} from "./net/Utils";

export type OnPacketHandler = (packet : Packet, nodeId : Guid) => void;
export type OnDisconnectionHandler = (nodeId : Guid) => void;

export class Node {

    public readonly Id : Guid;

    private Socket : WebSocket;

    public constructor(socket : WebSocket) {
        this.Id = Guid.create();
        this.Socket = socket;
    }

    public Send(message: Packet): any {
        this.Socket.send(JSON.stringify(message),
            (err? : Error) => {
                console.log(err || 'Sent!');
            }
        );
    }

    public InitPacketHandler(onPacket: OnPacketHandler) : void {

        this.Socket.on('message', (data : WebSocket.Data) => {

            const packet : Packet = JSONtoObject<Packet>(data);

            if (packet === null) {
                console.log('Invalid packet received in node ' + this.Id);
            } else {
                onPacket(packet, this.Id);
            }
        });

    }

    public InitErrorHandler(onDisconnection : OnDisconnectionHandler) : void {

        this.Socket.on('error', (err : Error) => {
            console.log('Node onError: ' + err);
            onDisconnection(this.Id);
        });

        this.Socket.on('close', (code : number, reason : string) => {
            console.log('Node onClose: ' + code + reason);
            onDisconnection(this.Id);
        });
    }


}

// 18h16min25-27sec
