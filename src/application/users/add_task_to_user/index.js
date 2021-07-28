class AddTaskToUser {
    /**
     * Add a task to an User
     * @param userRepository
     * @constructor
     * @memberOf Application.UserCommands
     */
    constructor({userRepository}) {
        this.userRepository = userRepository
    }

    /**
     * Add a task to an user
     * @async
     * @param {String} idUser - The id of the user
     * @param {String} idTask - The id of the task
     * @returns {Promise<boolean>}
     * @memberOf Application.UserCommands.AddTaskToUser
     */
    async addTask({idUser, idTask}) {
        const user = await this.userRepository.findById(idUser);
        user.tasks.push(idTask);
        await this.userRepository.update(user);
        return true;
    }
}

module.exports = AddTaskToUser