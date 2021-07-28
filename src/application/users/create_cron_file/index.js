class CreateCronFile {
    /**
     * Constructor of the CreateCronFile command
     * @param {UserRepository} userRepository
     * @param {TaskRepository} taskRepository
     * @param {CronFile} cronFile - CronFile Service
     * @memberOf Application.UserCommands
     */
    constructor({userRepository, taskRepository, cronFile}) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.cronFile = cronFile;
    }

    /**
     * Create a cron file
     * @param {String} name
     * @param {Array<Task>} tasks
     * @param {String} path
     * @returns {Promise<void>}
     * @memberOf Application.UserCommands.CreateCronFile
     */
    async create({name, tasks, path}) {
        this.cronFile.createCronFile({name, tasks, path});
    }
}

module.exports = CreateCronFile;