class Task {
    /**
     *
     * @param {Number} id The id
     * @param {String} name
     * @param {String} command
     * @param {String} schedule
     * @param {Boolean} [stopped=false]
     * @param {Boolean} [logging=true]
     * @param {Boolean} mailing
     * @param {User} user
     * @memberOf Entity
     */
    constructor({id, name, command, schedule, stopped, logging, mailing, user}) {
        this._id = id;
        this._name = name;
        this._command = command;
        this._schedule = schedule;
        this._stopped = stopped || false;
        this._logging = logging || true;
        this._mailing = mailing;
        this._user = user;
        this._timestamp = new Date().toString();
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (!id) throw new Error('Field id cannot be empty');

        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!name) throw new Error('Field name cannot be empty');
        this._name = name;
    }

    get command() {
        return this._command;
    }

    set command(command) {
        if (!command) throw new Error('Field command cannot be empty');
        this._command = command;
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
        return this._timestamp
    }

    get user() {
        return this._user;
    }

    set user(value) {
        if (!value) throw new Error('User is required on task');
        this._user = value;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            command: this._command,
            schedule: this._schedule,
            stopped: this._stopped,
            logging: this._logging,
            mailing: this._mailing,
            timestamp: this._timestamp,
            user: this._user,
        }
    }
}

module.exports = Task