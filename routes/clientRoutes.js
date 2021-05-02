const express = require("express");
const {
  addClient,
  updateClient,
  deleteClient,
  getAllClients,
  getOneClient,
} = require("../controllers/clientControllers");
const protectRoute = require("../middleware/userAuth");
const router = express.Router();

router.route("/addclient").post(protectRoute, addClient);
router.route("/:_id").put(protectRoute, updateClient);
router.route("/allclients").get(protectRoute, getAllClients);
router.route("/:_id").get(protectRoute, getOneClient);
router.route("/deleteclient").delete(protectRoute, deleteClient);

module.exports = router;
