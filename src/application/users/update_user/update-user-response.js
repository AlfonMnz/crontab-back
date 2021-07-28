class UpdateUserResponse {
    /**
     * The output of the update user command
     * @param {User} user - The user updated
     * @memberOf Application.UserCommands.UpdateUser
     */
    constructor(user) {
        this.user = user;
    }

}

module.exports = UpdateUserResponse