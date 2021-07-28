class SaveTaskCommand {

    constructor({name, command, schedule, timestamp, user}) {
        this._name = name;
        this._command = command;
        this._schedule = schedule;
        this._timestamp = timestamp;
        this._user = user
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
        if (!value) throw new Error('User is required in task');
        this._user = value
    }
}

module.exports = SaveTaskCommand