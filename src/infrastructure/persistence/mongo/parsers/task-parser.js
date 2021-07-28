const Task = require("../../../../domain/task/Task");
const {folders: {default_path, default_log_path}} = require('../../../config');
/**
 * Parsers NameSpace
 * @namespace Persistance.Mongo.Parsers
 */
/**
 * Task Parser
 * @param muuid
 * @param pathLibrary
 * @returns {Object}
 * @memberOf Persistance.Mongo.Parsers
 * @constructor
 */
const taskParser = ({muuid, pathLibrary}) => {
    return {
        /**
         * Parse a task to a MongoDocument
         * @param id
         * @param name
         * @param command
         * @param schedule
         * @param stopped
         * @param logging
         * @param mailing
         * @param timestamp
         * @param user
         * @returns {{schedule: *, stopped: *, name: *, logging: *, _id, mailing: *, user: *, command: *, timestamp: *}}
         * @memberOf Persistance.Mongo.Parsers.taskParser
         */
        toMongoDocument: ({
                              id,
                              name,
                              command,
                              schedule,
                              stopped,
                              logging,
                              mailing,
                              timestamp,
                              user
                          }) => {
            const _id = muuid.from(id)
            user = muuid.from(user);
            return {
                _id,
                name,
                command,
                schedule,
                stopped,
                logging,
                mailing,
                timestamp,
                user
            }
        },
        /**
         * Parse a task to Domain
         * @param _id
         * @param name
         * @param command
         * @param schedule
         * @param stopped
         * @param logging
         * @param mailing
         * @param timestamp
         * @param user
         * @returns {Task}
         * @memberOf Persistance.Mongo.Parsers.taskParser
         */
        toDomain: ({
                       _id, name, command, schedule, stopped, logging, mailing, timestamp, user
                   }) => {
            const id = (muuid.from(_id)).toString();
            user = (muuid.from(user)).toString();
            return new Task({id, name, command, schedule, stopped, logging, mailing, timestamp, user})
        },
        /**
         * Parse a task to crontab format
         * @param _id
         * @param command
         * @param name
         * @param logging
         * @returns {string}
         * @memberOf Persistance.Mongo.Parsers.taskParser
         */
        toCrontab: ({
                        _id, command, name, logging
                    }) => {
            let cronPath = default_path;
            let stderr = pathLibrary.join(cronPath, `${_id.split('-')[0]}-${name}.stderr`);
            let stdout = pathLibrary.join(cronPath, `${_id.split('-')[0]}-${name}.stdout`);

            let crontab_string = command;
            crontab_string = _addFinalSemicolon(crontab_string);
            let crontabJobString = _getCrontabJobString(crontab_string, stderr, stdout);
            return `${crontabJobString}${_enabledLogging(crontabJobString, logging, stderr, stdout, _id, name)}`;

        }
    }

    function _enabledLogging(crontabJobString, logging, stderr, stdout, _id, name) {
        if (logging == true) {
            const logFile = pathLibrary.join(default_log_path, `${_id.split('-')[0]}-${name}.log`);
            const logFileOut = pathLibrary.join(default_log_path, `${_id.split('-')[0]}-${name}.stdout.log`);
            return `;if test -f ${stderr}; then date >> "${logFile}"; cat ${stderr} >> "${logFile}";fi; if test -f ${stdout}; then date >> "${logFileOut}"; cat ${stdout} >> "${logFileOut}"; fi`
        }
        return '';
    }

    function _addFinalSemicolon(crontab_string) {
        return crontab_string[crontab_string.length - 1] ? `${crontab_string};` : crontab_string
    }

    function _getCrontabJobString(crontab_string, stderr, stdout) {
        let crontab_job_string = crontab_string;
        crontab_job_string = `{ ${crontab_job_string} }`;
        crontab_job_string = `(${crontab_job_string} | tee ${stdout})`;
        crontab_job_string = `(${crontab_job_string} 3>&1 1>&2 2>&3 | tee ${stderr}) 3>&1 1>&2 2>&3`;
        crontab_job_string = `(${crontab_job_string})`;
        return crontab_job_string;
    }
}

module.exports = taskParser