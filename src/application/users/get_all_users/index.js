const GetAllUsersResponse = require("./get-all-users-response");

class GetAllUsers {
    /**
     * Command to get all user
     * @constructor
     * @param {UserRepository} userRepository - The user db repository
     * @memberOf Application.UserCommands
     */
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    /**
     * Get all user of DB
     * @returns {Promise<GetAllUsersResponse>}
     * @memberOf Applicaction.UserCommands.GetAllUsers
     */
    async get() {
        const users = await this.userRepository.getAll();
        this._ensureUsersExists(users);

        return new GetAllUsersResponse({users});
    }

    /**
     * Check if the user get from database exists
     * @param users
     * @memberOf Applicaction.UserCommands.GetAllUsers
     * @private
     */
    _ensureUsersExists(users) {
        if (users.length === 0) throw new Error('Not users');
    }
}

module.exports = GetAllUsers;