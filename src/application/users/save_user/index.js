const User = require('../../../domain/user/User');
const SaveUserResponse = require('./save-user-response');

/**
 * Namespace of the commands
 * @namespace Application
 */
/**
 * Namespace of the users commands
 * @namespace Application.UserCommands
 */
class SaveUser {
    /**
     * Command to create an user in DB
     * @constructor
     * @param {UserRepository} userRepository - The user db repository
     * @param {idGenerator} idGenerator - IdGenerator service
     * @memberOf Application.UserCommands
     */
    constructor({userRepository, idGenerator}) {
        this.userRepository = userRepository;
        this.idGenerator = idGenerator
    }

    /**
     * Save the user
     * @async
     * @param {String} name - The name of the user
     * @param {String} path - The path to save the cron
     * @param {Array<Task>} tasks - The tasks of the user
     * @memberOf Application.UserCommands.SaveUser
     * @returns {Promise<SaveUserResponse>}
     */
    async save({name, path, tasks}) {
        const id = this.idGenerator.generate();
        const user = new User({id, name, path, tasks});
        await this.userRepository.save(user);
        return new SaveUserResponse({id, name, path});
    }
}

module.exports = SaveUser;