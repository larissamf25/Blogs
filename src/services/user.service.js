const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'invalidCredentials', message: 'Invalid fields' };
  }

  const token = jwt.sign({ data: { userId: user.id } }, JWT_SECRET, {
    expiresIn: '1d', algorithm: 'HS256',
  });

  return token;
};

const createUser = async ({ displayName, email, password, image = '' }) => {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return { type: 'userExists', message: 'User already registered' };
  }

  await User.create({ email, password, displayName, image });

  return login(email, password);
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const [user] = await User.findAll({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const getByEmail = async (email) => {
  const user = await User.findAll({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  login,
  getAll,
  getById,
  getByEmail,
};