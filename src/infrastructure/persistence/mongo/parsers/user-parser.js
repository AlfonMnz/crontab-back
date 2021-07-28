const User = require("../../../../domain/user/User");
/**
 * User parser
 * @param muuid
 * @returns {Object}
 * @constructor
 * @memberOf Persistance.Mongo.Parsers
 */
const userParser = ({muuid}) => {
    return {
        /**
         * Parse a User to a MongoDocument
         * @param id
         * @param name
         * @param path
         * @param tasks
         * @returns {{path: *, name: *, _id, tasks: *}}
         * @memberOf Persistance.Mongo.Parsers.userParser
         */
        toMongoDocument: ({
                              id,
                              name,
                              path,
                              tasks
                          }) => {
            const _id = muuid.from(id);
            return {
                _id,
                name,
                path,
                tasks,
            }
        },
        /**
         * Parse a user to domain
         * @param _id
         * @param name
         * @param path
         * @param tasks
         * @returns {User}
         * @memberOf Persistance.Mongo.Parsers.userParser
         */
        toDomain: ({
                       _id, name, path, tasks
                   }) => {
            const id = (muuid.from(_id)).toString();
            return new User({id, name, path, tasks})
        }
    }
}

module.exports = userParser;