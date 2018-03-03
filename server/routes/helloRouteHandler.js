'use strict'
const router = require("express").Router();
const Database = require("../database/database");

class HelloRouteHandler {
	static handle(){
		router.get("/",function(req,res){
           const database = new Database();
           const readParams = {
           	  "collectionName" : "FirstTable",
              "criteria" : {} ,
              "projection" : {},
              "callback" : function(data){
              	 res.send(data);
              }
           };
           database.read(readParams)
		})
		return router;
	}
}
module.exports = HelloRouteHandler