/**
 * Created by peccin on 18/07/2016.
 */

module.exports = {
    wsserver: WSServer
};

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

function WSServer(server) {

    // Create a server for handling websocket calls
    const wss = new WebSocketServer({ server });

    wss.on('connection', function (ws) {
        console.log('new ws connection');
        ws.on('message', function (message) {
            // Broadcast any received message to all clients
            console.log('ws received: %s', message);
            wss.broadcast(message);
        });
    });

    wss.broadcast = function (data) {
        this.clients.forEach(function (client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    console.log('WebSocket server running on port: ' + server.get("port"));

}