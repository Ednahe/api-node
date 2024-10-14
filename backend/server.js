const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = 5000;
const http = require("http");
const { Server } = require("socket.io");
const posts = require("./routes/post.routes.js");
const users = require('./routes/user.routes.js')

// connexion à la db
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
    }
});

app.use(cors());

// middleware qui permet de traiter les données de la req
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", posts);
app.use('/', users);

io.on('connection', (socket) => {
    console.log('user connect');
    
    socket.on('sendMessage', (data) => {
        console.log('message send', data);
        
        // afficher les messages en temps réel pour tlm
        io.emit('newMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('user logout');
    });
});

server.listen(port, () => console.log("le serveur demarre au port " + port))