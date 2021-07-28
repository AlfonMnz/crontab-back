class DeleteTask {

    constructor({taskRepository}) {
        this.taskRepository = taskRepository
    }

    async delete({id}) {
        try {
            return await this.taskRepository.delete(id);    
        } catch (error) {
            throw new Error('Error');
        }
        
    }
}

module.exports = DeleteTask;