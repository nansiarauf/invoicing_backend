const Joi = require("joi");

const validateRegisterUser = new Joi.object({
  name: Joi.string().required().min(5).max(100),
  businessName: Joi.string().required().min(10).max(100),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const validateUserLogin = new Joi.object({
  email: Joi.string().required().min(8),
  password: Joi.string().required().min(8),
});
module.exports = { validateRegisterUser, validateUserLogin };
