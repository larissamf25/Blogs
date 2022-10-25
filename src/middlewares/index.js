const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;
    return next(err);
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.email = payload;
    return next();
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
};

module.exports = {
  validateToken,
};