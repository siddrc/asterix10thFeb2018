'use strict'
const router = require("express").Router();
const Database = require("../database/database");
const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });
const validate = validator.validate;
const async = require("async");


const HelloSchema = {
    type: 'object',
    required: ['name', 'age'],
    properties: {
        name: {
            type: 'string',
            maxLength: 10
        },
        age: {
            description: "positive integer or string of digits",
            type: ["string", "integer"],
            pattern: "^[1-9][0-9]*$",
            maxLength: 2
        }
    }
}

class HelloRouteHandler {
    static handle() {
        router.get("/", function(req, res) {
            const database = new Database();
            const readParams = {
                "collectionName": "FirstTable",
                "criteria": { name: req.query.name },
                "projection": { _id: 0 },
                "successCallback": function(data) {
                    res.status(200).send(data);
                },
                "errorCallback" : function(error){
                    res.status(500).send(error)
                }
            };
            database.read(readParams)
        })
        router.post("/", validate({ body: HelloSchema }), function(req, res) {
            /*console.log("Yo ")
            const database = new Database();
            const insertParams = {
                "collectionName": "FirstTable",
                "payload": req.body,
                "callback": function(data) {
                    res.send(data);
                }
            };
            database.create(insertParams)*/
            
            const database = new Database();
            const insertParams = {
                "collectionName": "FirstTable",
                "payload": req.body
            };
            async.seq(database.createAsync)(insertParams, function(error, cats) {
                if (error) {
                    console.error(error);
                    res.json({ status: 'error', message: error });
                } else {
                    res.json({ status: 'ok', message: 'Cats found', data: cats });
                }
            })
        })
        return router;
    }
}
module.exports = HelloRouteHandler