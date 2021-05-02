const Joi = require("joi");

//VALIDATION OF INVOICE CREATION

const invoiceValidation = new Joi.object({
  businessName: Joi.string().min(10),
  name: Joi.string().required().min(2),
  service: Joi.string().required(),
  reminder_date: Joi.string().required(),
  amount_due: Joi.string().required(),
  email: Joi.string().required().email().min(10),
});

module.exports = { invoiceValidation };
