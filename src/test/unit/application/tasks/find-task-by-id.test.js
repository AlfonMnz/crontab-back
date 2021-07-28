const FindTaskById = require('../../../../application/tasks/find_task_by_id');
const FindTaskByIdCommand = require('../../../../application/tasks/find_task_by_id/find-task-by-id-command');
const findTaskByIdCommand = require('../../../../application/tasks/find_task_by_id/find-task-by-id-command');
const findTaskByIdResponse = require('../../../../application/tasks/find_task_by_id/find-task-by-id-response');
const Task = require('../../../../domain/task/Task');

describe('Find a task by id', () => {
    const taskRepositoryMock = {findById: jest.fn()}
    const id = '619';
    const user = '701';
    beforeEach(() => {
        findTaskByIdMock = new FindTaskById({
            taskRepository: taskRepositoryMock
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should found the task', async () => {
        const foundTask = new Task({
            id,
            name: 'test',
            command: 'echo hola',
            schedule: '* * * *',
            stopped: false,
            logging: true,
            mailing: false,
            user
        });

        taskRepositoryMock.findById.mockReturnValue(foundTask);
        const commandMock = new findTaskByIdCommand({id});
        const response = await findTaskByIdMock.find(commandMock);
        expect(taskRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(findTaskByIdResponse);
    });

    test('Should throw an error with bad id', async () => {
        taskRepositoryMock.findById.mockReturnValue(null);
        const commandMock = new FindTaskByIdCommand({id});

        await (expect(findTaskByIdMock.find(commandMock))).rejects.toThrow(Error);

        expect(taskRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(taskRepositoryMock.findById).toHaveBeenCalledWith(id);
    });
});