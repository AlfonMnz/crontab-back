const GetTasksByUser = require('../../../../application/tasks/get_tasks_by_user');
const GetTaskByUserCommand = require('../../../../application/tasks/get_tasks_by_user/get-tasks-by-user-command');
const GetTaskByUserResponse = require('../../../../application/tasks/get_tasks_by_user/get-tasks-by-user-response');
const Task = require('../../../../domain/task/Task');
const User = require('../../../../domain/user/User');
describe('Get tasks by user', () => {
    const taskRepositoryMock = {findByUser: jest.fn()};
    const user = '666';
    beforeEach(() => {
        getTaskByUserMock = new GetTasksByUser({
            taskRepository: taskRepositoryMock
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should found task by user', async () => {
        const foundTask = new Task({
            id: '619',
            name: 'test',
            command: 'echo hola',
            schedule: '* * * *',
            stopped: false,
            logging: true,
            mailing: false,
            user
        });
        const foundTask2 = new Task({
            id: '700',
            name: 'test',
            command: 'echo hola',
            schedule: '* * * *',
            stopped: false,
            logging: true,
            mailing: false,
            user
        });

        taskRepositoryMock.findByUser.mockReturnValue([foundTask, foundTask2]);
        const commandMock = new GetTaskByUserCommand({user});
        const response  = await getTaskByUserMock.find(commandMock);
        expect(taskRepositoryMock.findByUser).toHaveBeenCalledTimes(1);
        expect(taskRepositoryMock.findByUser).toHaveBeenCalledWith(user);
        expect(response.tasks[0].user).toBe(user);
        expect(response.tasks[1].user).toBe(user);
    });

    test('Should throw error with no tasks', async () => {
        taskRepositoryMock.findByUser.mockReturnValue(null);
        const commandMock = new GetTaskByUserCommand({user});

        await (expect(getTaskByUserMock.find(commandMock))).rejects.toThrow(Error);

        expect(taskRepositoryMock.findByUser).toHaveBeenCalledTimes(1);
        expect(taskRepositoryMock.findByUser).toHaveBeenCalledWith(user);
    });
});