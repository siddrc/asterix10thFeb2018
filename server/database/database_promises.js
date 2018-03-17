/*const myFirstPromise = new Promise((resolve, reject) => {
    // do something asynchronous which eventually calls either:
    //
    //   resolve(someValue); // fulfilled
    // or
    //   reject("failure reason"); // rejected
});*/
const mongodb = require("mongodb").MongoClient;
const dbProperties = require("./dbProperties")
class Database {
    constructor() {
        function crudOperations() {
            return new Promise((resolve, reject) => {
                mongodb.connect("mongodb://localhost:27017", function(error, connection) {
                    if (error)
                        reject(error);
                    else
                        resolve(connection)
                })
            })

        }

        function createHandler(connection, createParams) {
            return new Promise((resolve, reject) => {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(createParams.collectionName);
                collection.insert(createParams.payload, function(error, rowsAffected) {
                    connection.close();
                    if (error)
                        reject(error);
                    else
                        resolve(rowsAffected);
                })
            })

        }

        this.create = function(createParams) {
            return new Promise((resolve, reject) => {
                crudOperations().then((connection) => {
                    createHandler(connection, createParams).then((rowsAffected) => {
                        resolve(rowsAffected)
                    }).catch((error) => {
                        reject(error)
                    })
                }).catch((error) => {
                    reject(error)
                })
            })


        }


    }

}
module.exports = Database;