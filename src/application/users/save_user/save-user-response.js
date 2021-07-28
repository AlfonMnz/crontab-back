class SaveUserResponse {
    /**
     * The response of the save user command
     * @param {String} id - The id of the user
     * @param {String} name - The name of the user
     * @param {String} path - The path to save the cron
     * @param {Array<Task>} tasks - The tasks of the user
     * @memberOf Application.UserCommands.SaveUser
     */
    constructor({id, name, path, tasks}) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.tasks = tasks
    }

}

module.exports = SaveUserResponse;