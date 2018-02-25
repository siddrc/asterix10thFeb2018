const MongodbClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID
const dbProps = require("../dbProperties.json")
const url = dbProps.dbUrl;
const dbname = dbProps.dbName;
class Database {
    constructor() {
      this.create = function(createParams){
         handleCrudOperation(createHandler,createParams)
      }

      function createHandler(connection,createParams){
            const db = connection.db(dbname);
            const collection = db.collection(createParams.collectionName);
            collection.insert(createParams.payload);
            connection.close();
      }
      function handleCrudOperation(CRUDOperation,crudParams){
          MongodbClient.connect(url, function(err, connection) {
             CRUDOperation(connection,crudParams)
          })
      }
    }
    
    read() {
        mongodbClient.connect(url, function(error, connection) {
            const db = connection.db(dbname);
            const collection = db.collection("FirstTable");

            collection.find({ _id: new ObjectID("5a915f11f770901180650f04") }, { "projection": { _id: 0, name: 1 } }).toArray(function(err, docs) {
                //collection.find({_id: new ObjectID("5a915f11f770901180650f04")},{_id:0, name:1}).toArray(function(err, docs) {

                console.log("Found the following records");
                console.log(docs);
                connection.close();
                //callback(docs);
            });
        })
    }
    updateOne() {

        mongodbClient.connect(url, function(error, connection) {
            const db = connection.db(dbname);
            const collection = db.collection("FirstTable");
            collection.updateOne({ "name": "Yogesh" }, { "$set": { "name": "Sairaj" } }, function(error, result) {
                console.log(`result ${result}`);
                connection.close();
            })
        })

    }
    updateMany() {
        mongodbClient.connect(url, function(error, connection) {
            const db = connection.db(dbname);
            const collection = db.collection("FirstTable");
            collection.updateMany({ 'name': 'Yogesh' }, { $set: { 'name': 'Sairaj' } }, function(error, result) {

                console.log(`result ${result}`);
                connection.close();
            });
        })
    }
    deleteOne() {
        mongodbClient.connect(url, function(error, connection) {
            const db = connection.db(dbname);
            const collection = db.collection("FirstTable");
            collection.deleteOne({ 'name': 'Sairaj' }, function(error, result) {

                console.log(`result ${result}`);
                connection.close();
            });
        })
    }
    deleteMany() {
        mongodbClient.connect(url, function(error, connection) {
            const db = connection.db(dbname);
            const collection = db.collection("FirstTable");
            collection.deleteMany({ 'name': 'Sairaj' }, function(error, result) {

                console.log(`result ${result}`);
                connection.close();
            });
        })
    }
}
const database = new Database();
//database.read();
let createArgs = {
   "collectionName" : "FirstTable",
    "payload" : { "name" : "Siddharth"}
}
database.create(createArgs);
//database.updateOne();
//database.updateMany();
//database.deleteOne();
//database.deleteMany();