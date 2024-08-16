const express = require("express");
const port = 5000;

const app = express();

// middleware qui permet de traiter les données de la req
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", require("./routes/post.routes.js"));

app.listen(port, () => console.log("le serveur demarre au port " + port))