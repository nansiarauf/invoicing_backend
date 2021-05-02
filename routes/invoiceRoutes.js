const express = require("express");
const { createInvoice } = require("../controllers/invoiceController");
const protectRoute = require("../middleware/userAuth");
const router = express.Router();

router.route("/newinvoice").post(protectRoute, createInvoice);

module.exports = router;
