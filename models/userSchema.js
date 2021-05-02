const mongoose = require("mongoose");

//DESTRUCTURING MODEL AND SCHEMA FROM MONGOOSE
const { model, Schema } = mongoose;

//CREATING USER SCHEMA
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//CREATING A MODEL USER
const User = model("User", userSchema);
module.exports = User;
