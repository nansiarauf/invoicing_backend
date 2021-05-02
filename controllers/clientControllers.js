const Client = require("../models/clientSchema");
const { clientValidation } = require("../utils/clientValidation");

//ADD NEW CLIENT CONTROLLER
const addClient = async (req, res) => {
  //VALIDATE CLIENT INFO
  const { error } = clientValidation.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //CHECKING EMAIL AND BUSINESS NAME
  const emailFound = await Client.findOne({ email: req.body.email });
  if (emailFound) return res.send("Email already exist");

  const businessName = await Client.findOne({
    businessName: req.body.businessName,
  });
  if (businessName) return res.send("Business already exist");

  //CREATING NEW CLIENT
  const newClient = new Client({
    businessName: req.body.businessName,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  await newClient.save();
  res.status(201).json(newClient);
};

//VIEW ALL CLIENTS
const getAllClients = async (req, res) => {
  const clients = await Client.find();
  res.send(clients);
};

//GET A CLIENT BY NAME/ID
const getOneClient = async (req, res) => {
  const aClient = await Client.findById(req.params._id);
  if (aClient) {
    res.send(aClient);
  } else {
    res
      .status(404)
      .json({ msg: `client with ID: ${req.params._id} not found` });
  }
};

//UPDATE CLIENT INFO
const updateClient = async (req, res) => {
  //GET CLIENT BY ID TO UPDATE
  const foundClient = await Client.findById(req.params._id);
  if (foundClient) {
    foundClient.name = req.body.name ? req.body.name : foundClient.name;
    foundClient.businessName = req.body.businessName
      ? req.body.businessName
      : foundClient.businessName;
    foundClient.email = req.body.email ? req.body.email : foundClient.email;
    foundClient.phone = req.body.phone ? req.body.phone : foundClient.phone;
    foundClient.address = req.body.address
      ? req.body.address
      : foundClient.address;

    //ASSIGN UPDATED CLIENT INFO TO A VARIABLE AND SAVE UPDATES
    const updatedClient = foundClient.save();
    res.json({ updatedClient: updateClient });
  }
};

//DELETING A CLIENT
const deleteClient = async (req, res) => {
  //CHECKING FOR CLIENT USING ID
  const foundClient = await Client.findById(req.params._id);
  if (foundClient) {
    foundClient.remove();
    res.json({ msg: `client with ID: ${req.params._id} deleted` });
  } else {
    res
      .status(404)
      .json({ msg: `client with ID: ${req.params._id} not found` });
  }
};
module.exports = {
  addClient,
  getAllClients,
  getOneClient,
  deleteClient,
  updateClient,
};
