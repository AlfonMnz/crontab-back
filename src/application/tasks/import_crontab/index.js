const ImportCrontabResponse = require('./import-crontab-response');

class ImportCrontab {
    constructor({taskRepository, cronFile, taskParser, idGenerator}) {
        this.cronFile = cronFile;
        this.taskRepository = taskRepository;
        this.taskParser = taskParser;
        this.idGenerator = idGenerator;
    }

    async import({filename, user}) {
        try {
            const tasks = await this.cronFile.importCron({filename, user});
            for (const task of tasks) {
                task.id = this.idGenerator.generate();
                await this.taskRepository.save(task)
            }
            return new ImportCrontabResponse(tasks);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = ImportCrontab;