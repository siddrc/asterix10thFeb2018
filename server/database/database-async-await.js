/*
async function executeAsyncTask () {
  const valueA = await functionA()
  const valueB = await functionB(valueA)
  return function3(valueA, valueB)
}

refer notes
*/
const Promise = require("bluebird");
const mongoClient = Promise.promisifyAll(require("mongodb").MongoClient);
//adds async versions that returns promises.
const dbProperties = require("./dbProperties")
const util = require('util');


class Database {
    constructor() {
        this.create = async function(createParams) {
            try {
                const connection = await crudOperations();
                const rowsAffected = await createHandler(connection, createParams);
                return rowsAffected;
            } catch (error) {
                throw error;
            }

        }
        async function crudOperations() {
            try {
                const connection = await mongoClient.connect("mongodb://localhost:27017");
                return connection;
            } catch (error) {
                throw error
            }
        }
        async function createHandler(connection, createParams) {
            try {
                const db = connection.db(dbProperties.databaseName);
                const collection = db.collection(createParams.collectionName);
                const rowsAffected = await collection.insert(createParams.payload);
                connection.close();
                return rowsAffected;
            } catch (error) {
                throw error
            }

        }
    }
}
module.exports = Database;