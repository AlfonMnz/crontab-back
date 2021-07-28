const awilix = require('awilix');
const {v4: uuidv4} = require('uuid');
const MUUID = require('uuid-mongodb');
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');
const cronParser = require('cron-parser');


//Commands
const SaveTask = require('./application/tasks/save_task');
const FindTaskById = require('./application/tasks/find_task_by_id');
const SaveUser = require('./application/users/save_user');
const FindUserById = require('./application/users/find_user_by_id');
const UpdateUser = require('./application/users/update_user');
const AddTaskToUser = require('./application/users/add_task_to_user');
const CreateCronFile = require('./application/users/create_cron_file');
const GetAllTasks = require('./application/tasks/get_all_tasks');
const GetAllUsers = require('./application/users/get_all_users');
const ExecuteTaskById = require('./application/tasks/execute_task_by_id');
const UpdateTask = require('./application/tasks/update_task');
const DeleteTask = require('./application/tasks/delete_task');
const DeleteUser = require('./application/users/delete_user');
const GetTasksByUser = require('./application/tasks/get_tasks_by_user');
const ImportCrontab = require('./application/tasks/import_crontab');
const GetCronToImport = require('./application/tasks/get_cron_to_import');
const GetLog = require('./application/tasks/get_log');

//Repositories
const MongoTaskRepository = require('./infrastructure/persistence/mongo/repositories/mongo-task-repository');
const MongoUserRepository = require('./infrastructure/persistence/mongo/repositories/mongo-user-repository');

//Parsers
const taskParser = require('./infrastructure/persistence/mongo/parsers/task-parser');
const userParser = require('./infrastructure/persistence/mongo/parsers/user-parser');


const MongoDbHandler = require('./infrastructure/persistence/mongo/db-connection');
const idGenerator = require('./domain/services/id-generator');
const cronFile = require('./domain/services/cron-file');
const executer = require('./domain/services/executer');
const logService = require('./domain/services/log-service');

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({

    fs: awilix.asValue(fs),
    pathLibrary: awilix.asValue(path),
    uuidv4: awilix.asValue(uuidv4),
    exec: awilix.asValue(exec),
    mongoDbHandler: awilix.asFunction(MongoDbHandler),
    taskRepository: awilix.asClass(MongoTaskRepository),
    userRepository: awilix.asClass(MongoUserRepository),
    idGenerator: awilix.asFunction(idGenerator),
    cronFile: awilix.asFunction(cronFile),
    executer: awilix.asFunction(executer),
    muuid: awilix.asValue(MUUID),
    logService: awilix.asValue(logService),
    cronParser: awilix.asValue(cronParser),
    taskParser: awilix.asFunction(taskParser),
    userParser: awilix.asFunction(userParser),
    findTaskById: awilix.asClass(FindTaskById),
    saveTask: awilix.asClass(SaveTask),
    saveUser: awilix.asClass(SaveUser),
    findUserById: awilix.asClass(FindUserById),
    updateUser: awilix.asClass(UpdateUser),
    addTaskToUser: awilix.asClass(AddTaskToUser),
    createCronFile: awilix.asClass(CreateCronFile),
    getAllTasks: awilix.asClass(GetAllTasks),
    getAllUsers: awilix.asClass(GetAllUsers),
    executeTaskById: awilix.asClass(ExecuteTaskById),
    updateTask: awilix.asClass(UpdateTask),
    deleteTask: awilix.asClass(DeleteTask),
    deleteUser: awilix.asClass(DeleteUser),
    getTasksByUser: awilix.asClass(GetTasksByUser),
    importCrontab: awilix.asClass(ImportCrontab),
    getCronToImport: awilix.asClass(GetCronToImport),
    getLog: awilix.asClass(GetLog),
});

module.exports = container