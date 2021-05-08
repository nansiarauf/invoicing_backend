const mongoose = require("mongoose");

//DESTRUCTURING MODEL AND SCHEMA FROM MONGOOSE
const { model, Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },

    businessName: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    amount_due: {
      type: String,
      required: true,
    },
    reminder_date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
