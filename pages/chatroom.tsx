import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { IMsg } from "./types";

const user = "User_" + String(new Date().getTime()).substr(-3);

export const Chatroom: React.FC = () => {
  const inputRef = useRef(null);

  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  // @ts-ignore
  useEffect(() => {
    const socket = io({ path: "/api/socketio" });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    socket.on("error", (err: any) => {
      console.log(err);
    });

    if (socket) return () => socket.disconnect();
  });

  const sendMessage = async () => {
    if (msg) {
      const message: IMsg = { user, msg };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      if (response.ok) setMsg("");
    }
  };

  return (
    <div>
      <div>
        <h1>Realtime Chat App</h1>
        <h2>in Next.js and Socket.io</h2>
      </div>
      <div>
        {chat.length ? (
          chat.map((chat, i) => <div key={"msg_" + i}>{chat.msg}</div>)
        ) : (
          <div>No chat messages</div>
        )}
      </div>
      <div>
        <div>
          <div>
            <input
              ref={inputRef}
              type="text"
              value={msg}
              placeholder={connected ? "Type a message..." : "Connecting..."}
              disabled={!connected}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
          </div>
          <div>
            <button onClick={sendMessage} disabled={!connected}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
