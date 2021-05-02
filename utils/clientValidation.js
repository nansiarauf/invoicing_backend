const Joi = require("joi");

const clientValidation = new Joi.object({
  businessName: Joi.string().min(10),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  address: Joi.string().required().min(10),
  phone: Joi.string().min(10).required(),
});
module.exports = { clientValidation };
