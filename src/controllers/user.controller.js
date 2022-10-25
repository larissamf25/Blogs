const { validateLogin, validateUser } = require('./utils/validateCredentials');
const userService = require('../services/user.service');

// const error500Message = 'Algo deu errado';

const login = async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) return next(error);
  const { email, password } = req.body;
  const { error: serviceError, token } = await userService.login(email, password);
  if (serviceError && serviceError.code === 'invalidCredentials') {
    return next({ statusCode: 400, message: serviceError.message });
  }
  if (serviceError) {
    return next(serviceError);
  }
  res.status(200).json({ token });
};

const createUser = async (req, res, next) => {
  // const { displayName, email, password, image } = req.body;
  const { error } = validateUser(req.body);
  if (error) return next(error);
  const user = await userService.createUser(req.body);
  if (user.error.code === 'userExists') {
    return res.status(409).json({ message: user.error.message });
  }
  return res.status(201).json({ ...user });
};

const getAll = async (_req, _res) => {

};

const getById = async (_req, _res) => {

};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};