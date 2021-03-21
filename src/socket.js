import socketClient  from "socket.io-client";

const socket = socketClient(process.env.REACT_APP_SERVER_URL);

export default socket;