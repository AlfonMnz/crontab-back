const express = require('express');
const SaveTaskCommand = require('../../../application/tasks/save_task/save-task-command');
const FindTaskByIdCommand = require('../../../application/tasks/find_task_by_id/find-task-by-id-command');
const router = express.Router();
const container = require('../../../container');
const ExecuteTaskByIdCommand = require("../../../application/tasks/execute_task_by_id/execute-task-by-id-command");
const FindUserByIdCommand = require('../../../application/users/find_user_by_id/find-user-by-id-command');
const UpdateTaskCommand = require('../../../application/tasks/update_task/update-task-command');
const DeleteTaskCommand = require("../../../application/tasks/delete_task/delete-task-command");
const GetTasksByUserCommand = require("../../../application/tasks/get_tasks_by_user/get-tasks-by-user-command");
const GetLog = require("../../../application/tasks/get_log/get-log-command");

router.post('/', async (req, res) => {
    const {task: {name, command, schedule, user}} = req.body
    try {
        const taskCommand = new SaveTaskCommand({name, command, schedule, user});

        const saveTask = container.resolve('saveTask');
        const response = await saveTask.save(taskCommand);
        res.status(200).json({...response});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()})
    }
});
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const command = new FindTaskByIdCommand({id});
        const findTask = container.resolve('findTaskById');
        const response = await findTask.find(command);
        res.status(200).json({...response});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.toString()})

    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = container.resolve('getAllTasks');
        const response = await tasks.get();
        res.status(200).json({...response});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()})
    }
});

router.get('/:id/execute', async (req, res) => {
    const {id} = req.params;
    try {
        const command = new ExecuteTaskByIdCommand({id});
        const executeTask = container.resolve('executeTaskById');
        await executeTask.execute(command);
        res.status(204).json();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

router.put('/', async (req, res) => {
    const {task} = req.body;
    try {
        const command = new UpdateTaskCommand(task);
        const updateTask = container.resolve('updateTask');
        const response = await updateTask.update(command);
        res.status(200).json({...response});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()});
    }

});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const command = new DeleteTaskCommand({id});
        const deleteTask = container.resolve('deleteTask');
        await deleteTask.delete(command);
        res.status(204).json({});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()});
    }

});

router.get('/user/:user', async (req, res) => {
    const {user} = req.params;
    try {
        const command = new GetTasksByUserCommand({user});
        const getTasksByUser = container.resolve('getTasksByUser');
        const response = await getTasksByUser.find(command);
        res.status(200).json({...response});
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.toString()})
    }
});

router.post('/import/crontab/:user', async (req, res) => {
    const {user} = req.params;
    const {filename} = req.body;
    try {

        const importCrontab = container.resolve('importCrontab');
        const response = await importCrontab.import({filename, user});
        res.status(200).json({...response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});
router.get('/import/crontab', async (req, res) => {
    try {

        const getCronToImport = container.resolve('getCronToImport');
        const response = await getCronToImport.get();
        res.status(200).json({...response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

router.get('/log/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const getLog = container.resolve('getLog');
        const command = new GetLog({id});
        const response = await getLog.get(command);
        res.status(200).json({...response});
    }catch (error) {
        console.log(error);
        res.status(500).json({error: error.toString()});
    }
});

module.exports = router