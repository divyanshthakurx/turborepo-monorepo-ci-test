import OPEN from "ws";
import { RawData, WebSocket, WebSocketServer } from "ws"
import { prisma } from "@repo/db/prisma"

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket,
  roomId: String
}

const allSocket: User[] = [];

wss.on("connection", async (socket) => {
  console.log("socket connection success");
  await prisma.user.create({
    data: {
      username: Math.random().toString(),
      password: Math.random().toString()
    }
  })

  socket.on("message", (message: RawData) => {
      
    const parsedUserMessage = JSON.parse(message.toString());

    if (parsedUserMessage.payload.message === "join") {

      allSocket.push({
        socket: socket,
        roomId: parsedUserMessage.payload.roomId
      })

      socket.send("Welcome")

    }

    if (parsedUserMessage.payload.message === "chat") {

      const userSocket = allSocket.find((data) => data.socket === socket);

      if( !userSocket ) {
        return socket.send("socket unavailable");
      }

      const userRoomId = allSocket.forEach((connection) => {
        if (connection.roomId === parsedUserMessage.payload.roomId && socket.readyState === OPEN as unknown) {
          socket.send(parsedUserMessage.payload.message)
        }
      })

    }

  })

  socket.on("close", () => {
    allSocket.filter((connection) => connection.socket !== socket);
  })

})