const { validateLogin, validateUser } = require('./utils/validateCredentials');
const userService = require('../services/user.service');

const error500Message = 'Algo deu errado';

const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  console.log(error);
  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  if (user.type) res.status(400).json({ message: user.message });
  res.status(200).json({ token: user });
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await userService.createUser(req.body);
  if (user.type) return res.status(409).json({ message: user.message });

  return res.status(201).json({ token: user });
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