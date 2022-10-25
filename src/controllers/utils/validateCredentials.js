const Joi = require('joi');

const validateLogin = (body) =>
  Joi.object({
    email: Joi.string().email().required()
    .messages({
      'string.required': 'Some required fields are missing',
    }),
    password: Joi.string().messages({
      'string.required': 'Some required fields are missing',
    }),
  }).validate(body);

const validateUser = (body) => Joi.object({
  displayName: Joi.string().min(8).required()
  .messages({
    'string.required': '"displayName" is required',
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().messages({
    'string.email': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.required': '"password" is required',
    'string.min': '"password" length must be at least 6 characters long',
  }),
  image: Joi.string(),
}).validate(body);
  
module.exports = {
  validateLogin,
  validateUser,
};