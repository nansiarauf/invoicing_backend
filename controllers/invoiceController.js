const Invoice = require("../models/invoiceSchema");
const { invoiceValidation } = require("../utils/invoiceValidation");

//CREATE A NEW INVOICE

const createInvoice = async (req, res) => {
  //VALIDATE INVOICE
  const { error } = invoiceValidation.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //NEW INVOICE
  const newInvoice = new Invoice({
    name: req.body.name,
    businessName: req.body.businessName,
    service: req.body.service,
    amount_due: req.body.amount_due,
    email: req.body.email,
    reminder_date: req.body.reminder_date,
  });
  await newInvoice.save();
  res.status(201).json(newInvoice);
};

//VIEW ALL SENT OUT INVOICE REMINDERS
const allInvoices = async (req, res) => {
  const invoices = await Invoice.find();
  res.status(201).json(invoices);
};

//DELETE AN INVOICE REMINDER
const deleteInvoice = async (req, res) => {
  const foundInvoice = await Invoice.findById(req.params._id);
  if (foundInvoice) {
    foundInvoice.remove();
    res.json({ msg: `invoice with ID: ${req.params._id} deleted` });
  } else {
    res.status(404).json({ msg: `invoice not found ${req.params._id}` });
  }
};

module.exports = { createInvoice, allInvoices, deleteInvoice };
