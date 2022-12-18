import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

import { Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handle = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  console.log("called handle...");

  console.log("\n\n");
  console.log("connecting...");
  console.log(res.socket.connecting);
  console.log("allowHalfOpen...");
  console.log(res.socket.allowHalfOpen);
  console.log("server...");
  console.log(res.socket.server);
  console.log("\n\n");

  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  } else {
    console.log("else...");
  }
  res.end();
};

export default handle;
