class DeleteUser {
    /**
     * Delete an user in persistance Command
     * @param {UserRepository} userRepository - The user repository
     * @param {CronFile} cronFile - The Cronfile Service
     * @memberOf Application.UserCommands
     */
    constructor({userRepository, cronFile}) {
        this.userRepository = userRepository;
        this.cronFile = cronFile
    }

    /**
     * Delete an user in persistance
     * @async
     * @param {String} id - The id of the user to delete
     * @returns {Promise<*>}
     * @memberOf Application.UserCommands.DeleteUser
     */
    async delete({id}) {
        const user = await this.userRepository.findById(id);
        this.cronFile.deleteCron(user);
        return await this.userRepository.delete(id);
    }
}

module.exports = DeleteUser;