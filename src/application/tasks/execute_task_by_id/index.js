class ExecuteTaskById {
    constructor({taskRepository, executer, taskParser}) {
        this.taskRepository = taskRepository;
        this.executer = executer;
        this.taskParser = taskParser
    }

    async execute({id}) {
        try {
            const task = await this.taskRepository.findById(id);
            this._ensureTaskExists(task);
            const {stdout, stderr} = await this.executer.execute(this.taskParser.toCrontab(task.toJSON()));
            return true;

        } catch (e) {
            throw new Error(e);
        }

    }

    _ensureTaskExists(task) {
        if (!task) {
            throw new Error('Task not exists');
        }
    }
}

module.exports = ExecuteTaskById;