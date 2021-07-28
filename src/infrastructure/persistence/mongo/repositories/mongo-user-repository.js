const MongoRepository = require('./mongo-repository');
const MUUID = require("uuid-mongodb");

class MongoUserRepository extends MongoRepository {
    constructor({mongoDbHandler, userParser}) {
        super();
        this.mongoDbHandler = mongoDbHandler;
        this.userParser = userParser;

    }

    async findById(id) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            const userDocument = await db.collection('users').findOne({_id: MUUID.from(id)});
            return userDocument ? this.userParser.toDomain(userDocument) : null;
        } catch (e) {
            this.throwError(e)
        }
    }

    async save(user) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            await db.collection('users').insertOne(this.userParser.toMongoDocument(user))
        } catch (e) {
            this.throwError(e);
        }
    }

    async update(user) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            await db.collection('users').findOneAndReplace({_id: MUUID.from(user.id)}, this.userParser.toMongoDocument(user));
        } catch (e) {
            this.throwError(e);
        }
    }

    async getAll() {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('users').find({}).map(user => this.userParser.toDomain(user).toJSON()).toArray();
        } catch (e) {
            this.throwError(e);
        }
    }

    async delete(id) {
        const db = await this.mongoDbHandler.getInstance();
        try {
            return await db.collection('users').deleteOne({_id: MUUID.from(id)});
        } catch (e) {
            this.throwError(e)
        }
    }
}

module.exports = MongoUserRepository;