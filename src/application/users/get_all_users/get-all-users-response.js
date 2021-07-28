class GetAllUsersResponse {
    /**
     * The output of the GetAllUsers command
     * @param users
     * @constructor
     * @memberOf Application.UserCommands.GetAllUsers
     */
    constructor({users}) {
        this.users = users;
    }
}

module.exports = GetAllUsersResponse;