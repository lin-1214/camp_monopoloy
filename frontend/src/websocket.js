import React from "react";
import io from "socket.io-client";
import { usedispatch } from "react-redux";

const WEBSOCKET_URL = "localhost:4000";

export const socket = io(WEBSOCKET_URL);
export const SocketContext = React.createContext(socket);
