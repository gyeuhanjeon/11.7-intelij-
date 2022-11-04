import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const Chat = () => {
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  return (
    <div>
      {/* 소켓 연결이 완료되기 전까지는 Loading 컴포넌트를 렌더링함. */}
      {currentSocket ? (
          <ChatLog socket={currentSocket} />
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default Chat;