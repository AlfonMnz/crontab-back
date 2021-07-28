const GetAllTasksResponse = require('./get-all-tasks-response');

class GetAllTasks {
    constructor({taskRepository}) {
        this.taskRepository = taskRepository
    }

    async get() {
        const tasks = await this.taskRepository.getAll();
        return new GetAllTasksResponse({tasks});
    }

}

module.exports = GetAllTasks;