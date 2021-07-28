class CreateCronFileCommand {
    /**
     * The input of CreateCronFile command
     * @param name
     * @param tasks
     * @param path
     * @constructor
     * @memberOf Application.UserCommands.CreateCronFile
     */
    constructor({name, tasks, path}) {
        this._name = name;
        this._tasks = tasks;
        this._path = path;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(value) {
        this._tasks = value;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

}

module.exports = CreateCronFileCommand