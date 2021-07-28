/**
 * Repositories NameSpace
 * @namespace Persistance.Mongo.Repositories
 */
/**
 * Interface of MongoRepository
 * @interface
 * @memberOf Persistance.Mongo.Repositories
 */
class MongoRepository {
    /**
     * Method Save
     * @throws {Error} Not implemented yet
     */
    async save() {
        throw new Error('Not implemented yet');
    }

    /**
     * Method findById
     * @param {String} id
     * @throws {Error} Not implemented yet
     */
    async findById(id) {
        throw new Error('Not implemented yet');
    }

    /**
     * Method update
     * @throws {Error} Not implemented yet
     */
    async update() {
        throw new Error('Not implemented yet');
    }

    /**
     * Method get All
     * @return {Error} Not implemented yet
     */
    async getAll() {
        throw new Error('Not implemented yet');
    }

    /**
     * Method delete
     * @throws {Error} Not implemented yet
     */
    async delete() {
        throw new Error('Not implemented yet');
    }

    /**
     * Function to throw the error and console.log it
     * @param {Error} e
     */
    throwError(e) {
        console.log(e)
        throw new Error(e)
    }
}

module.exports = MongoRepository;