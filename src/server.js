require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const connection = require('./config/database');

const app = express(); // app express
const port = process.env.PORT || 8888; // port => .uat .prod
const hostname = process.env.HOST_NAME;

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//Khai bao route
app.use("/", webRoutes);



app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
