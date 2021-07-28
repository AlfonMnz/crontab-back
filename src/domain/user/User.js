/**
 * Entity Namespace
 * @namespace Entity
 */
/**
 * User entity
 * @typedef {Object} User
 * @property {Number} id User id
 * @property {String} name
 * @property {String} [path=/var/spool/cron/crontabs]
 * @property tasks todo Comentar esto
 * @memberOf Entity
 */
class User {
    /**
     * Default constructor
     * @param {Number} id
     * @param {String} name
     * @param {String} path
     * @param tasks todo Comentar esto
     * @memberOf Entity
     */
    constructor({id, name, path, tasks}) {
        this._id = id;
        this._name = name;
        this._path = path || '/var/spool/cron/crontabs';
        if (!tasks) this._tasks = [];
        else this._tasks = tasks;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (id) throw new Error('id is required to create user');
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (!name) throw new Error('Name is required to create user');
        this._name = name;
    }

    get path() {
        return this._path;
    }

    set path(path) {
        if (!path) throw new Error('Path is required to create user');
        this._path = path;
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(value) {
        if (!value) this._tasks = [];
        else this._tasks = value;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this._name,
            path: this._path,
            tasks: this._tasks
        }
    }

}

module.exports = User;