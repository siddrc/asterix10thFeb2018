'use strict'
console.log("Starting server...");
const startTime = new Date().getTime();
const HelloRouteHandler = require("./server/routes/helloRouteHandler");
const express = require("express");
const app = express();
app.listen(3000);
app.use('/hello',HelloRouteHandler.handle());
debugger
const endTime = new Date().getTime();
console.log("Server started in "+(endTime-startTime)+" ms");