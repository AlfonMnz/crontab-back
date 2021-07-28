const User = require("../../../domain/user/User");
const UpdateUserResponse = require("./update-user-response");

class UpdateUser {
    /**
     * Update an User command
     * @constructor
     * @param {UserRepository} userRepository - The user Db Repository
     * @memberOf Application.UserCommands
     */
    constructor({userRepository}) {
        this.userRepository = userRepository
    }

    /**
     *
     * @param {String} id - The id of the user to Update
     * @param {String} name - The name of the User
     * @param {String} path - The path to save the cron
     * @param {Array<Task>} tasks - The tasks of the user
     * @memberOf Application.UserCommands.UpdateUser
     * @returns {Promise<UpdateUserResponse>}
     */
    async update({id, name, path, tasks}) {
        const user = new User({id, name, path, tasks});
        await this.userRepository.update(user);
        return new UpdateUserResponse({user});

    }
}

module.exports = UpdateUser;