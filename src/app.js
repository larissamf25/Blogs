const express = require('express');
const { userController } = require('./controllers');
const { validateToken } = require('./middlewares');

const app = express();

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.get('/user', validateToken, userController.getAll);
app.get('/user/:id', validateToken, userController.getById);

module.exports = app;
