'use strict'
const router = require("express").Router();
const Database = require("../database/database");

class HelloRouteHandler {
	static handle(){
		router.get("/",function(req,res){
           const database = new Database();
           const readParams = {
           	  "collectionName" : "FirstTable",
              "criteria" : {name:req.query.name} ,
              "projection" : {_id:0},
              "callback" : function(data){
              	 res.send(data);
              }
           };
           database.read(readParams)
		})
    router.post("/",function(req,res){
           const database = new Database();
           const insertParams = {
              "collectionName" : "FirstTable",
              "payload" : req.body,
              "callback" : function(data){
                 res.send(data);
              }
           };
           database.create(insertParams)
    })
		return router;
	}
}
module.exports = HelloRouteHandler