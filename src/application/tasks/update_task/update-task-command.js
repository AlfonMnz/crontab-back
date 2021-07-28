class UpdateTaskCommand {
    constructor({id, name, command, schedule, stopped, logging, mailing, timestamp, user}) {
        this._id = id;
        this._name = name;
        this._command = command;
        this._schedule = schedule;
        this._stopped = stopped;
        this._logging = logging;
        this._mailing = mailing;
        this._timestamp = timestamp;
        this._user = user;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get command() {
        return this._command;
    }

    set command(value) {
        this._command = value;
    }

    get schedule() {
        return this._schedule;
    }

    set schedule(value) {
        this._schedule = value;
    }

    get stopped() {
        return this._stopped;
    }

    set stopped(value) {
        this._stopped = value;
    }

    get logging() {
        return this._logging;
    }

    set logging(value) {
        this._logging = value;
    }

    get mailing() {
        return this._mailing;
    }

    set mailing(value) {
        this._mailing = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}

module.exports = UpdateTaskCommand