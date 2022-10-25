const { validateLogin, validateUser } = require('./utils/validateCredentials');
const userService = require('../services/user.service');

const error500Message = 'Algo deu errado';

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

const getAll = async (_req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: error500Message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: error500Message });
  }
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};