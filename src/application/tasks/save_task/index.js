const Task = require('../../../domain/task/Task');
const SaveTaskResponse = require('./save-task-response');

class SaveTask {
    constructor({taskRepository, idGenerator}) {
        this.taskRepository = taskRepository;
        this.idGenerator = idGenerator
    }

    async save({name, command, schedule, user}) {
        try {
            this._ensureUserNotEmpty(user);
            const id = this.idGenerator.generate();
            const task = new Task({id, name, command, schedule, user})
            await this.taskRepository.save(task);
            return new SaveTaskResponse(task);
        } catch (e) {
            throw new Error(e);
        }

    }

    _ensureUserNotEmpty(user) {
        if (!user) throw new Error('User is required');
    }
}

module.exports = SaveTask