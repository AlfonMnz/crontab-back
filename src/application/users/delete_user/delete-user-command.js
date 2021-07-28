class DeleteUserCommand {
    /**
     * Input of the DeleteUserCommand
     * @param {String} id - The id of user to delete
     * @memberOf Applicaton.UserCommands.DeleteUser
     */
    constructor({id}) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

}

module.exports = DeleteUserCommand;