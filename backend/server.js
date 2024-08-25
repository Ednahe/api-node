const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = 5000;
const posts = require("./routes/post.routes.js");
const users = require('./routes/user.routes.js')

// connexion à la db
connectDB();

const app = express();

app.use(cors());

// middleware qui permet de traiter les données de la req
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", posts);
app.use('/', users);

app.listen(port, () => console.log("le serveur demarre au port " + port))