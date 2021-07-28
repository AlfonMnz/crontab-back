const FindTaskByIdResponse = require('./find-task-by-id-response');

class FindTaskById {
    constructor({taskRepository}) {
        this.taskRepository = taskRepository
    }

    async getById({id}) {
        const task = await this.taskRepository.findById(id);

        this._ensureTaskExists(task);

        return new FindTaskByIdResponse({task});
    }


    _ensureTaskExists(task) {
        if (!task) {
            throw new Error('Task not exists');
        }
    }

}

module.exports = FindTaskById;