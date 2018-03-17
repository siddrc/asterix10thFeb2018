'use strict'
const router = require("express").Router();
const Database = require("../database/database_promises");
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

class HelloRouteHandlerPromises {
    static handle() {
        router.get("/", function(req, res) {
            const database = new Database();
            const readParams = {
                "collectionName": "FirstTable",
                "criteria": { name: req.query.name },
                "projection": { _id: 0 },
                "callback": function(data) {
                    res.send(data);
                }
            };
            database.read(readParams)
        })
        router.post("/", validate({ body: HelloSchema }), function(req, res) {
            const database = new Database();
            const insertParams = {
                "collectionName": "FirstTable",
                "payload": req.body
            };
            database.create(insertParams).then((rowsAffected) => {
                res.send(rowsAffected)
            }).catch((error) => {
                res.send(error)
            })
        })
        return router;
    }
}
module.exports = HelloRouteHandlerPromises