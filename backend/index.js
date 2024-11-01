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


///
// const chatschema = require("./model/Chat")
// const messageschema = require("")

//
io.on("connection", (socket) => {

  // socket.on('set-up',(chatid)=>{
  //   socket.join(chatid)
  //   console.log('connected to socket with id : ', chatid);
    
  // })
  socket.on('join-room',(chatid)=>{
    console.log(`user connected to id:${socket.id} `,chatid);
    socket.join(chatid)
  })

  socket.on('send-message',(data)=>{
    
  //  console.log(data.data);
   
    
    socket.to(data.data.chat._id).emit('recived-message', data.data);
  //   socket.to(data.SelectedChatId).emit('recived-message', {
  //     msg: data.typemessage,
  //     sender: socket.id // Optional, if you want to track the sender
  // });

  
  })
});
app.use(express.json())


app.use("/auth",require("./routes/user"))
app.use("/chat",require("./routes/Chat"))
app.use("/message",require("./routes/Message"))



const PORT = process.env.PORT || 8000;

http_Server.listen(PORT,()=>{
    console.log(`running server on ${PORT}`)
})