const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const clientRoutes = require("./routes/clientRoutes");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
//USING ENVIRONMENT VARIABLES
dotenv.config();

//CONNECTING TO DATABASE
dbConnect();

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/invoice", invoiceRoutes);
app.use("/api/v1/user/clients", clientRoutes);

app.get("/", (req, res) => {
  res.send("<h1></h1>Invoicing and payment reminder API</h1>");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server started on: ${port}`);
});
