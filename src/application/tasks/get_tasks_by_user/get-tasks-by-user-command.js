class GetTasksByUserCommand {
    constructor({user}) {
        this._user = user
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
}

module.exports = GetTasksByUserCommand;