const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) res.status(401).json({ message: 'Token not found' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.email = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateToken,
};