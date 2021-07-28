class FindUserByIdResponse {
    /**
     * Class constructor of the output of FindUserById command
     * @param {User} user - The user found in the DB
     * @constructor
     * @memberOf Application.UserCommands.FindUserById
     */
    constructor({user}) {
        this.user = user
    }
}

module.exports = FindUserByIdResponse