const GetLogResponse = require('./get-log-response');

class GetLog {
    constructor({taskRepository, cronFile}) {
        this.cronFile = cronFile;
        this.taskRepository = taskRepository
    }

    async get({id}) {
        console.log(this.cronFile);
        const task = await this.taskRepository.findById(id);
        const logs = this.cronFile.getLog(task);
        return new GetLogResponse(logs);
    }

}

module.exports = GetLog