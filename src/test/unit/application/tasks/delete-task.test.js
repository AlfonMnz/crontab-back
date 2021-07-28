const DeleteTask = require('../../../../application/tasks/delete_task');
const deleteTaskCommand = require('../../../../application/tasks/delete_task/delete-task-command');
describe('Delete task', () => {
    const taskRepositoryMock = {delete: jest.fn()}
    const id = '619';
    beforeEach(() => {
        deleteTaskMock = new DeleteTask({
            taskRepository: taskRepositoryMock
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should delete a task', async () => {
        taskRepositoryMock.delete.mockReturnValue(true);
        const commandMock = new deleteTaskCommand({id});

        await deleteTaskMock.delete(commandMock);

        expect(taskRepositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(taskRepositoryMock.delete).toHaveBeenCalledWith({id});
    });

    test('Should return an error with invalid id', async () => {
        taskRepositoryMock.delete.mockReturnValue(null);
        const commandMock = new deleteTaskCommand({id});
        
        // await (expect(deleteTaskMock.delete(commandMock))).rejects.toThrow(Error);

        // expect(taskRepositoryMock.delete).toHaveBeenCalledTimes(1);
        // expect(taskRepositoryMock.delete).toHaveBeenCalledWith({id});
    });
});