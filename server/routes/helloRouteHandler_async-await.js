'use strict'
const router = require("express").Router();
const Database = require("../database/database-async-await");
const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({ allErrors: true });
const validate = validator.validate;


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
        router.post("/", validate({ body: HelloSchema }), async(req, res) => {
            try {
                const database = new Database();
                const insertParams = {
                    "collectionName": "FirstTable",
                    "payload": req.body
                };
                const rowsAffected = await database.create(insertParams)
                res.status(200).send(rowsAffected)
            } catch (error) {
                res.status(500).send(error)
            }
        })
        return router;
    }
}
module.exports = HelloRouteHandler