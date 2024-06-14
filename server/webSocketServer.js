const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');

let wss;

const clients = new Map();

let webSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  const clients = new Map();

  wss.on("connection", WsOnConnection);
};

let WsOnConnection = (ws, req) => {
  
  console.log("mahith: ", req);

  let localWebSocketData = clients.get(ws);

  ws.send(
    JSON.stringify({
      type: "GetWebSocketId",
      webSocketId: localWebSocketData.id,
    })
  );

  ws.on("message", (data, isBinary) => {
    CommonOnMessage({
      inData: data,
      inws: ws,
      inClients: clients,
      inWss: wss,
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Number of users online: ", clients.size);
  });
};

module.exports = { webSocketServer };