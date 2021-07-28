/**
 * Log Service
 * @param fs
 * @param pathLibrary
 * @return {{getLog: (function({id: *, name: *}): {log: string[], logStdout: string[]})}}
 * @constructor
 * @memberOf Entity.Services
 */
const LogService = ({fs, pathLibrary}) => {
    return {
        /**
         *
         * @param {Number} id
         * @param {String} name
         * @return {{log: string[], logStdout: string[]}}
         */
        getLog: ({id, name}) => {
            const log = fs.readFileSync(pathLibrary.join(default_log_path, `./logs/${id.split('-')[0]}-${name}.log`)).toString().split("\n");
            const logStdout = fs.readFileSync(pathLibrary.join(default_log_path, `${_id.split('-')[0]}-${name}.stdout.log`)).toString().split("\n");
            return {
                log: log,
                logStdout: logStdout
            }
        }
    }
}

module.exports = LogService;