import * as Http from "http";
import WebSocket from 'ws';
import {Guid} from "../Guid";
import {Node, OnPacketHandler} from '../Node';
import { Packet } from "./Packet";

export class Network {

    private readonly HttpServer : Http.Server;
    private readonly WebSocketServer : WebSocket.Server;
    private readonly Nodes : Node[];

    public constructor(port: number) {

        this.Nodes = [];

        this.HttpServer = Http.createServer();
        this.HttpServer.on("close", this.HandleHttpClose);
        this.HttpServer.on("connect", this.HandleHttpConnect);
        this.HttpServer.on("data", this.HandleHttpData);
        this.HttpServer.on("drain", this.HandleHttpDrain);
        this.HttpServer.on("end", this.HandleHttpEnd);
        this.HttpServer.on("error", this.HandleHttpError);
        this.HttpServer.on("lookup", this.HandleHttpLookup);
        this.HttpServer.on("timeout", this.HandleHttpTimeout);

        this.WebSocketServer = new WebSocket.Server({
            port: (port),
            verifyClient: this.verifyClient
        });

        this.WebSocketServer.on('listening', this.handleWsListening);
        this.WebSocketServer.on('connection', this.handleWsConnection);
        this.WebSocketServer.on('error', this.handleWsError);
    }

    public Serve() : void {
        this.HttpServer.listen(4040);
    }

    private Broadcast(packet : Packet) : void {

        this.Nodes.forEach((node : Node) => {
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

        node.InitPacketHandler(this.OnPacketReceivedHandler);

        node.InitErrorHandler((nodeId : Guid) => {

        });

        this.Nodes.push(node);
    }

    private OnPacketReceivedHandler(packet : Packet, nodeId : Guid) : void {
        console.log(`Received a new packet ${packet} from node ${nodeId}.`);
    }

    /* * ------------------------
     * HTTP Handlers
     * -------------------------*/

    private handleWsError(error: Error) : void {
        console.log(error);
    }

    private HandleHttpClose(hadErrors: boolean) : void {
        console.log('handleHttpClose' + hadErrors);
    }

    private HandleHttpConnect() : void {
        console.log('handleHttpConnect');
    }

    private HandleHttpData(data : Buffer) : void {
        console.log('handleHttpData' + data.toString());
    }

    private HandleHttpDrain() : void {
        console.log('handleHttpDrain');
    }

    private HandleHttpEnd() : void {
        console.log('handleHttpEnd');
    }

    private HandleHttpError(err: Error) : void {
        console.log('handleHttpError' + err);
    }

    private HandleHttpLookup(err: Error, address: string, family: string | number, host: string) : void {

        console.log('handleHttpLookup');
    }

    private HandleHttpTimeout() : void {
        console.log('handleHttpTimeout');
    }

    private verifyClient(info: { origin: string; secure: boolean; req: Http.IncomingMessage }) : boolean {
        console.log(info);

        return true;
    }

}