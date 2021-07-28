const express = require('express');
const router = express.Router();
const container = require('../../../container');
const SaveUserCommand = require('../../../application/users/save_user/save-user-command');
const FindUserByIdCommand = require("../../../application/users/find_user_by_id/find-user-by-id-command");
const UpdateUserCommand = require("../../../application/users/update_user/update-user-command");
const AddTaskToUserCommand = require("../../../application/users/add_task_to_user/add-task-to-user-command");
const CreateCronFileCommand = require("../../../application/users/create_cron_file/create-cron-file-command");
const FindTaskByIdCommand = require("../../../application/tasks/find_task_by_id/find-task-by-id-command");
const GetTasksByUserCommand = require("../../../application/tasks/get_tasks_by_user/get-tasks-by-user-command");
const DeleteTask = require("../../../application/tasks/delete_task");
const DeleteTaskCommand = require("../../../application/tasks/delete_task/delete-task-command");
const DeleteUserCommand = require("../../../application/users/delete_user/delete-user-command");

router.post('/', async (req, res) => {
    const {user: {name, path, tasks}} = req.body
    try {
        const command = new SaveUserCommand({name, path, tasks});
        const saveUser = container.resolve('saveUser');
        const response = await saveUser.save(command);
        res.status(201).json({...response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const command = new FindUserByIdCommand({id});
        const findUser = container.resolve('findUserById');
        const response = await findUser.find(command);
        res.status(200).json({...response});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.toString()});
    }
});

router.get('/', async (req, res) => {
    try {
        const getAllUsers = container.resolve('getAllUsers');
        const response = await getAllUsers.get();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.toString()});
    }
});

router.put('/', async (req, res) => {
    const {user: {id, name, path, tasks}} = req.body
    try {
        const command = new UpdateUserCommand({id, name, path, tasks});
        const updateUser = container.resolve('updateUser');
        const response = await updateUser.update(command);
        res.status(200).json({...response});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

router.post('/task', async (req, res) => {
    const {idUser, idTask} = req.body
    try {
        const command = new AddTaskToUserCommand({idTask, idUser});
        const addTaskToUser = container.resolve('addTaskToUser');
        await addTaskToUser.addTask(command);
        res.status(204).json({});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()});
    }
});

router.post('/createCron/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const userCommand = new FindUserByIdCommand({id});

        const findUserById = container.resolve('findUserById');
        const findTaskById = container.resolve('findTaskById');
        const createCronFile = container.resolve('createCronFile');

        const userFound = await findUserById.find(userCommand);
        const user = userFound.user
        let tasks = [];
        for (const idTask of user.tasks) {
            const taskCommand = new FindTaskByIdCommand({id: idTask});
            tasks.push(await findTaskById.find(taskCommand));
        }

        const command = new CreateCronFileCommand(user);


        await createCronFile.create(command);
        res.status(204).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const commandTask = new GetTasksByUserCommand({user: id});

        const getTasksByUser = container.resolve('getTasksByUser');
        const deleteTask = container.resolve('deleteTask');
        const deleteUser = container.resolve('deleteUser');

        const {tasks} = await getTasksByUser.find(commandTask);

        for (const task of tasks) {
            const commandDeleteTask = new DeleteTaskCommand({id: task._id});
            await deleteTask.delete(commandDeleteTask);
        }

        const commandUser = new DeleteUserCommand({id});
        await deleteUser.delete(commandUser);
        res.status(204).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});

    }
});

module.exports = router;