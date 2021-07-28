const GetAllTasks = require('../../../../application/tasks/get_all_tasks');
const GetAllTasksResponse = require('../../../../application/tasks/get_all_tasks/get-all-tasks-response');
const Task = require('../../../../domain/task/Task');
describe('Get all tasks', () => {
    const taskRepositoryMock = {getAll: jest.fn()};
    const id = '619';
    const user = '701';
    const id2 = '620';
    beforeEach(() => {
        getAllTasksMock = new GetAllTasks({
            taskRepository: taskRepositoryMock
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should found all tasks', async () => {
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
        const foundTask2 = new Task({
            id2,
            name: 'test',
            command: 'echo hola',
            schedule: '* * * *',
            stopped: false,
            logging: true,
            mailing: false,
            user
        });
        taskRepositoryMock.getAll.mockReturnValue([foundTask, foundTask2]);

        const response = await getAllTasksMock.get();
        expect(taskRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(GetAllTasksResponse);
    });

    test('Should return an empty array', async () => {
        taskRepositoryMock.getAll.mockReturnValue([]);

        const response = await getAllTasksMock.get();
        expect(taskRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        expect(response).toBeInstanceOf(GetAllTasksResponse);
    })
});