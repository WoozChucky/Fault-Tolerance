import {BlockchainManager} from "./Blockchain";
import {Network} from './net/Network'

const blockchain = new BlockchainManager();

const net = new Network(5050);

net.Serve();