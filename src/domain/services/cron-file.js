/**
 * Entity Services NameSpace
 * @namespace Entity.Services
 */
const {folders: {default_log_path}} = require('../../infrastructure/config/index');
/**
 * Cron File Service
 * @param fs - The FS library
 * @param pathLibrary - The Path Library
 * @param taskParser
 * @param exec
 * @param cronParser
 * @constructor
 * @memberOf Entity.Services
 */
const CronFile = ({fs, pathLibrary, taskParser, exec, cronParser}) => {
    return {
        /**
         * Create the cron file in the path
         * @param name
         * @param path
         * @param tasks
         * @return void
         * @memberOf Entity.Services.CronFile
         */
        createCronFile: ({name, path, tasks}) => {
            const writeStream = fs.createWriteStream(pathLibrary.join(path, `crontab.${name.split(' ').join('-')}`));
            for (const task of tasks) {
                writeStream.write(`${taskParser.toCrontab({name: name, path: path, ...task.task})}\n`);
            }
        },
        /**
         * Import a Cron file and create the task
         * @async
         * @param filename
         * @param user
         * @return {Array<Task>} arrayCrons
         * @memberOf Entity.Services.CronFile
         */
        importCron: async ({filename, user}) => {
            let lines = fs.readFileSync(pathLibrary.resolve(__dirname, `../../../crontabs/${filename}`), 'utf-8');
            lines = lines.split('\n');
            let namePrefix = new Date().getTime();
            let arrayCrons = [];
            lines.forEach((line, index) => {
                line = line.replace(/\t+/g, ' ');
                let regex = /^((\@[a-zA-Z]+\s+)|(([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+))/;
                let command = line.replace(regex, '').trim();
                let schedule = line.replace(command, '').trim();
                let is_valid = false;
                try {
                    is_valid = cronParser.parseString(line).expressions.length > 0;
                } catch (e) {
                    console.log(e)
                }
                if (command && schedule && is_valid) {
                    let name = `${namePrefix}_${index}`
                    arrayCrons.push({name: name, command: command, schedule: schedule, user: user});
                }
            });
            return arrayCrons;
        },
        /**
         * Read the cronfile to import
         * @return {File} The cron to import
         * @memberOf Entity.Services.CronFile
         */
        getCronToImport: () => {
            return fs.readdirSync(pathLibrary.resolve(__dirname, '../../../crontabs'));
        },

        /**
         * Delete a cronfile
         * @param {String} path - Path of the cron
         * @param {String} name - Name of the file
         * @memberOf Entity.Services.CronFile
         * @return void
         */
        deleteCron: ({path, name}) => {
            fs.unlinkSync(pathLibrary.resolve(__dirname, `${path}/crontab.${name.split(' ').join('-')}`))
        },
        /**
         * Get the log of an cron
         * @param {Number} id - The id of the cron
         * @param {String} name - The name of the cron
         * @return {{log: string[], logStdout: string[]}}
         * @memberOf Entity.Services.CronFile
         */
        getLog: ({id, name}) => {
            const log = fs.readFileSync(pathLibrary.join(default_log_path, `${id.split('-')[0]}-${name}.log`)).toString().split("\n");
            const logStdout = fs.readFileSync(pathLibrary.join(default_log_path, `${id.split('-')[0]}-${name}.stdout.log`)).toString().split("\n");
            return {
                log: log,
                logStdout: logStdout
            }
        }
    }

}

module.exports = CronFile