'use strict'
console.log("Starting server...");
const startTime = new Date().getTime();
const HelloRouteHandler = require("./server/routes/helloRouteHandler");
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3000);
app.use('/hello',HelloRouteHandler.handle());
const endTime = new Date().getTime();
console.log("Server started in "+(endTime-startTime)+" ms");