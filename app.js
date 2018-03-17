'use strict'
console.log("Starting server...");
const startTime = new Date().getTime();
const HelloRouteHandler = require("./server/routes/helloRouteHandler");
const HelloRouteHandlerPromises = require("./server/routes/helloRouteHandler_promises");
const HelloRouteHandlerAsyncAndAwait = require("./server/routes/helloRouteHandler_async-await");
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3000);
app.use('/hello',HelloRouteHandler.handle());
app.use('/hello_promises',HelloRouteHandlerPromises.handle())
app.use('/hello_async_await',HelloRouteHandlerAsyncAndAwait.handle())
const endTime = new Date().getTime();
console.log("Server started in "+(endTime-startTime)+" ms");