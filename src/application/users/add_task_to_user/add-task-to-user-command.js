class AddTaskToUserCommand {
    /**
     * The input of the AddTaskToUser command
     * @param idUser
     * @param idTask
     * @memberOf Application.UserCommands.AddTaskToUser
     */
    constructor({idUser, idTask}) {
        this._idUser = idUser;
        this._idTask = idTask;
    }

    get idUser() {
        return this._idUser;
    }

    set idUser(value) {
        this._idUser = value;
    }

    get idTask() {
        return this._idTask;
    }

    set idTask(value) {
        this._idTask = value;
    }
}

module.exports = AddTaskToUserCommand