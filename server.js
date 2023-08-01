import dotenv from 'dotenv'
import connectDB from './conifg/database.js';
import express, { urlencoded } from 'express';
import user from './routes/user.js';
import chat from './routes/chat.js';
import messages from './routes/message.js';
import notFound from './middleware/urlNotFound.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors'
import morgan from 'morgan';
import { Server } from "socket.io";

dotenv.config();
connectDB();
const app = express();
// cors configuration
app.use(
  cors({
    origin: [process.env.ORIGIN_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(morgan('combined'));
app.use(express.json()); // to accept json data


// route
app.use('/api/user', user)
app.use("/api/chat", chat)
app.use("/api/message", messages);


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`) 
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});