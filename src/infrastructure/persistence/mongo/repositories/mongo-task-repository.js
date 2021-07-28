const MUUID = require('uuid-mongodb');
const MongoRepository = require('./mongo-repository');


class MongoTaskRepository extends MongoRepository {
    /**
     * The handle of Task repository
     * @constructor
     * @param mongoDbHandler
     * @param taskParser
     * @memberOf Persistance.Mongo.Repositories
     * @implements {MongoRepository}
     */
    constructor({mongoDbHandler, taskParser}) {
        super();
        this.mongoDbHandler = mongoDbHandler;
        this.taskParser = taskParser;
    }

    async findById(id) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            const taskDocument = await db.collection('tasks').findOne({_id: MUUID.from(id)});

            return taskDocument ? this.taskParser.toDomain(taskDocument) : null;
        } catch (e) {
            this.throwError(e)
        }
    }

    async save(task) {
        console.log(task);
        const db = await this.mongoDbHandler.getInstance();
        try {
            await db.collection('tasks').insertOne(this.taskParser.toMongoDocument(task));
        } catch (e) {
            this.throwError(e)
        }
    }

    async getAll() {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('tasks').find({}).map(task => this.taskParser.toDomain(task).toJSON()).toArray();
        } catch (e) {
            this.throwError(e)
        }
    }

    async update(task) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('tasks').findOneAndReplace({_id: MUUID.from(task.id)}, this.taskParser.toMongoDocument(task));
        } catch (e) {
            this.throwError(e);
        }
    }

    async delete({id}) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('tasks').deleteOne({_id: MUUID.from(id)});
        } catch (e) {
            this.throwError(e);
        }
    }

    async findByUser(user) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('tasks').find({user: MUUID.from(user)}).map(task => this.taskParser.toDomain(task).toJSON()).toArray();
        } catch (e) {
            this.throwError(e)
        }
    }
}

module.exports = MongoTaskRepository
