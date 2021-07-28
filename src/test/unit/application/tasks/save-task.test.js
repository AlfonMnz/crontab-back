const SaveTask = require('../../../../application/tasks/save_task');
const SaveTaskCommand = require('../../../../application/tasks/save_task/save-task-command');
const SaveTaskResponse = require('../../../../application/tasks/save_task/save-task-response');

describe('Save task', () => {
    const taskRepositoryMock = {save: jest.fn()};
    const idGeneratorMock = {generate: jest.fn()};
    beforeEach(() => {
        saveTaskMock = new SaveTask({
            taskRepository: taskRepositoryMock,
            idGenerator: idGeneratorMock
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should save a task', async () => {
        const idMock = 619;
        const savedTask =
        idGeneratorMock.generate.mockReturnValue(idMock);
        taskRepositoryMock.save.mockReturnValue()
    });
});
