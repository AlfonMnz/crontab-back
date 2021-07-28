const GetTasksByUserResponse = require('./get-tasks-by-user-response');


class GetTasksByUser {
    constructor({taskRepository}) {
        this.taskRepository = taskRepository;
    }

    async find({user}) {
        const tasks = await this.taskRepository.findByUser(user);
        this._ensureTasksExists(tasks);
        return new GetTasksByUserResponse(tasks);
    }

    _ensureTasksExists(tasks) {
        if (!tasks || tasks.length === 0) {
            throw new Error('Not tasks by user');
        }
    }
}

module.exports = GetTasksByUser;