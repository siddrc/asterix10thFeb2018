const mongodb = require("mongodb").MongoClient;
const dbProperties = require("./dbProperties")
class Database {
    constructor() {

        function crudOperations(crudHandler, crudParams) {
            mongodb.connect("mongodb://localhost:27017", function(error, connection) {
                crudHandler(connection, crudParams)
            })
        }

        function readHandler(connection, readParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(readParams.collectionName)
            collection.find(readParams.criteria).project(readParams.projection).toArray(function(error, docs) {
                connection.close();
                console.log(docs);
                //readParams.callback(docs)
            });
        }

        function createHandler(connection, createParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(createParams.collectionName);
            collection.insert(createParams.payload)
            connection.close();
        }

        function updateHandler(connection, updateParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(updateParams.collectionName);
            collection.updateOne(updateParams.criteria, updateParams.dataToBeUpdated, function(error, r) {
                connection.close();
            })
        }

        function deleteHandler(connection, deleteParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(deleteParams.collectionName);
            collection.deleteOne(deleteParams.dataToBeDeleted, function(error, r) {
                connection.close();
            })
        }
        this.read = function(readParams) {
            crudOperations(readHandler, readParams)
        }
        this.create = function(createParams) {
            crudOperations(createHandler, createParams)
        }
        this.update = function(updateParams) {
            crudOperations(updateHandler, updateParams)
        }
        this.delete = function(deleteParams) {
            crudOperations(deleteHandler, deleteParams)
        }
    }
} 

let db = new Database();
 db.create ({
     collectionName:"RashikTable",
     payload:{"name" : "mayur"}
 })

// let db = new Database();
// db.read({
//     collectionName:"RashikTable",
//     criteria:{"name" : "mayur"},
//     projection:{"name" : 1}
// })// let db = new Database();
// db.update({
//     collectionName: "RashikTable",
//     criteria:{"name" : "mayur"},
//     dataToBeUpdated:{$set : {"name" : "naved" , "age" : "28"}}
// })// let db = new Database();
// db.delete({
//     collectionName:"RashikTable",
//     dataToBeDeleted:{"age" : "28"}// })