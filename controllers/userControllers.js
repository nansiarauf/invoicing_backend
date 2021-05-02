const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  validateRegisterUser,
  validateUserLogin,
} = require("../utils/userValidation");

//REGISTER A USER
const registerUser = async (req, res) => {
  //HASHING THE USER PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //VALIDATE NEW USER
  const { error } = validateRegisterUser.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //CHECKING IF USER ALREADY EXIST IN DATABASE EITHER BY EMAIL OR BUSINESS NAME
  const emailFound = await User.findOne({ email: req.body.email });
  if (emailFound) return res.send("email already exist");

  const businessName = await User.findOne({
    businessName: req.body.businessName,
  });
  if (businessName) return res.send("Business name already exist");

  //CREATING NEW USER
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    businessName: req.body.businessName,
  });
  await newUser.save();
  //ASSIGN TOKEN AFTER REGISTERING USER
  const token = token_id(user._id);
  res.cookie("jwt", token, { httpOnly: true });
  res.status(201).json({ newUser: user._id });
};

//LOGIN USER
const loginUser = async (req, res) => {
  //VALIDATE USER LOGIN
  const { error } = validateUserLogin.validate(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  //USER VERIFICATION
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("user not found");

  //VERIFY PASSWORD
  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!verifiedPassword)
    return res.status(404).send("Invalid Email or Password");

  //ASSIGN TOKEN AND REDIRECT USER TO DASHBOARD
  const token_id = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "20d",
  });
  res.header("authorization", token_id).send(token_id);
  res.send("you are logged in");
};

//LOGOUT USER
const logOutUser = async (req, res) => {
  res.redirect("/login");
};

module.exports = { registerUser, loginUser };
