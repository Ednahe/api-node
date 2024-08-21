const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv').config();
const cors = require('cors');
const port = 5000;

// connexion à la db
connectDB();

const app = express();

app.use(cors());

// middleware qui permet de traiter les données de la req
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", require("./routes/post.routes.js"));

app.listen(port, () => console.log("le serveur demarre au port " + port))