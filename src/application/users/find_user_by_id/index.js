const FindUserByIdResponse = require('./find-user-by-id-response')

class FindUserById {
    /**
     * Find and user by id command
     * @constructor
     * @param {UserRepository} userRepository - The user db repository
     * @memberOf Application.UserCommands
     */
    constructor({userRepository}) {
        this.userRepository = userRepository
    }

    /**
     * Find and user in database
     * @param {String} id - The id of the user to find
     * @returns {Promise<FindUserByIdResponse>}
     * @memberOf Application.UserCommands.FindUserById
     */
    async find({id}) {
        try {
            this._ensureId(id);
            const user = await this.userRepository.findById(id);

            this._ensureUserExists(user);

            return new FindUserByIdResponse({user});
        } catch (e) {
            throw new Error(e)
        }

    }

    /**
     * Ensure the user in database exists
     * @param {User} user - User get in database
     * @memberOf Application.UserCommands.FindUserById
     * @throws Error - User not exists
     * @private
     */
    _ensureUserExists(user) {
        if (!user) {
            throw new Error('User not exists');
        }
    }

    /**
     * Ensure the id params exists
     * @param {String} id - The id params
     * @memberOf Application.UserCommands.FindUserById
     * @private
     */
    _ensureId(id) {
        if (!id) {
            throw new Error('Id is required');
        }
    }
}


module.exports = FindUserById