require('dotenv').config()

const mongoConnectionUri = process.env.MONGO_URI || 'mongodb://localhost:27017/';
const restPort = process.env.REST_PORT || 3000
const mongoDbName = process.env.MONGO_DB_NAME || 'crontab'
/**
 * Config file
 * @type {{mongo: {dbName: (string|string), uri: (string|string), timeout: number}, server: {port: (string|number)}, folders: {default_log_path: (string|string), default_path: (string|string)}}}
 */
const config = {
    server: {
        port: restPort
    },
    mongo: {
        uri: mongoConnectionUri,
        dbName: mongoDbName,
        timeout: 5000
    },
    folders: {
        default_path: process.env.DEFAULT_PATH || './test',
        default_log_path: process.env.DEFAULT_LOG_PATH || './logs'
    }
}

module.exports = config;