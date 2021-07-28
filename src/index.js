require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const {server: {port}} = require('./infrastructure/config');
const path = require('path');
const taskRoutes = require('./infrastructure/rest/controllers/task-controller');
const userRoutes = require('./infrastructure/rest/controllers/user-controller');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use('/api/v1/task', taskRoutes);
app.use('/api/v1/user', userRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});
const server = app.listen(port, () => console.log(`APP STATUS: OK [PORT: ${port}]`));

module.exports = {app, server};