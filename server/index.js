const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const port = process.env.PORT;
const mongo_url = "mongodb+srv://mahith:mahith123@cluster1.slnvpup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const app = express();
require("dotenv").config();

app.use(cors());
// {
//   origin: "*",
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin',
//   credentials: true
// }

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res)=>{
  res.json("Hello World!");
});

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
    .connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connected succesfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});
