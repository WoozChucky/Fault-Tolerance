import {Network} from './net/Network'

process.argv.forEach((val, index, array) => {
    console.log(index + ': ' + val);
});

const port  = process.argv[2];
const endpoint = process.argv[3];

const net = new Network(Number(port));

net.Serve();

if (endpoint !== undefined && endpoint !== '') {
    net.ConnectToNode(endpoint);
}