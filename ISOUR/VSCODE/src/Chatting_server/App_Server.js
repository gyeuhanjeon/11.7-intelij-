const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});//cors 오류로 인한 설정

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("init", (payload) => {
    console.log(payload);
  });
});

httpServer.listen(80);