const mongodb = require("mongodb").MongoClient;
const dbProperties = require("./dbProperties")
class Database {
    constructor() {
        function crudOperationsAsync(crudHandlerAsync, crudParams , asyncCallback) {
            mongodb.connect("mongodb://localhost:27017", function(error, connection) {
                if(error)
                    asyncCallback(error,null)
                else
                    crudHandlerAsync(error,connection, crudParams ,asyncCallback)
            })
        }
        function createHandlerAsync(error,connection, createParams, asyncCallback) {
            const db = connection.db(dbProperties.databaseName);
            const collection = db.collection(createParams.collectionName);
            collection.insert(createParams.payload, function(error, rowsAffected) {
                connection.close();
                if(error)
                    asyncCallback(error,null)
                else
                    asyncCallback(error, rowsAffected)
            })
        }
        this.createAsync = function(createParams,asyncCallback){
            crudOperationsAsync(createHandlerAsync, createParams,asyncCallback)
        }
       
    }
}
module.exports = Database;