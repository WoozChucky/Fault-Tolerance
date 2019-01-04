import Http from 'http';
import WebSocket from 'ws';


export class Network {

    private readonly httpServer : Http.Server;
    private readonly wsServer : WebSocket.Server;


    public constructor() {

        this.httpServer = Http.createServer();

        this.wsServer = new WebSocket.Server({
            port: 5050,

            server: this.httpServer,

            verifyClient: undefined
        });

    }

    public Serve() : void {

    }

}