const express = require('express');
const { userController, categoryController, postController } = require('./controllers');
const { validateToken } = require('./middlewares');

const app = express();

app.use(express.json());

app.get('/post/search', validateToken, postController.getBySearch);
app.post('/login', userController.login);
app.post('/user', userController.createUser);
app.post('/categories', validateToken, categoryController.createCategory);
app.post('/post', validateToken, postController.createPost);
app.get('/user', validateToken, userController.getAll);
app.get('/user/:id', validateToken, userController.getById);
app.get('/categories', validateToken, categoryController.getAll);
app.get('/post', validateToken, postController.getAll);
app.get('/post/:id', validateToken, postController.getById);
app.put('/post/:id', validateToken, postController.updatePost);
app.delete('/post/:id', validateToken, postController.deletePost);
app.delete('/user/me', validateToken, userController.deleteUser);

module.exports = app;
