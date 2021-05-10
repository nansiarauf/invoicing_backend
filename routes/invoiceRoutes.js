const express = require("express");
const {
  createInvoice,
  allInvoices,
} = require("../controllers/invoiceController");
const protectRoute = require("../middleware/userAuth");
const router = express.Router();

router.route("/newinvoice").post(protectRoute, createInvoice);
router.route("/all/:user").get(protectRoute, allInvoices);

module.exports = router;
