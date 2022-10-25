const Joi = require('joi');

const genericRequiredMessage = 'Some required fields are missing';

const validateLogin = (body) =>
  Joi.object({
    email: Joi.string().email().required()
    .messages({
      'string.required': genericRequiredMessage,
    }),
    password: Joi.string().messages({
      'string.required': genericRequiredMessage,
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

const validatePost = (body) => Joi.object({
  title: Joi.string().required()
  .messages({
    'string.required': genericRequiredMessage,
  }),
  content: Joi.string().messages({
    'string.required': genericRequiredMessage,
  }),
  categoryIds: Joi.array().min(1).required()
  .messages({
    'string.required': genericRequiredMessage,
    'string.min': 'one or more "categoryIds" not found',
  }),
}).validate(body);
  
module.exports = {
  validateLogin,
  validateUser,
  validatePost,
};