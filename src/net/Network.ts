import * as Http from "http";
import WebSocket from 'ws';
import {Repository} from "../data/IRepository";
import {Guid} from "../Guid";
import {Node} from '../Node';
import {Packet, PacketType} from "./Packet";

export enum NodeState {
    LEADER = 0x0A,
    CANDIDATE = 0x0B,
    FOLLOWER = 0x0C
}

export class Network {

    private readonly WebSocketServer : WebSocket.Server;
    private readonly NodeRepository : Repository<Node, Guid>;
    private State : NodeState;

    public constructor(port: number) {
        this.NodeRepository = new Repository<Node, Guid>([]);

        this.State = NodeState.FOLLOWER;

        this.WebSocketServer = new WebSocket.Server({
            port: (port),
            verifyClient: this.verifyClient
        });

        this.WebSocketServer.on('listening', this.handleWsListening.bind(this));
        this.WebSocketServer.on('connection', this.handleWsConnection.bind(this));
        this.WebSocketServer.on('error', this.handleWsError.bind(this));
    }

    public ConnectToNode(endpoint : string) : void {
        const ws : WebSocket = new WebSocket(`ws://${endpoint}`);

        ws.on('open', () => {
            console.log('Connected to ' + endpoint);

            ws.send(JSON.stringify(new Packet(PacketType.QUERY_STATE, this.State)));

        });

        ws.on('error', (err : Error) => {
           console.log('ws error: ' + err);
        });

        ws.on('message', data => {
           console.log(data);
        });
    }

    public Serve() : void {
        console.log('Listening for connections...');

        setInterval(() => {
            console.log('Sending heartbeat.');
            this.Broadcast(new Packet(PacketType.KEEP_ALIVE, Date.now()))
        }, 5000);
    }

    private Broadcast(packet : Packet) : void {

        this.NodeRepository.GetAll().forEach((node : Node) => {
           node.Send(packet);
        });

    }

    /* * ------------------------
     * WS Handlers
     * -------------------------*/

    private handleWsListening() : void {
        console.log('handleWsListening');
    }

    private handleWsConnection(socket: WebSocket) : void {
        console.log('Received WS connection from: ' + socket.url);

        const node = new Node(socket);

        node.InitPacketHandler(this.OnPacketReceivedHandler.bind(this));

        node.InitErrorHandler(this.OnNodeDisconnectionHandler.bind(this));

        this.NodeRepository.Add(node);
    }

    private OnPacketReceivedHandler(packet : Packet, nodeId : Guid) : void {
        console.log(`Received a new packet ${packet} from node ${nodeId}.`);

        const node = this.NodeRepository.GetByKey(nodeId);
        if (node == null) {
            return;
        }

        switch (packet.Type) {
            case PacketType.QUERY_STATE:

                node.Send(new Packet(PacketType.RESPONSE_STATE, this.State));

                break;
        }
    }

    private OnNodeDisconnectionHandler(nodeId: Guid) {
        console.log(`Node ${nodeId} has been disconnected.`);

        // Remove node from connected node's array.
        if (this.NodeRepository.Remove(nodeId) === null) {
            console.log('Could not find node to be removed.');
        }
    }

    /* * ------------------------
     * HTTP Handlers
     * -------------------------*/

    private handleWsError(error: Error) : void {
        console.log(error);
    }

    private verifyClient(info: { origin: string; secure: boolean; req: Http.IncomingMessage }) : boolean {
        console.log(info);

        return true;
    }

}