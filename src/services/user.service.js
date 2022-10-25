const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const { JWT_SECRET } = process.env;

const login = async (email, password) => {
  const user = await userModel.findOne(email);

  if (!user || user.password !== password) {
    return {
      error: {
        code: 'invalidCredentials',
        message: 'Invalid fields',
      },
    };
  }

  const payload = {
    email,
    admin: user.admin,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

const createUser = async (email, password) => {
  const userExists = await userModel.findOne(email);

  if (userExists) {
    return {
      error: {
        message: 'User already registered',
        code: 'userExists',
      },
    };
  }

  const admin = Math.floor(Math.random() * 100) > 50;

  await userModel.create(email, password, admin);

  return login(email, password);
};

module.exports = {
  createUser,
  login,
};