const Task = require("../../../domain/task/Task");
const UpdateTaskResponse = require("./update-task-response");

class UpdateTask {
    constructor({taskRepository}) {
        this.taskRepository = taskRepository;
    }

    async update({id, name, command, schedule, stopped, logging, mailing, timestamp, user}) {
        try {
            const task = new Task({id, name, command, schedule, stopped, logging, mailing, timestamp, user});
            await this.taskRepository.update({id, name, command, schedule, stopped, logging, mailing, timestamp, user})
            return new UpdateTaskResponse(task);
        } catch (e) {
            throw new Error(e);
        }


    }

}

module.exports = UpdateTask