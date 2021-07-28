/**
 * Namespace of persistances
 * @namespace Persistance
 */
/**
 * Mongo Persistance Namespace
 * @namespace Persistance.Mongo
 */
const {MongoClient: mongo} = require('mongodb');
const {mongo: {uri, dbName, timeout}} = require('../../config');
let db;
let client;
let instance;

/**
 * The connect function
 * @memberOf Persistance.Mongo
 * @return {Promise<*>}
 * @private
 */
const _connect = async () => {
    try {
        client = await mongo.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: timeout
        });
        db = await client.db(dbName);
        console.log(`DATABASE STATUS: OK`)
        return db
    } catch (e) {
        const error = e.message ? e.message : e;
        console.error(`Error in database connection: ${error}`);
        throw new Error(`Error in database connection: ${error}`);
    }
}

/**
 * Handler of the mongodb connection
 * @memberOf Persistance.Mongo
 * @return {{disconnect: disconnect, getInstance: (function(): *)}}
 * @constructor
 */
const MongoDbHandler = () => {
    /**
     * Create the instance of the connection db
     * @return db - the DB connection
     * @async
     */
    const createInstance = async () => {
        const db = await _connect();
        return db;
    }
    return {
        /**
         * If not exists the instance of the db, create it and return
         * @return instance - the instance of the DB
         * @memberOf Persistance.Mongo.MongoDBHandler
         */
        getInstance: async () => {
            if (!instance) {
                instance = await createInstance();
            }
            return instance
        },
        /**
         * Close the connection of the DB
         * @return void
         * @memberOf Persistance.Mongo.MongoDBHandler
         */
        disconnect: () => {
            if (client) {
                client.close();
            }
            db = null;
            instance = null;
            client = null;
        }
    }
};

module.exports = MongoDbHandler