const mongoose = require("mongoose");

//DESTRUCTURING MODEL AND SCHEMA FROM MONGOOSE
const { model, Schema } = mongoose;

const clientSchema = new Schema(
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
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//CREATING A MODEL CLIENT
const Client = model("Client", clientSchema);
module.exports = Client;
