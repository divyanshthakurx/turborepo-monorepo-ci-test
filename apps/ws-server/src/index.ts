import { WebSocket, WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("socket connection success");

  socket.on("message", () => {
      
  })

})