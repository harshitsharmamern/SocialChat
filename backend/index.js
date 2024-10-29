const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } =require("socket.io");
const cors = require("cors")
const http_Server = createServer(app);  //http server
const dbconnection = require(".//model/db")

dbconnection()
const io = new Server(http_Server,{
    cors: {
        origin: "http://127.0.0.1:5173", // The origin of your React app
        methods: ["GET", "POST"], // Allowed methods
      }
})
app.use(cors())

io.on("connection", (socket) => {
  socket.emit('connected',socket.id)
  console.log("server started socket")
  console.log(socket.id)

  socket.on('message',(data)=>{
    
    io.to(data.roomName).emit('recived-message',data.message)
  })
  socket.on('join-room',(roomname)=>{
    socket.join(roomname)
  })
 
  
});
app.use(express.json())
app.use("/auth",require("./routes/user"))
app.use("/chat",require("./routes/Chat"))


const PORT = process.env.PORT || 8000;

http_Server.listen(PORT,()=>{
    console.log(`running server on ${PORT}`)
})