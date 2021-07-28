class FindUserByIdCommand {
    /**
     * Class constructor of the input of the FindUserById command
     * @param {String} id - The id to find
     * @memberOf Application.UserCommands.FindUserById
     * @constructor
     */
    constructor({id}) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if (!value) console.log('Hi')
        this._id = value;
    }
}

module.exports = FindUserByIdCommand