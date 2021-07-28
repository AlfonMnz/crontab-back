
class SaveUserCommand {
    /**
     * Class constructor of the command to save User
     * @param {String} name - The name of the user
     * @param {String} path - The path to save the cron
     * @param [tasks=[]] - The task of the user
     * @memberOf Application.UserCommands.SaveUser
     * @constructor
     */
    constructor({name, path, tasks = []}) {

        this._name = name;
        this._path = path;
        this._tasks = tasks
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

module.exports = SaveUserCommand