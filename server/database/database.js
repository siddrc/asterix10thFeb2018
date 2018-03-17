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
                if (error)
                    readParams.errorCallback(error);
                else
                    readParams.successCallback(docs)
            });
        }

        function createHandler(connection, createParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(createParams.collectionName);
            collection.insert(createParams.payload, function(error, rowsAffected) {
                connection.close();
                if (error)
                    createParams.errorCallback(error);
                else
                    createParams.successCallback(rowsAffected)
            })
        }

        function updateHandler(connection, updateParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(updateParams.collectionName);
            collection.updateOne(updateParams.criteria, updateParams.dataToBeUpdated, function(error, rowsAffected) {
                connection.close();
                if (error)
                    updateParams.errorCallback(error);
                else
                    updateParams.successCallback(rowsAffected)
            })
        }

        function deleteHandler(connection, deleteParams) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(deleteParams.collectionName);
            collection.deleteOne(deleteParams.dataToBeDeleted, function(error, rowsAffected) {
                connection.close();
                if (error)
                    updateParams.errorCallback(error);
                else
                    updateParams.successCallback(rowsAffected)
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
module.exports = Database;