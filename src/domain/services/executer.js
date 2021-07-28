/**
 * Executer of task service
 * @param exec
 * @return {{execute: (function(*=): Promise<{stdout: string, stderr: string}>)}}
 * @constructor
 * @memberOf Entity.Services
 */
const Executer = ({exec}) => {
    return {
        /**
         * Execute a command
         * @param {String} command - The command to execute
         * @return {Promise<{stdout: string, stderr: string}>}
         * @memberOf Entity.Services.Executer
         */
        execute: (command) => {
            return new Promise((resolve, reject) => {
                exec(command, function (error, stdout, stderr) {
                    if (error) {
                        reject(error);
                    }
                    resolve({stdout, stderr});
                })
            })
        }
    }
}

module.exports = Executer;