class UpdateUserCommand {
    /**
     * Input of the command Update User
     * @param {String} id - The id of the user
     * @param {String} name - The name of the user
     * @param {String} path - The path to save the cron
     * @param {Array<Task>} tasks - The tasks of the user
     * @memberOf Application.UserCommands.UpdateUser
     */
    constructor({id, name, path, tasks}) {
        this._id = id;
        this._name = name;
        this._path = path;
        this._tasks = tasks;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(value) {
        this._tasks = value;
    }

}

module.exports = UpdateUserCommand